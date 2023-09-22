import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

import { BaseApiError } from '@exeptions/ApiErrors';

const errorHandler = (
    error: BaseApiError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = error instanceof BaseApiError 
        ? error.httpCode 
        : StatusCodes.INTERNAL_SERVER_ERROR;
    
    //TODO: Handle Internal server error (make loging)
    res.status(statusCode).json({
        msg: error instanceof BaseApiError 
            ? error.message 
            : 'Internal Server Error',
    });
};

export default errorHandler;