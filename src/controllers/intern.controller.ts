import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import * as InternService from '@services/intern.service';
import { Intern } from '@prisma/client';
import { NotFoundError } from '@utils/exeptions/ApiErrors';


export const createInterns = async (req: Request, res: Response) => {
    const { data } = req.body;

    const createdInterns = await InternService.createInterns(data);

    res.status(StatusCodes.CREATED).json(createdInterns).end();
};

export const updateInternById = async (req: Request, res: Response) => {
    const internId = Number(req.params.id);
    const internData = req.body;

    const updatedIntern: Intern = await InternService.updateInternById(internId, internData);

    res.status(StatusCodes.OK).json(updatedIntern).end();
};

export const getInternById = async (req: Request, res: Response) => {
    const internId = Number(req.params.id);

    const intern: Intern | null = await InternService.getInternById(internId);

    res.status(StatusCodes.OK).json(intern).end();
};

export const getFilteredInternsList = async (req: Request, res: Response) => {
    const filteringParams = req.query;
    const internsList: Intern[] | null = await InternService.getInternsList(filteringParams);

    res.status(StatusCodes.OK).json(internsList).end();
};

export const deleteInternById = async (req: Request, res: Response) => {
    const internId = Number(req.params.id);

    const deletedIntern: Intern = await InternService.deleteInternById(internId);

    res.status(StatusCodes.OK).send(deletedIntern).end();
};

export const getCohortScheduleByExplorerId = async (req: Request, res: Response) => {
    const explorerId = req.params.explorerId;

    const cohortSchedule = await InternService.getCohortScheduleByExplorerId(explorerId);

    res.status(StatusCodes.OK).json(cohortSchedule).end();
};

export const getInternBadgesListByCourseId = async (req: Request, res: Response) => {
    const internId = Number(req.params.internId);
    const courseId = Number(req.params.internId);

    const cohortSchedule = await InternService.getInternBadgesListByCourseId(internId, courseId);

    res.status(StatusCodes.OK).json(cohortSchedule).end();
};