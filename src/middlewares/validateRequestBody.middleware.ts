import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

import { BadRequestError } from '@exeptions/ApiErrors';


const validateRequestBody = (sheme: Joi.Schema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = sheme.validate(req.body);
        if (error) {
            throw new BadRequestError('Invalid request body structure');
        }

        next();
    }
};

export default validateRequestBody;