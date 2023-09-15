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
    constructor(description = 'bad request') {
        super('NOT FOUND', StatusCodes.NOT_FOUND, description, true);
    }
};