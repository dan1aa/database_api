import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

import { BaseApiError } from '@utils/exeptions/ApiErrors';

const errorHandler = (
    error: BaseApiError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = error instanceof BaseApiError 
        ? error.httpCode 
        : StatusCodes.INTERNAL_SERVER_ERROR;

    console.log(error);
    
    res.status(statusCode).json({
        msg: error instanceof BaseApiError 
            ? error.message 
            : 'Internal server error',
    });
};

export default errorHandler;