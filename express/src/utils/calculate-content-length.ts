const calculateContentLength = (lengthSeconds: number, bitrate: number = 128): number => {
    // x = length of song in seconds
    //
    // y = bitrate in kilobits per second
    //
    // (x * y) / 8
    // (x * y) * 125
    return (lengthSeconds * bitrate) * 125;
};

export default calculateContentLength;