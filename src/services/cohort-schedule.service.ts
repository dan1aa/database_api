import { CohortSchedule, Prisma } from '@prisma/client';

import { db } from '@utils/db.server';
import { NotFoundError } from '@utils/exeptions/ApiErrors';
import { CohortScheduleType } from 'types/types';

export const createCohortSchedules = async (data: Prisma.CohortScheduleCreateInput[]) => {

    data.forEach(cohortSchedule => {
        if (cohortSchedule.eventDate) cohortSchedule.eventDate = new Date(cohortSchedule.eventDate);
    })

    const createdCohortSchedules = await db.cohortSchedule.createMany({ data });

    return createdCohortSchedules;
};

export const getCohortScheduleById = async (id: number): Promise<CohortScheduleType> => {
    const cohortSchedule: CohortScheduleType = await db.cohortSchedule.findUnique({ where: { id } });

    if (!cohortSchedule) {
        throw new NotFoundError(`Cohort schedule with id ${id} doesn't exist`);
    }

    return cohortSchedule;
};

export const updateCohortScheduleById = async (id: number, data: Prisma.CohortScheduleUpdateInput): Promise<CohortScheduleType> => {
    if (data.eventDate && typeof data.eventDate === 'string') data.eventDate = new Date(data.eventDate)
    const updatedCohortSchedule: CohortScheduleType = await db.cohortSchedule.update({ where: { id }, data: data });

    return updatedCohortSchedule;
};

export const deleteCohortScheduleById = async (id: number): Promise<CohortScheduleType> => {
    const deletedCohortSchedule: CohortScheduleType = await db.cohortSchedule.delete({ where: { id } })

    return deletedCohortSchedule;
};

export const getCohortScheduleList = async (): Promise<CohortSchedule[] | null> => {
    const cohortSchedulesList: CohortSchedule[] | null = await db.cohortSchedule.findMany();

    return cohortSchedulesList;
};