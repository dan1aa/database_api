"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewayTimeoutError = exports.ConflictError = exports.Forbidden = exports.Unauthorized = exports.BadRequestError = exports.NotFoundError = exports.BaseApiError = void 0;
const http_status_codes_1 = require("http-status-codes");
class BaseApiError extends Error {
    constructor(name, statusCode, description, isOperational) {
        super();
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
        this.statusCode = statusCode;
        this.description = description;
        this.isOperational = isOperational;
        Error.captureStackTrace(this);
    }
}
exports.BaseApiError = BaseApiError;
;
class NotFoundError extends BaseApiError {
    constructor() {
        super('NOT FOUND', http_status_codes_1.StatusCodes.NOT_FOUND, 'Resource with your unique field is not found', 'CLIENT_ERR');
    }
}
exports.NotFoundError = NotFoundError;
;
class BadRequestError extends BaseApiError {
    constructor(description = 'Bad request error') {
        super('BAD REQUEST', http_status_codes_1.StatusCodes.BAD_REQUEST, description, 'CLIENT_ERR');
    }
}
exports.BadRequestError = BadRequestError;
;
class Unauthorized extends BaseApiError {
    constructor(description = 'Unauthorized error') {
        super('UNAUTHORIZED', http_status_codes_1.StatusCodes.UNAUTHORIZED, description, 'CLIENT_ERR');
    }
}
exports.Unauthorized = Unauthorized;
;
class Forbidden extends BaseApiError {
    constructor(description = 'Forbidden error') {
        super('FORBIDDEN', http_status_codes_1.StatusCodes.FORBIDDEN, description, 'CLIENT_ERR');
    }
}
exports.Forbidden = Forbidden;
;
class ConflictError extends BaseApiError {
    constructor(description = 'You`re trying to modify unique value, which is already in database') {
        super('CONFLICT', http_status_codes_1.StatusCodes.CONFLICT, description, 'CLIENT_ERR');
    }
}
exports.ConflictError = ConflictError;
class GatewayTimeoutError extends BaseApiError {
    constructor(description = "Database isn't responding, request timed out") {
        super('GATEWAY_TIMEOUT', http_status_codes_1.StatusCodes.GATEWAY_TIMEOUT, description, 'SERVER_ERR');
    }
}
exports.GatewayTimeoutError = GatewayTimeoutError;
