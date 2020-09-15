import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import path from "path";

const app = express();
import BadRequestError from './errors/errors';
import videosRouter from './routes/videos';

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT || 3000}`);
});


app.use(express.static(path.join(__dirname, 'frontend/build')));
app.use(bodyParser.json());
app.use(cors({
    credentials: true,
    exposedHeaders: [
        'Content-Disposition'
    ]
}));

app.use('/api/videos', videosRouter);

app.use((error, req, res, _next) => {
    // logger.error(`Unexpected error ${error.message}`);

    // @ts-ignore
    if (error instanceof BadRequestError) {
        return res.status(400).json({
            error: error.message
        }).end();
    }
    // else if (error instanceof MulterError) {
    //     if (error.code === 'LIMIT_UNEXPECTED_FILE') {
    //         return res.status(400).json({
    //             error: 'Please provide a valid number of files'
    //         }).end();
    //     }
    // }

    return res.status(res.status || 500).json({
        error: {
            message: error.message
        }
    }).end();
});