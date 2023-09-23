import { StatusCodes } from 'http-status-codes';

export class BaseApiError extends Error {
    public readonly name: string;
    public readonly httpCode: number;
    public readonly isOperational: boolean;
    
    constructor(name: string, httpCode: number, description: string, isOperational: boolean) {
      super(description);
      Object.setPrototypeOf(this, new.target.prototype);
    
      this.name = name;
      this.httpCode = httpCode;
      this.isOperational = isOperational;
    
      Error.captureStackTrace(this);
    }
};

export class NotFoundError extends BaseApiError {
    constructor(description = 'Not found error') {
        super('NOT FOUND', StatusCodes.NOT_FOUND, description, true);
    }
};

export class BadRequestError extends BaseApiError {
    constructor(description = 'Bad request error') {
        super('BAD REQUEST', StatusCodes.BAD_REQUEST, description, true);
    }
};