const ytdl = require('ytdl-core');
const {InvalidVideoError, ConversionNotSupportedError} = require('../errors/errors');
const convertVideoExtensions = process.env.CONVERT_VIDEO_FILE_EXTENSIONS.split(' ');
const convertAudioExtensions = process.env.CONVERT_AUDIO_FILE_EXTENSIONS.split(' ');
const mimeTypes=new Map();

convertAudioExtensions.forEach(element=>{
    if(element==='mp3'){
        mimeTypes.set(element,'audio/mpeg');
    }else{
        mimeTypes.set(element,`audio/${element}`)
    }
});
convertVideoExtensions.forEach(element=>{
    if(element==='flv') {
        mimeTypes.set(element,`video/x-${element}`);
    }else if(element==='wmv') {
        mimeTypes.set(element,'video/x-ms-wmv'); 
    }else {
        mimeTypes.set(element,`video/${element}`);
    }//TODO mov
});
const validateVideo = (req, res, next) => {
    let {url, convertTo} = req.body;
    convertTo = convertTo.toLowerCase();
    req.body.toFormat = req.body.convertTo.toLowerCase();
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (!url && match && match[2].length === 11) {
        throw new InvalidVideoError();
    }else if (!convertTo || (!convertVideoExtensions.includes(convertTo) && !convertAudioExtensions.includes(convertTo))) {
        throw new ConversionNotSupportedError();
    }
    req.body.mimeType=mimeTypes.get(convertTo);
    
    return next();
};

const downloadVideo = async (req, res, next) => {
    const {url, convertTo} = req.body;
    const basicVideoInfo = await ytdl.getBasicInfo(url);
    req.body.readableStream = ytdl(url);
    req.body.title = `${basicVideoInfo.title}.${convertTo}`;

    return next();
};

module.exports = {
    validateVideo,
    downloadVideo
};