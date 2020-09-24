import {audioFormats, videoFormats} from './formats';

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
export default mimeTypes;


