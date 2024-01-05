import { StatusCodes } from 'http-status-codes';

export class BaseApiError extends Error {
    public readonly name: string;
    public readonly statusCode: number;
    public readonly isOperational: string;
    public readonly description: string;
    
    constructor(name: string, statusCode: number, description: string, isOperational: string) {
      super()
      Object.setPrototypeOf(this, new.target.prototype);
    
      this.name = name;
      this.statusCode = statusCode;
      this.description = description
      this.isOperational = isOperational;
    
      Error.captureStackTrace(this);
    }
};

export class NotFoundError extends BaseApiError {
    constructor() {
        super('NOT FOUND', StatusCodes.NOT_FOUND, 'Resource with your unique field is not found', 'CLIENT_ERR');
    }
};

export class BadRequestError extends BaseApiError {
    constructor(description = 'Bad request error') {
        super('BAD REQUEST', StatusCodes.BAD_REQUEST, description, 'CLIENT_ERR');
    }
};

export class Unauthorized extends BaseApiError {
    constructor(description = 'Unauthorized error') {
        super('UNAUTHORIZED', StatusCodes.UNAUTHORIZED, description, 'CLIENT_ERR');
    }
};

export class Forbidden extends BaseApiError {
    constructor(description = 'Forbidden error') {
        super('FORBIDDEN', StatusCodes.FORBIDDEN, description, 'CLIENT_ERR');
    }
};

export class ConflictError extends BaseApiError {
    constructor(description = 'You`re trying to modify unique value, which is already in database') {
        super('CONFLICT', StatusCodes.CONFLICT, description, 'CLIENT_ERR')
    }
}

export class GatewayTimeoutError extends BaseApiError {
    constructor(description = "Database isn't responding, request timed out") {
        super('GATEWAY_TIMEOUT', StatusCodes.GATEWAY_TIMEOUT, description, 'SERVER_ERR')
    }
}