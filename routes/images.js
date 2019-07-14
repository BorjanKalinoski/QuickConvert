const express = require('express');
const router = express.Router();
const sharp = require('sharp');
const MAX_COUNT = 10;

const multer = require('multer');
const upload = multer({dest: __dirname + '/temp'});
router.post("/convert", upload.array('images', MAX_COUNT), (req, res) => {

    // sharp.
});

module.exports = router;