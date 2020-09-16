import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import path from "path";
import {BadRequestError} from './errors/errors';
import {ErrorDTO} from './common/models/ErrorDTO';

import videosRouter from './routes/videos';

const app = express();
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
    let errorDto: ErrorDTO = {
        message: error.message
    };

    if (error instanceof BadRequestError) {
        errorDto.message = error.message;
        return res.status(400).json(errorDto);
    }
    console.log('tuka?');
    console.log(error);

    return res.status(res.status || 500).json(errorDto).end();
});