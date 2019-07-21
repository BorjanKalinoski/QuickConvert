const express = require('express');
const router = express.Router();
const {validateFiles, convertFiles} = require('../middlewares/images');
const Image = require('../models/image');
const MAX_COUNT = 10;

const multer = require('multer');
const upload = multer();

router.post("/convert", upload.array('files', MAX_COUNT), validateFiles, convertFiles, async (req, res) => {
    try {
        console.log('to save ');
        console.log(req.files);
        const files = req.files.map(file => {
            return {
                data: file.data,
                filename: file.filename
            };
        });
        console.log('converted files are ');
        console.log(files);
        await Image.insertMany({files: files});
        return res.status(201).json(files);

    } catch (e) {
        console.log('eee' + e);
        if (e instanceof MulterError) {
            console.log('ee');
        }
    }
});

module.exports = router;