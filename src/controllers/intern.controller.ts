import { Request, Response } from 'express';
import * as InternService from '../services/intern.service';

export const getInternById = async (req: Request, res: Response) => {
    try {
        const internId = Number(req.params.id);
        const result = await InternService.getInternById(internId);

        res.status(200).json(result);
    } catch(e) {
        //TODO: Implement Error middleware
    }
};

export const filterInternts = async (req: Request, res: Response) => {
    try {
        const filteringParams = req.query;
        const result = await InternService.filterInterns(filteringParams);
        res.status(200).json(result);
    } catch(e) {
        //TODO: Implement Error middleware
    } 
};