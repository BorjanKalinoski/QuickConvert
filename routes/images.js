const express = require('express');
const router = express.Router();
const path = require('path');
const {validateFiles, convertFiles, zipFiles} = require('../middlewares/images');
const Image = require('../models/files');

const multer = require('multer');
const upload = multer();


router.post("/download", upload.array('files', process.env.MAX_COUNT), validateFiles, convertFiles, zipFiles, async (req, res) => {
    try {
        res.status(200);
        res.set({
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/zip',
            'Content-Length': 1,
            'Content-Disposition': 'attachment; filename=' + 'files.zip'
        });
        return res.send(req.buffer);
    } catch (e) {
        throw e;
    }
});

module.exports = router;