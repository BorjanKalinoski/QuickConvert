const express = require('express');
const {BadFileTypeError, ExceededFileSizeError} = require('../errors/errors');
const mimeTypes = ['image/gif', 'image/jpeg', 'image/tiff', 'image/png', 'image/webp'];
const fileExtensions = ['jpg', 'jpeg', 'png', 'gif', 'tiff', 'webp'];
const MAX_SIZE = 100000;
const validateFiles = (req, res, next) => {
    try {
        const N = req.files.length;
        for (let i = 0; i < N; i++) {
            isFileValid(req.files[i]);
        }
        return next();
    } catch (e) {
        if (e instanceof BadFileTypeError || e instanceof ExceededFileSizeError) {
            return res.status(400).json(e);
        }
        return res.status(500);
    }
};

const isFileValid = (file) => {
    if (!mimeTypes.includes(file.mimetype)
        || file.filename.endsWith(".jpg")
        || file.filename.endsWith(".jpeg")
        || file.filename.endsWith(".png")
        || file.filename.endsWith(".gif")
        || file.filename.endsWith(".tiff")
        || file.filename.endsWith(".webp")
    ) {
        throw new BadFileTypeError();
    } else if (file.size > MAX_SIZE) {
        throw new ExceededFileSizeError();
    }
};
module.exports = {
    validateFiles,
};