import { CohortSchedule, Prisma } from '@prisma/client';

import { db } from '@utils/db.server';
import { NotFoundError } from '@utils/exeptions/ApiErrors';

export const createCohortSchedules = async (data: Prisma.CohortScheduleCreateInput[]) => {
    const createdCohortSchedules = await db.cohortSchedule.createMany({ data });

    return createdCohortSchedules;
};

export const getCohortScheduleById = async (id: number): Promise<CohortSchedule | null> => {
    const cohortSchedule: CohortSchedule | null = await db.cohortSchedule.findUnique({ where: { id } });

    if (!cohortSchedule) {
        throw new NotFoundError(`Cohort schedule with id ${id} doesn't exist`);
    }

    return cohortSchedule;
};

export const updateCohortScheduleById = async (id: number, data: Prisma.CohortScheduleUpdateInput): Promise<CohortSchedule | null> => {
    const updatedCohortSchedule: CohortSchedule | null = await db.cohortSchedule.update({ where: { id }, data: data });

    return updatedCohortSchedule;
};

export const deleteCohortScheduleById = async (id: number): Promise<CohortSchedule | null> => {
    const deletedCohortSchedule: CohortSchedule | null = await db.cohortSchedule.delete({ where: { id } })

    return deletedCohortSchedule;
};

export const getCohortScheduleList = async (): Promise<CohortSchedule[] | null> => {
    const cohortSchedulesList: CohortSchedule[] | null = await db.cohortSchedule.findMany();

    return cohortSchedulesList;
};