const express = require('express');
const router = express.Router();
const ffmpeg = require('fluent-ffmpeg');
const log4js = require('log4js');
const logger = log4js.getLogger();
logger.level = 'debug';

const {validateVideo, downloadVideo} = require('../middlewares/videos');

const convertVideo = (readableStream, convertTo, res) => {
    return new Promise(((resolve, reject) => {
        ffmpeg(readableStream)
            .format(convertTo)
            .on('end', () => {
                logger.info('Finished converting video');
                resolve();
            })
            .on('stderr', (stderrLine) => {
                logger.info(`Converting video: ${stderrLine}`);
            })
            .on('error', (err, stdout, stderr) => {
                reject(err);
            })
            .pipe(res);
    }));
};

router.post('/download', validateVideo, downloadVideo, async (req, res) => {
    try {
        const {readableStream, convertTo, title, mimeType} = req.body;
        res.set({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            'Content-Type': mimeType
        });
        res.attachment(title);
        if (convertTo === 'mp4') {
            readableStream.pipe(res);
        } else {
            convertVideo(readableStream, convertTo, res)
                .catch(err => {
                    logger.error(`Error converting video: ${err.message}`);
                    res.header('Content-Disposition', '');
                    res.contentType('application/json;charset=utf-8');
                    return res.status(400).json({message: err.message}).end();
                });
        }
    } catch (e) {
        logger.error(`Error converting video: ${e.message}`);
        return res.status(400).json({message: e.message}).end();
    }
});

module.exports = router;