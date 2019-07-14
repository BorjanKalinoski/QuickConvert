class BadFileTypeError extends Error {
    constructor(message) {
        super(message);
        this.error = 'File type not supported for conversion';
    };
}
class ExceededFileSizeError extends Error {
    constructor(message) {
        super(message);
        this.error = 'File size exceeds the allowed amount';
    }
}
module.exports = {
    ExceededFileSizeError,
    BadFileTypeError
};