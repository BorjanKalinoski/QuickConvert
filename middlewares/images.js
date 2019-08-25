const _ = require('lodash');
const yazl = require('yazl');
const sharp = require('sharp');
const MulterError = require('multer').MulterError;
const {BadFileTypeError, ExceededFileSizeError, ConversionNotSupportedError} = require('../errors/errors');
const mimeTypes = process.env.MIME_TYPES.split(' ');
const fileExtensions = process.env.FILE_EXTENSIONS.split(' ');
const convertFileExtensions = process.env.CONVERT_FILE_EXTENSIONS.split(' ');

const validateFiles = (req, res, next) => {
    const N = _.get(req.files, 'length');
    if (!N) {
        if (N === 0) {
            throw new MulterError('LIMIT_UNEXPECTED_FILE');
        }
        throw new BadFileTypeError();
    }
    req.body.convertTo = req.body.convertTo.toLowerCase();
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
    if (!_file
        || (!mimeTypes.includes(_file.mimetype)
            && !fileExtensions.includes(_file.originalname.split('.').pop()))
    ) {
        throw new BadFileTypeError();
    } else if (_file.size > process.env.DATABASE_URL) {
        throw new ExceededFileSizeError();
    }
};

const convertFiles = async (req, res, next) => {
    let convertedFiles = [];
    try {
        // eslint-disable-next-line require-atomic-updates
        req.files = await Promise.all(req.files.map(async (file) => {
            let convertTo = req.body.convertTo;
            let originalName = file.originalname.split('.')[0];
            let filename = `${originalName}.${convertTo}`;
            while (convertedFiles.includes(filename)) {
                originalName = `${originalName} (1)`;
                filename = `${originalName}.${convertTo}`;
            }
            convertedFiles.push(filename);
            const convertedBuffer = await convertFile(file.buffer, convertTo);
            return {
                data: convertedBuffer,
                filename: filename,
            };
        }));
        return next();
    } catch (e) {
        return next(e);
    }
};

const convertFile = (buffer, convertTo) => {
    switch (convertTo) {
        case 'jpg':
        case 'jpeg':
            return sharp(buffer).jpeg({quality: 100}).toBuffer();
        case 'png':
            return sharp(buffer).png({quality: 100}).toBuffer();
        case 'webp':
            return sharp(buffer).webp({lossless: true, quality: 100}).toBuffer();
        case 'tiff':
        case 'tif':
            return sharp(buffer).tiff({compression: 'lzw'}).toBuffer();
        default:
            throw new BadFileTypeError();
    }
};

const zipFiles = async (req, res, next) => {
    const zipFile = new yazl.ZipFile();
    req.files.map(file => {
        zipFile.addBuffer(file.data, file.filename);
    });
    zipFile.end();
    // eslint-disable-next-line require-atomic-updates
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