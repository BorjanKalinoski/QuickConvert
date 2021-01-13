import {NextFunction, Request, Response} from "express";
import {isDownloadFormatValid, isYoutubeUrlValid} from "../utils";

const validatePostRequest = (req: Request, res: Response, next: NextFunction) => {
    const {url, format} = req.body;

    if (!isYoutubeUrlValid(url) || !isDownloadFormatValid(format)) {
        return res.status(400).json({message: 'Invalid request'});
    }
    return next();
};

export default validatePostRequest;
