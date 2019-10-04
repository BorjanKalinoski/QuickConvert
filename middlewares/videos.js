const ytdl = require('ytdl-core');
const {InvalidVideoError, ConversionNotSupportedError} = require('../errors/errors');
const convertToVideoExtensions = process.env.CONVERT_TO_VIDEO_EXTENSIONS.split(' ');
const convertToAudioExtensions = process.env.CONVERT_TO_AUDIO_EXTENSIONS.split(' ');
const ffmpeg = require('fluent-ffmpeg');

const validateVideo = (req, res, next) => {
    let {url, toFormat} = req.body;
    toFormat = toFormat.toLowerCase();
    req.body.toFormat = req.body.toFormat.toLowerCase();
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (!url && match && match[2].length === 11) {
        throw new InvalidVideoError();
    }else if (!toFormat || (!convertToVideoExtensions.includes(toFormat) && !convertToAudioExtensions.includes(toFormat))) {
        throw new ConversionNotSupportedError();
    }

    req.body.mime = convertToAudioExtensions.includes(toFormat) ? 'audio' : 'video';

    return next();
};

const downloadVideo = async (req, res, next) => {
    const {url, toFormat} = req.body;
    const basicVideoInfo = await ytdl.getBasicInfo(url);

    req.body.readableStream = ytdl(url);
    req.body.title = basicVideoInfo.title;
    // req.body.readableVideoStream =;

    return next();
};

module.exports = {
    validateVideo,
    downloadVideo
};