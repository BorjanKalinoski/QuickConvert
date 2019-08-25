const express = require('express');
const router = express.Router();
const {validateFiles, convertFiles, zipFiles} = require('../middlewares/images');
const multer = require('multer');
const upload = multer();

router.post('/download', upload.array('files', process.env.MAX_COUNT), validateFiles, convertFiles, zipFiles, async (req, res) => {
    res.status(200);
    res.set({
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/zip',
        'Content-Length': 1,
        'Content-Disposition': 'attachment; filename=' + 'files.zip'
    });
    return res.send(req.buffer);
});

module.exports = router;