const express = require('express');
const router = express.Router();
const sharp = require('sharp');
const {validateFiles} = require('../middlewares/images');

const MAX_COUNT = 10;

const multer = require('multer');
const upload = multer();
router.post("/convert", upload.array('images', MAX_COUNT), validateFiles, (req, res) => {
    try {
    } catch (e) {
    }
});

module.exports = router;