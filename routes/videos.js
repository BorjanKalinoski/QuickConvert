const express = require('express');
const router = express.Router();
const ffmpeg = require('fluent-ffmpeg');

// ffmpeg.getAvailableFormats(function (err, formats) {
//     console.log('Available formats:');
//     console.log(formats);
// });
const {validateVideo, downloadVideo, convertVideo} = require('../middlewares/videos');
// const {validateFiles, convertFiles, zipFiles} = require('../middlewares/images');
// const multer = require('multer');
// const upload = multer();

router.post('/download', validateVideo, downloadVideo, async (req, res) => {

    const {readableStream, toFormat, title, mime} = req.body;

    res.contentType(`${mime}/${toFormat}`);
    res.attachment(`${title}.${toFormat}`);

    ffmpeg(readableStream)
        .format(toFormat)
        .videoCodec('libx264')
        .audioCodec('copy')
        // .outputOptions(['-preset slow'])
        // .videoBitrate('5000k')
        .on('end', (err) => {
            console.log('done');
        })
        .on('error', (err) => {
            console.log('er' + err.message);
            console.log(err);
        })
        .on('stderr', (stderrLine) => {
            console.log('Stderr output: ' + stderrLine);
        })
        .pipe(res);
});

module.exports = router;