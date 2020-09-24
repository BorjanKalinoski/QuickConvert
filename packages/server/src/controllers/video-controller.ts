import {Response} from "express";
import ffmpeg from "fluent-ffmpeg";
import {Readable} from "stream";

export const downloadVideo = (videoStream: Readable, format: string, res: Response) => {
    return new Promise((resolve, reject) => {
        if (format === 'mp4') {
            videoStream.pipe(res);
        } else {
            ffmpeg(videoStream)
                .format(format)
                .on('end', () => {
                    console.log('end!');
                    resolve();
                })
                .on('stderr', (stderrLine) => {
                    console.log(`Converting video: ${stderrLine}`);
                })
                .on('error', (err, stdout, stderr) => {
                    reject(err);
                })
                .pipe(res);
        }
    });
};
