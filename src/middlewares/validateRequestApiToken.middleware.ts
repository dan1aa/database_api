import { Request, Response, NextFunction } from 'express';

import { Unauthorized, Forbidden } from '@utils/exeptions/ApiErrors';

const validateRequestApiToken = (req: Request, res: Response, next: NextFunction) => {
    const apiToken = req.headers['api-token'];

    if (!apiToken) {
        throw new Unauthorized('Unauthorized: Missing token');
    }
    
    if (apiToken !== process.env.API_TOKEN) {
        throw new Forbidden('Forbidden: Invalid token');
    }

    next();
};

export default validateRequestApiToken;