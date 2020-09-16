import {Request, Response, Router} from 'express';
const router = Router();
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import ffmpeg from 'fluent-ffmpeg';
const ffmpegPath = ffmpegInstaller.path;
ffmpeg.setFfmpegPath(ffmpegPath);

const {validateVideo, getVideoInfo} = require('../middlewares/videos');

const convertVideo = (readableStream, format, res: Response) => {
    return new Promise(((resolve, reject) => {
        if (format === 'mp4') {
            readableStream.on('end', () => {
                console.log('end!');
            });
            readableStream.pipe(res);
        } else {
            ffmpeg(readableStream)
                .format(format)
                .on('end', () => {
                    console.log('end!');
                    resolve();
                })
                .on('stderr', (stderrLine) => {
                    console.log(`Converting video: ${stderrLine}`);
                })
                .on('error', (err, stdout, stderr) => {
                    console.log('ERROR!');
                    reject(err);
                })
                .pipe(res);
        }
    }));
};

const downloadVideo = async (req: Request, res: Response) => {
    try {
        const {readableStream, format, title, mimeType} = req.body;
        res.set({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            'Content-Type': mimeType
        });
        res.attachment(title);
        convertVideo(readableStream, format, res)
            .catch(err => {
                res.header('Content-Disposition', '');
                res.contentType('application/json;charset=utf-8');
                return res.status(400).json({message: err.message}).end();
            });
    } catch (e) {
        // logger.error(`Error converting video: ${e.message}`);
        return res.status(400).json([{message: e.message}]).end();
    }
};

router.post('/download', validateVideo, getVideoInfo, downloadVideo);

export default router;
