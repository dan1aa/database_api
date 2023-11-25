import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import * as InternService from '@services/intern.service';


export const createInterns = async (req: Request, res: Response) => {
    const { data } = req.body;

    const result = await InternService.createInterns(data);

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
    const result = await InternService.getInternsList(filteringParams);

    res.status(StatusCodes.OK).json(result).end();
};

export const deleteInternById = async (req: Request, res: Response) => {
    const internId = Number(req.params.id);

    const deletedIntern = await InternService.deleteInternById(internId);

    res.status(StatusCodes.OK).send(deletedIntern).end();
};

export const getCohortScheduleByExplorerId = async (req: Request, res: Response) => {
    const explorerId = req.params.explorerId;

    const result = await InternService.getCohortScheduleByExplorerId(explorerId);

    res.status(StatusCodes.OK).json(result).end();
};