import { Request, Response, NextFunction } from 'express';

import { BadRequestError } from '@exeptions/ApiErrors';


const validateRequestId = (req: Request, res: Response, next: NextFunction) => {
    const requestId = Number(req.params.id);
  
    if (isNaN(requestId) || requestId <= 0) {
        throw new BadRequestError('Invalid id parametr');
    }

    next();
};

export default validateRequestId;