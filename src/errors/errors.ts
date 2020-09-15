class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
    }
}

class BadFileTypeError extends BadRequestError {
    constructor(message) {
        super(message);
        this.message = 'File type not supported for conversion';
    }
}

class ExceededFileSizeError extends BadRequestError {
    constructor(message) {
        super(message);
        this.message = 'File size exceeds the allowed amount';
    }
}

class ConversionNotSupportedError extends BadRequestError {
    constructor(message) {
        super(message);
        this.message = 'Cannot convert to provided file type';
    }
}

class InvalidVideoError extends BadRequestError {
    constructor(message) {
        super(message);
        this.message = 'Invalid video provided';
    }
}

export default {
    ExceededFileSizeError,
    BadFileTypeError,
    ConversionNotSupportedError,
    InvalidVideoError,
    BadRequestError
}
