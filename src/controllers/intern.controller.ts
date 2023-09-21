import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';

import * as InternService from '@services/intern.service';
import { intern } from '@prisma/client';


export const getInternById = async (req: Request, res: Response) => {
    const internId = Number(req.params.id);
    const result = await InternService.getInternById(internId);
        
    res.status(StatusCodes.OK).json(result);
};

export const filterInterns = async (req: Request, res: Response) => {
    const filteringParams = req.query;
    const result = await InternService.filterInterns(filteringParams);

    res.status(StatusCodes.OK).json(result);
};