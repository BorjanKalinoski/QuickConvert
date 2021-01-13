import {audioFormats, videoFormats} from "./formats";

const mimeTypes = new Map();

audioFormats.forEach(format => {
    mimeTypes.set(format, format !== 'mp3' ? `audio/${format}` : 'audio/mpeg');
});

videoFormats.forEach(format => {
    mimeTypes.set(format, format !== 'flv' ? `video/${format}` : `video/x-${format}`);
});

export default mimeTypes;