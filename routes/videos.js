const express = require('express');
const router = express.Router();
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
const pino = require('pino');
const logger = pino({ level: process.env.LOG_LEVEL || 'info' });
logger.level = 'debug';

const {validateVideo, downloadVideo} = require('../middlewares/videos');

const convertVideo = (readableStream, format, res) => {
    return new Promise(((resolve, reject) => {
        if (format === 'mp4') {
            readableStream.pipe(res);
            readableStream.on('end', () => {
                logger.info('Finished converting video');
            });
        } else {
            ffmpeg(readableStream)
                .format(format)
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
        }
    }));
};

router.post('/download', validateVideo, downloadVideo, async (req, res) => {
    try {
        const {readableStream, format, title, mimeType} = req.body;
        res.set({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            'Content-Type': mimeType
        });
        res.attachment(title);
        convertVideo(readableStream, format, res)
            .catch(err => {
                logger.error(`Error converting video: ${err.message}`);
                res.header('Content-Disposition', '');
                res.contentType('application/json;charset=utf-8');
                return res.status(400).json({message: err.message}).end();
            });
    } catch (e) {
        logger.error(`Error converting video: ${e.message}`);
        return res.status(400).json({message: e.message}).end();
    }
});

module.exports = router;