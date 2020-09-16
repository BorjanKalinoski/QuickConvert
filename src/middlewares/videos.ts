import ytdl from 'ytdl-core';
import {Request, Response, NextFunction} from 'express';
import mimeTypes from '../common/constants/mime-types';
import {ErrorDTO} from "../common/models/ErrorDTO";
import {validationSchema} from "../common/validation/validation";

const validateVideo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await validationSchema.validate(req.body, {abortEarly: false});

        return next();
    } catch (e) {
        const errors: ErrorDTO[] = [];
        e.inner.forEach(error => {
            errors.push({
                name: error.path,
                message: error.message
            });
        });
        return res.status(400).json(errors);
    }
};

const getVideoInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {url, format} = req.body;

        const info = await ytdl.getBasicInfo(url);

        req.body.readableStream = ytdl(url);
        req.body.title = `${info.videoDetails.title}.${format}`;
        req.body.mimeType = mimeTypes.get(format);
        return next();
    } catch (e) {
        const errorDto: ErrorDTO[] = [{
            message: e.message
        }];
        return res.status(400).json(errorDto);
    }
};

module.exports = {
    validateVideo,
    getVideoInfo
};