import {NextFunction, Request, Response} from "express";

const setResponseHeaders = (req: Request, res: Response, next: NextFunction) => {
    const {title, mimeType} = req.body;
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Content-Type': mimeType
    });
    res.attachment(encodeURIComponent(title));
    return next();
};

export default setResponseHeaders;