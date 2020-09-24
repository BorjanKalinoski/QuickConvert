import ytdl from 'ytdl-core';
import {Request, Response, NextFunction} from 'express';
import {validationSchema, ErrorDto, mimeTypes} from "@quickconvert/common";

export const validateVideo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await validationSchema.validate(req.body, {abortEarly: false});

        return next();
    } catch (e) {
        const errors: ErrorDto[] = [];
        e.inner.forEach(error => {
            errors.push({
                name: error.path,
                message: error.message
            });
        });
        return res.status(400).json(errors);
    }
};

export const getVideoInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {url, format} = req.body;

        const info = await ytdl.getBasicInfo(url);

        req.body.videoStream = ytdl(url);
        req.body.title = `${info.videoDetails.title}.${format}`;
        req.body.mimeType = mimeTypes.get(format);
        return next();
    } catch (e) {
        const errorDto: ErrorDto[] = [{
            message: e.message
        }];
        return res.status(400).json(errorDto);
    }
};
