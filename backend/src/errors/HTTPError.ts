import BaseError, {HttpStatusCode} from "./BaseError";

class HTTPError extends BaseError {
    constructor(message: { [k: string]: any }, name: string, short_message: string , httpCode = HttpStatusCode.INTERNAL_SERVER, description = 'internal server error', isOperational = true) {
        super(message, name, httpCode, description, isOperational, short_message);
    }
}

export default HTTPError;