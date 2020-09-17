export class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
    }
}

export class FormatNotValidError extends BadRequestError {
    constructor(message) {
        super(message);
        this.message = message;
    }
}

export class UrlNotValidError extends BadRequestError {
    constructor(message) {
        super(message);
        this.message = 'Invalid video provided';
    }
}
