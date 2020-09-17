import {Request, Response, Router} from 'express';
const router = Router();
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import * as videoController from '../controllers/video-controller';
import ffmpeg from 'fluent-ffmpeg';
const ffmpegPath = ffmpegInstaller.path;
ffmpeg.setFfmpegPath(ffmpegPath);

const {validateVideo, getVideoInfo} = require('../middlewares/videos');

const downloadVideo = (req: Request, res: Response) => {

    const {videoStream, format, title, mimeType} = req.body;

    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Content-Type': mimeType
    });
    res.attachment(title);

    videoController.downloadVideo(videoStream, format, res).catch(err => {
        return res.status(400).json([{message: err.message}]).end(); //Can happen only if the client disrupts the request, maybe just log an error and nothing else
    });

};

router.post('/download', validateVideo, getVideoInfo, downloadVideo);

export default router;
