import { ConflictError, GatewayTimeoutError, NotFoundError } from '@utils/exeptions/ApiErrors';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';


const tryCatchMiddleware = (handler: (req: Request, res: Response, next: NextFunction) => any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await handler(req, res, next);
        } catch (error: any) {
            switch (error?.code) {
                case 'P2025': return res.status(StatusCodes.NOT_FOUND).json(new NotFoundError)
                case 'P2002': return res.status(StatusCodes.CONFLICT).json(new ConflictError)
                case 'P1008': return res.status(StatusCodes.GATEWAY_TIMEOUT).json(new GatewayTimeoutError)
            }

            next(error);
        }
    };
};

export default tryCatchMiddleware;
