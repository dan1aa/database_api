import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '@utils/exeptions/ApiErrors';

const validateRequestId = (req: Request, res: Response, next: NextFunction) => {
    const requestId = Number(req.params.id);
  
    if (isNaN(requestId) || requestId <= 0) {
        const { statusCode, name, description, isOperational } = new BadRequestError('Invalid id parameter');
        return res.status(statusCode).json({ name, statusCode, description, isOperational });
    }

    next();
};

export default validateRequestId;