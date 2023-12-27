import { Request, Response, NextFunction } from 'express';

import { BadRequestError } from '@utils/exeptions/ApiErrors';


const validateRequestId = (req: Request, _: Response, next: NextFunction) => {
    const requestId = Number(req.params.id);
  
    if (isNaN(requestId) || requestId <= 0) {
        throw new BadRequestError('Invalid id parameter');
    }

    next();
};

export default validateRequestId;