import {NextFunction, Request, Response} from "express";

import ffmpeg, {FfmpegCommand} from 'fluent-ffmpeg';
import {Readable} from "stream";
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');

const ffmpegPath = ffmpegInstaller.path;
ffmpeg.setFfmpegPath(ffmpegPath);

const downloadVideo = (req: Request, res: Response, _next: NextFunction) => {
    const {videoStream, format} = req.body;

    return new Promise((resolve, reject) => {
        getDownloadStream(format, videoStream)
            .on('end', () => {
                resolve('end');
            })
            .on('stderr', (stderrLine) => {
                console.log(`Converting video: ${stderrLine}`);
            })
            .on('error', (err, stdout, stderr) => {
                reject(err);
            })
            .pipe(res);
    }).catch(err => {
        console.log('manchester', err);
        return res.status(400).json({message: err.message}).end();
        // Can happen only if the client disrupts the request, maybe just log an error and nothing else
    });
};


const getDownloadStream = (format: string, videoStream: Readable): Readable | FfmpegCommand => {
    return format === 'mp4'
        ? videoStream
        : ffmpeg(videoStream).format(format);
};


export default downloadVideo;