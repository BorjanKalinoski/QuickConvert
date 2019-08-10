const _ = require('lodash');
const yazl = require('yazl');
const MAX_COUNT = process.env.MAX_COUNT;
const MAX_SIZE = process.env.MAX_SIZE;
const Files = require('../models/files');
const MulterError = require('multer').MulterError;
const {BadFileTypeError, ExceededFileSizeError, ConversionNotSupportedError} = require('../errors/errors');
const mimeTypes = ['image/gif', 'image/jpeg', 'image/tiff', 'image/png', 'image/webp', 'image/svg+xml'];
const fileExtensions = ['jpg', 'jpeg', 'png', 'gif', 'tiff', 'tif', 'webp', 'svg'];
const convertFileExtensions = ['jpg', 'jpeg', 'webp', 'png', 'tiff', 'tif'];
const sharp = require('sharp');
const convertFile = (buffer, convertTo) => {
    switch (convertTo) {
        case "jpg" || "jpeg":
            return sharp(buffer).jpeg({
                quality: 100
            }).toBuffer();
        case "png":
            return sharp(buffer).png({quality: 100}).toBuffer();
        case "webp":
            return sharp(buffer).webp({lossless: true, quality: 100}).toBuffer();
        case "tiff" || "tif":
            return sharp(buffer).tiff({compression: 'lzw'}).toBuffer();
        default:
            throw new BadFileTypeError();
    }
};
const convertFiles = async (req, res, next) => {
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
};

const validateFiles = (req, res, next) => {
    const N = _.get(req.files, 'length');
    if (!N) {
        if (N === 0) {
            throw new MulterError('LIMIT_UNEXPECTED_FILE');
        }
        throw new BadFileTypeError();
    }
    if (!convertFileExtensions.includes(req.body.convertTo)) {
        throw new ConversionNotSupportedError();
    }
    for (let i = 0; i < N; i++) {
        isFileValid(req.files[i]);
    }
    return next();
};

const isFileValid = (file) => {
    const _file = _.pick(file, ['originalname', 'mimetype', 'buffer']);
    if (!_file || (!mimeTypes.includes(_file.mimetype)
        && !fileExtensions.includes(_file.originalname.split('.').pop()))
    ) {
        throw new BadFileTypeError();
    } else if (_file.size > process.env.DATABASE_URL) {
        throw new ExceededFileSizeError();
    }
};

const zipFiles = async (req, res, next) => {
    const zipFile = new yazl.ZipFile();

    req.files.map(file => {
        zipFile.addBuffer(file.data, file.filename);
    });
    zipFile.end();
    req.buffer = await stream2buffer(zipFile.outputStream);
    return next();
};
function stream2buffer(readableStream) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        readableStream.on('data', (chunk) => {
            chunks.push(chunk);
        }).on('end', () => {
            resolve(Buffer.concat(chunks));
        }).on('error', (err) => {
            reject(err);
        });
    });
}
module.exports = {
    validateFiles,
    convertFiles,
    zipFiles
};