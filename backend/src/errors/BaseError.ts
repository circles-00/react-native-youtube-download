export enum HttpStatusCode {
    OK = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED= 401,
    NOT_FOUND = 404,
    INTERNAL_SERVER = 500,
}

class BaseError extends Error {
    public readonly name: string;
    public readonly info: { [k: string]: any };
    public readonly httpCode: HttpStatusCode;
    public readonly isOperational: boolean;
    public readonly short_message: string;

    constructor(message: { [k: string]: any }, name: string, httpCode: HttpStatusCode, description: string, isOperational: boolean, short_message: string) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);

        this.name = name;
        this.info = message;
        this.httpCode = httpCode;
        this.isOperational = isOperational;
        this.short_message = short_message || message.toString();

        Error.captureStackTrace(this);
    }
}

export default BaseError