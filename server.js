require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const {BadFileTypeError, ExceededFileSizeError, ConversionNotSupportedError} = require('./errors/errors');
const MulterError = require('multer').MulterError;
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useCreateIndex: true});
const db = mongoose.connection;

db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to db'));

const imagesRouter = require('./routes/images');
app.use("/images", imagesRouter);
// app.use((req, res, next) => {
//     const error = new Error('Not found');
//     error.status = 404;
//     next(error);
// });
app.use((error, req, res, next) => {
    if (error instanceof BadFileTypeError || error instanceof ExceededFileSizeError || error instanceof ConversionNotSupportedError) {
        return res.status(400).json({
            error: error.message
        }).end();
    } else if (error instanceof MulterError) {
        if (error.code === 'LIMIT_UNEXPECTED_FILE') {
            return res.status(400).json({
                error: "Please provide a valid number of files"
            }).end();
        }
    }
    return res.status(res.status || 500).json({
        error: {
            message: error.message
        }
    }).end();
});
app.listen(3000, () => {
    console.log('Server listening on port 3000')
});