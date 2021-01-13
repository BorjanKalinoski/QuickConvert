import {audioFormats, videoFormats} from "../constants";

const isDownloadFormatValid = (format: string): boolean => {
    return audioFormats.includes(format) || videoFormats.includes(format);
};
export default isDownloadFormatValid;