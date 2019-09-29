const express = require('express');
const router = express.Router();
// ffmpeg.getAvailableFormats(function (err, formats) {
//     console.log('Available formats:');
//     console.log(formats);
// });
const {validateVideo, downloadVideo, convertVideo} = require('../middlewares/videos');
// const {validateFiles, convertFiles, zipFiles} = require('../middlewares/images');
// const multer = require('multer');
// const upload = multer();

router.post('/download', validateVideo, downloadVideo, async (req, res) => {

    const {readableVideoStream, toFormat, title, mime} = req.body;

    res.contentType(`${mime}/${toFormat}`);
    res.attachment(`${title}.${toFormat}`);

    // readableVideoStream.pipe(res,{end: true});

    // .on('progress', (progress) => {
    //     console.log(progress);//timemark - finaltimemark -> procenti
    //     console.log('Processing: ' + progress.percent + '% done');
    // })
});

module.exports = router;