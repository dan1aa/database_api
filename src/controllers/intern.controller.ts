import { NextFunction, Request, Response } from 'express';
import * as InternService from '../services/intern.service';

export const getInternById = async (req: Request, res: Response, next: NextFunction) => {
    const internId = Number(req.params.id);
    const result = await InternService.getInternById(internId);
        
    res.status(200).json(result);
};

export const filterInterns = async (req: Request, res: Response) => {
    const filteringParams = req.query;
    const result = await InternService.filterInterns(filteringParams);

    res.status(200).json(result);
};