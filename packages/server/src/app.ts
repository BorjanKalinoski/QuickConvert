import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import path from "path";
import {ErrorDto} from '@quickconvert/common';


import videosRouter from './routes/videos';

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT || 3000}`);
});


app.use(express.static(path.join(__dirname, '../frontend/build')));
app.use(bodyParser.json());
app.use(cors({
    credentials: true,
    exposedHeaders: [
        'Content-Disposition'
    ]
}));

app.use('/api/videos', videosRouter);

app.use((error, req, res, _next) => {

    const errors: ErrorDto[] = [{
        message: error.message
    }];
    if (error.inner) {
        error.inner.forEach(error => {
            errors.push({
                name: error.path,
                message: error.message
            });
        });
    }
    return res.status(res.status || 500).json(errors).end();
});