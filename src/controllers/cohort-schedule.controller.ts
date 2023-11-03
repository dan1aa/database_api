import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import * as CohortScheduleService from '@services/cohort-schedule.service';

export const createCohorSchedule = async (req: Request, res: Response) => {
    const cohortScheduleData = req.body;

    const createdCohortSchedule = await CohortScheduleService.createCohortSchedule(cohortScheduleData);

    res.status(StatusCodes.CREATED).json(createdCohortSchedule).end();
};

export const getCohortScheduleById = async (req: Request, res: Response) => {
    const cohortScheduleId = Number(req.params.id);

    const cohortScheduleData = await CohortScheduleService.getCohortScheduleById(cohortScheduleId);

    res.status(StatusCodes.OK).json(cohortScheduleData).end();
};

export const updateCohortScheduleById = async (req: Request, res: Response) => {
    const cohortScheduleData = req.body;
    const cohortScheduleId = Number(req.params.id);
    
    const updatedCohortScheduleData = await CohortScheduleService.updateCohortScheduleById(cohortScheduleId, cohortScheduleData);

    res.status(StatusCodes.OK).json(updatedCohortScheduleData).end();
};

export const deleteCohortScheduleById = async (req: Request, res: Response) => {
    const cohortScheduleId = Number(req.params.id);

    const deletedCohortScheduleData = await CohortScheduleService.deleteCohortScheduleById(cohortScheduleId);

    res.status(StatusCodes.OK).json(deletedCohortScheduleData).end();
};

export const getCohortScheduleList = async (req: Request, res: Response) => {
    const cohortSheduleList = await CohortScheduleService.getCohortScheduleList();

    res.status(StatusCodes.OK).json(cohortSheduleList).end();
};