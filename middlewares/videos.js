const ytdl = require('ytdl-core');
const pino = require('pino');
const logger = pino({ level: process.env.LOG_LEVEL || 'info' });
logger.level = 'debug';

const {InvalidVideoError, ConversionNotSupportedError} = require('../errors/errors');
const convertVideoExtensions = process.env.CONVERT_VIDEO_FILE_EXTENSIONS.split(' ');
const convertAudioExtensions = process.env.CONVERT_AUDIO_FILE_EXTENSIONS.split(' ');
const mimeTypes = new Map();

convertAudioExtensions.forEach(element => {
    if (element === 'mp3') {
        mimeTypes.set(element, 'audio/mpeg');
    } else {
        mimeTypes.set(element, `audio/${element}`);
    }
});

convertVideoExtensions.forEach(element => {
    if (element === 'flv') {
        mimeTypes.set(element, `video/x-${element}`);
    } else {
        mimeTypes.set(element, `video/${element}`);
    }
});

const validateVideo = (req, res, next) => {
    let {format, url} = req.body;
    logger.info(`Validating video: url: ${url} , convert to: ${format}`);
    format = format.toLowerCase();
    req.body.toFormat = req.body.format.toLowerCase();

    // eslint-disable-next-line no-useless-escape
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    if (!url && match && match[2].length === 11) {
        logger.error('Invalid video url');
        throw new InvalidVideoError();
    } else if (!format || (!convertVideoExtensions.includes(format) && !convertAudioExtensions.includes(format))) {
        logger.error('Invalid conversion type');
        throw new ConversionNotSupportedError();
    }

    req.body.mimeType = mimeTypes.get(format);
    return next();
};

const downloadVideo = async (req, res, next) => {
    try {
        const {url, format} = req.body;

        logger.info('Downloading video');
        const basicVideoInfo = await ytdl.getBasicInfo(url);

        req.body.readableStream = ytdl(url);
        req.body.title = `${basicVideoInfo.title}.${format}`;
        return next();
    } catch (e) {
        logger.error('Error downloading video: \n', e.message);
        return res.status(400).json({message: e.message}).end();
    }
};

module.exports = {
    validateVideo,
    downloadVideo
};