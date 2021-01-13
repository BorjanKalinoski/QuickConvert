import {NextFunction, Request, Response} from "express";
import {mimeTypes} from "../constants";
import ytdl from "ytdl-core";

const buildVideoInfo = async (req: Request, res: Response, next: NextFunction) => {
    const {url, format} = req.body;
    try {
        if (!mimeTypes.get(format)) {
            throw new Error('Format not found!')
        }

        const videoInfo = await ytdl.getBasicInfo(url);

        req.body.title = `${videoInfo.videoDetails.title}.${format}`;
        req.body.mimeType = mimeTypes.get(format);
        req.body.videoStream = ytdl(url);

        return next();
    } catch (e) {
        return res.status(400).json({message: 'Invalid request'});
    }
};

export default buildVideoInfo;