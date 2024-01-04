import { ConflictError, NotFoundError } from '@utils/exeptions/ApiErrors';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';


const tryCatchMiddleware = (handler: (req: Request, res: Response, next: NextFunction) => any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await handler(req, res, next);
        } catch (error: any) {
            if (error?.code === 'P2025') {
                return res.status(StatusCodes.NOT_FOUND).json(new NotFoundError)
            } else if (error?.code === 'P2002') {
                return res.status(StatusCodes.CONFLICT).json(new ConflictError)
            }
            next(error);
        }
    };
};

export default tryCatchMiddleware;
