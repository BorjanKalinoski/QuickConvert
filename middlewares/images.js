// const express = require('express');
const _ = require('lodash');
const {BadFileTypeError, ExceededFileSizeError} = require('../errors/errors');
const mimeTypes = ['image/gif', 'image/jpeg', 'image/tiff', 'image/png', 'image/webp'];
const fileExtensions = ['jpg', 'jpeg', 'png', 'gif', 'tiff', 'webp'];
const MAX_SIZE = 100000;
const sharp = require('sharp');
const convertFile = (buffer, convertTo) => {
    switch (convertTo) {
        case "jpg" || "jpeg":
            return sharp(buffer).jpeg({
                quality: 100
            }).toBuffer();
        case "png":
            return sharp(buffer).png({quality: 100}).toBuffer();
        default:
            throw new BadFileTypeError();
    }
};
const convertFiles = async (req, res, next) => {
    try {
        console.log('files are ');
        console.log(req.files);
        req.files = await Promise.all(req.files.map(async (file) => {
            let filename = file.originalname.split('.')[0];
            let convertTo = req.body.convertTo;
            const convertedBuffer = await convertFile(file.buffer, convertTo);
            return {
                data: convertedBuffer,
                filename: `${filename}.${convertTo}`,
            };
        }));
        return next();
    } catch (e) {
        if (e instanceof BadFileTypeError || e instanceof ExceededFileSizeError) {
            return res.status(400).json(e);
        }
        return res.status(500);
    }
};


const validateFiles = (req, res, next) => {
    try {
        const N = _.get(req.files, 'length');
        if (!N) {
            throw new BadFileTypeError();
        }
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
    const _file = _.pick(file, ['originalname', 'mimetype', 'buffer']);
    if (!_file || (!mimeTypes.includes(_file.mimetype)
        && !fileExtensions.includes(_file.originalname.split('.').pop()))
    ) {
        throw new BadFileTypeError();
    } else if (_file.size > MAX_SIZE) {
        throw new ExceededFileSizeError();
    }
};
module.exports = {
    validateFiles,
    convertFiles
};