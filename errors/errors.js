class BadFileTypeError extends Error {
    constructor(message) {
        super(message);
        this.message = 'File type not supported for conversion';
    };
}
class ExceededFileSizeError extends Error {
    constructor(message) {
        super(message);
        this.message = 'File size exceeds the allowed amount';
    }
}
class ConversionNotSupportedError extends Error {
    constructor(message) {
        super(message);
        this.message = 'Cannot convert to provided file type';
    }
}
module.exports = {
    ExceededFileSizeError,
    BadFileTypeError,
    ConversionNotSupportedError
};