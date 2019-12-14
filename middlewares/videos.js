const ytdl = require('ytdl-core');
const log4js = require('log4js');
const logger = log4js.getLogger();
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
    let {url, convertTo} = req.body;
    logger.info(`Validating video: url: ${url} , convert to: ${convertTo}`);
    convertTo = convertTo.toLowerCase();
    req.body.toFormat = req.body.convertTo.toLowerCase();
    // eslint-disable-next-line no-useless-escape
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    if (!url && match && match[2].length === 11) {
        logger.error('Invalid video url');
        throw new InvalidVideoError();
    } else if (!convertTo || (!convertVideoExtensions.includes(convertTo) && !convertAudioExtensions.includes(convertTo))) {
        logger.error('Invalid conversion type');
        throw new ConversionNotSupportedError();
    }
    req.body.mimeType = mimeTypes.get(convertTo);
    return next();
};

const downloadVideo = async (req, res, next) => {
    try {
        const {url, convertTo} = req.body;
        logger.info('Downloading video');
        const basicVideoInfo = await ytdl.getBasicInfo(url);
        req.body.readableStream = ytdl(url);
        req.body.title = `${basicVideoInfo.title}.${convertTo}`;
        return next();
    } catch (e) {
        logger.error('Error downloading video');
        return res.status(400).json({message: e.message}).end();
    }
};

module.exports = {
    validateVideo,
    downloadVideo
};