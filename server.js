require('dotenv-extended').load();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const pino = require('pino');
const expressPino = require('express-pino-logger');

const logger = pino({ level: process.env.LOG_LEVEL || 'info' });
const expressLogger = expressPino({ logger });

// const mongoose = require('mongoose');
const {BadRequestError} = require('./errors/errors');
const MulterError = require('multer').MulterError;

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger.info(`Server listening on port ${PORT || 3000}`);
});

// mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useCreateIndex: true});
// const db = mongoose.connection;

// db.on('error', (error) => {
//     throw new Error(error);
// });
// db.once('open', () => {
//    TODO logger
// });

// const imagesRouter = require('./routes/images');
const videosRouter = require('./routes/videos');

app.use(expressLogger);
app.use(express.static(path.join(__dirname, 'frontend/build')));
app.use(bodyParser.json());
app.use(cors({
    credentials:true,
    exposedHeaders:[
        'Content-Disposition'
    ]
}));

// app.use('/api/images', imagesRouter);
app.use('/api/videos', videosRouter);

app.use((error, req, res, _next) => {
    logger.error(`Unexpected error ${error.message}`);

    if (error instanceof BadRequestError) {
        return res.status(400).json({
            error: error.message
        }).end();
    } else if (error instanceof MulterError) {
        if (error.code === 'LIMIT_UNEXPECTED_FILE') {
            return res.status(400).json({
                error: 'Please provide a valid number of files'
            }).end();
        }
    }

    return res.status(res.status || 500).json({
        error: {
            message: error.message
        }
    }).end();
});