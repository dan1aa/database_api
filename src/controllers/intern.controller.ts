import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import * as InternService from '@services/intern.service';


export const createIntern = async (req: Request, res: Response) => {
    const internData = req.body;

    const result = await InternService.createIntern(internData);

    res.status(StatusCodes.CREATED).json(result).end();
};

export const updateInternById = async (req: Request, res: Response) => {
    const internId = Number(req.params.id);
    const internData = req.body;

    await InternService.updateInternById(internId, internData);

    res.status(StatusCodes.OK).end();
};

export const getInternById = async (req: Request, res: Response) => {
    const internId = Number(req.params.id);
    const internData = await InternService.getInternById(internId);
        
    res.status(StatusCodes.OK).json(internData).end();
};

export const getFilteredInternsList = async (req: Request, res: Response) => {
    const filteringParams = req.query;
    const result = await InternService.getFilteredInternsList(filteringParams);

    res.status(StatusCodes.OK).json(result).end();
};

export const deleteInternById = async (req: Request, res: Response) => {
    const internId = Number(req.params.id);

    await InternService.deleteInternById(internId);

    res.status(StatusCodes.OK).send('Intern deleted successfully!').end();
};