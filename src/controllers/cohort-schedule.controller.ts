import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import * as CohortScheduleService from '@services/cohort-schedule.service';
import { CohortSchedule } from '@prisma/client';

export const createCohorSchedules = async (req: Request, res: Response) => {
    const { data } = req.body;

    const createdCohortSchedule = await CohortScheduleService.createCohortSchedules(data);

    res.status(StatusCodes.CREATED).json(createdCohortSchedule).end();
};

export const getCohortScheduleById = async (req: Request, res: Response) => {
    const cohortScheduleId = Number(req.params.id);

    const CohortSchedule: CohortSchedule | null = await CohortScheduleService.getCohortScheduleById(cohortScheduleId);

    res.status(StatusCodes.OK).json(CohortSchedule).end();
};

export const updateCohortScheduleById = async (req: Request, res: Response) => {
    const cohortScheduleData = req.body;
    const cohortScheduleId = Number(req.params.id);
    
    const updatedCohortScheduleData: CohortSchedule = await CohortScheduleService.updateCohortScheduleById(cohortScheduleId, cohortScheduleData);

    res.status(StatusCodes.OK).json(updatedCohortScheduleData).end();
};

export const deleteCohortScheduleById = async (req: Request, res: Response) => {
    const cohortScheduleId = Number(req.params.id);

    const deletedCohortScheduleData: CohortSchedule = await CohortScheduleService.deleteCohortScheduleById(cohortScheduleId);

    res.status(StatusCodes.OK).json(deletedCohortScheduleData).end();
};

export const getCohortScheduleList = async (req: Request, res: Response) => {
    const cohortSheduleList: CohortSchedule[] | null = await CohortScheduleService.getCohortScheduleList();

    res.status(StatusCodes.OK).json(cohortSheduleList).end();
};