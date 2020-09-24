import {Request, Response, Router} from 'express';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
// @ts-ignore
import ffmpeg from 'fluent-ffmpeg';
import {VideoData} from '@quickconvert/common';
import {validateVideo, getVideoInfo} from "../middlewares/videos";
import * as videoController from '../controllers/video-controller';

const ffmpegPath = ffmpegInstaller.path;
ffmpeg.setFfmpegPath(ffmpegPath);

const router = Router();

const downloadVideo = (req: Request, res: Response) => {

    const {videoStream, format, title, mimeType}: VideoData = req.body;

    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Content-Type': mimeType
    });
    res.attachment(title);

    videoController.downloadVideo(videoStream, format, res).catch(err => {
        return res.status(400).json([{message: err.message}]).end(); //Can happen only if the client disrupts the request, maybe just log an error and nothing else
    }).finally(()=>{
    });

};

router.post('/download', validateVideo, getVideoInfo, downloadVideo);

export default router;
