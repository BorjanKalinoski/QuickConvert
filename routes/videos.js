const express = require('express');
const router = express.Router();
const ffmpeg = require('fluent-ffmpeg');


const {validateVideo, downloadVideo} = require('../middlewares/videos');

const convertVideo = (readableStream, convertTo, res) => {
    return new Promise(((resolve, reject) => {
        ffmpeg(readableStream)
            .format(convertTo)
            // .videoCodec('libx264')
            .on('end', () => {
                console.log('conversion finished!');
                resolve();
            })
            .on('stderr', function (stderrLine) {

                console.log('Stderr output: ' + stderrLine);
            })
            .on('error', (err, stdout, stderr) => {
                console.log(err.message);
                console.log(stdout);
                console.log(stderr);
                res.header('Content-Disposition', '');
                res.contentType('application/json;charset=utf-8');
                reject(err);
            })
            .pipe(res);
    }));
};
router.post('/download', validateVideo, downloadVideo, async (req, res) => {
    try {

        const {readableStream, convertTo, title, mimeType} = req.body;
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.contentType(mimeType);
        res.attachment(title);
        convertVideo(readableStream, convertTo, res)
            .catch(err => {
                res.header('Content-Disposition', '');
                res.contentType('application/json;charset=utf-8');
                return res.status(400).json({message: err.message}).end();
            });
    }
    catch (e) {
        console.log('error is');
        console.log(e.message);
    }
});


module.exports = router;