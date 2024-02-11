import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

import { BadRequestError } from '@utils/exeptions/ApiErrors';


const validateRequestBody = (sheme: Joi.Schema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = sheme.validate(req.body);
        const details = error?.details[0]
        const errorMessage = details?.type.includes('uknown') ? `Field ${details?.path} is not allowed` : `Invalid type on field ${details?.path}`;
        
        if (error) {
            const { name, statusCode, description, isOperational } = new BadRequestError(errorMessage);
            res.status(statusCode).json({ name, statusCode, description, isOperational })
            
            return;
        }

        next();
    }
};

export default validateRequestBody;