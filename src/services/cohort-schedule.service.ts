import { Prisma } from '@prisma/client';

import { db } from '@utils/db.server';
import { NotFoundError } from '@utils/exeptions/ApiErrors';

export const createCohortSchedule = async (cohortSchedule: Prisma.CohortScheduleCreateInput) => {
    const result = await db.cohortSchedule.create({ data: cohortSchedule });

    return result;
};

export const getCohortScheduleById = async (id: number) => {
    const result = await db.cohortSchedule.findUnique({ where: { id } });

    if (!result) {
        throw new NotFoundError(`Cohort schedule with id ${id} dosen't exist`);
    }

    return result;
};

export const updateCohortScheduleById = async (id: number, data: Prisma.CohortScheduleUpdateInput) => {
    const result = await db.cohortSchedule.update({ where: { id }, data: data });
    return result;
};

export const deleteCohortScheduleById = async (id: number) => {
    const result = await db.cohortSchedule.delete({ where: { id } })
    return result;
};

export const getCohortScheduleList = async () => {
    const result = await db.cohortSchedule.findMany();
    return result;
};