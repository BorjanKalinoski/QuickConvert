import ytdl from 'ytdl-core';
import {Request, Response, NextFunction} from 'express';
import {audioFormats, videoFormats} from '../common/constants/formats';
const {InvalidVideoError, ConversionNotSupportedError} = require('../errors/errors');
const mimeTypes = new Map();

audioFormats.forEach(format => {
    if (format === 'mp3') {
        mimeTypes.set(format, 'audio/mpeg');
    } else {
        mimeTypes.set(format, `audio/${format}`);
    }
});

videoFormats.forEach(format => {
    if (format === 'flv') {
        mimeTypes.set(format, `video/x-${format}`);
    } else {
        mimeTypes.set(format, `video/${format}`);
    }
});

const validateVideo = (req: Request, res: Response, next: NextFunction) => {
    let {format, url} = req.body;
    // logger.info(`Validating video: url: ${url} , convert to: ${format}`);
    format = format.toLowerCase();
    req.body.toFormat = req.body.format.toLowerCase();

    // eslint-disable-next-line no-useless-escape
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    if (!url && match && match[2].length === 11) {
        // logger.error('Invalid video url');
        throw new InvalidVideoError();
    } else if (!format || (!videoFormats.includes(format) && !audioFormats.includes(format))) {
        // logger.error('Invalid conversion type');
        throw new ConversionNotSupportedError();
    }

    req.body.mimeType = mimeTypes.get(format);
    return next();
};

const downloadVideo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {url, format} = req.body;

        // logger.info('Downloading video');
        const basicVideoInfo = await ytdl.getBasicInfo(url);

        req.body.readableStream = ytdl(url);
        req.body.title = `${basicVideoInfo.title}.${format}`;
        return next();
    } catch (e) {
        // logger.error('Error downloading video: \n', e.message);
        return res.status(400).json({message: e.message}).end();
    }
};

module.exports = {
    validateVideo,
    downloadVideo
};