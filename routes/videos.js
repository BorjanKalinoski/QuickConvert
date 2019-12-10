const express = require('express');
const router = express.Router();
const ffmpeg = require('fluent-ffmpeg');

// ffmpeg.getAvailableFormats(function (err, formats) {
//     console.log('Available formats:');
//     console.log(formats);
// });
const {validateVideo, downloadVideo} = require('../middlewares/videos');
// const {validateFiles, convertFiles, zipFiles} = require('../middlewares/images');
// const multer = require('multer');
// const upload = multer();

router.post('/download', validateVideo, downloadVideo, async (req, res) => {

    const {readableStream, convertTo, title, mimeType} = req.body;

    res.header('Access-Control-Allow-Origin', '*');
    // res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    // res.header('content-disposition', `attachment; filename="${title}"`);
    res.contentType(mimeType);
    res.attachment(title);

    console.log(title);
    ffmpeg(readableStream)
        .format(convertTo)
        // .videoCodec('libx264')
        // .audioCodec('copy')
        // .videoCodec('copy')
        // .outputOptions(['-preset slow'])
        // .videoBitrate('5000k')
        .on('end', (err) => {
            console.log('done');
        })
        .on('error', (err) => {
            console.log('er' + err.message);
            console.log(err);
            // return res.status(400).json({error:err.message}).end();
        })
        .on('stderr', (stderrLine) => {
            console.log('Stderr output: ' + stderrLine);
        })
        .pipe(res);
});

module.exports = router;