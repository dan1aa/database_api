import { Prisma } from '@prisma/client';

import { db } from '@utils/db.server';
import { BadRequestError, NotFoundError } from '@utils/exeptions/ApiErrors';

export const createCohortSchedule = async (cohortSchedule: Prisma.CohortScheduleCreateInput) => {
    try {
        cohortSchedule.eventDate = new Date(cohortSchedule.eventDate);
        const result = await db.cohortSchedule.create({ data: cohortSchedule });
        return result;
    } catch(error) {
        throw error;
    }
};

export const getCohortScheduleById = async (id: number) => {
    const result = await db.cohortSchedule.findUnique({ where: { id } });

    if (!result) {
        throw new NotFoundError(`Cohort schedule with id ${id} dosen't exist`);
    }

    return result;
};

export const updateCohortScheduleById = async (id: number, data: Prisma.CohortScheduleUpdateInput) => {
    try {
        const result = await db.cohortSchedule.update({ where: { id }, data: data });
        return result;
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                throw new BadRequestError(`Cohort schedule with id ${id} dosen't exist`);
            }
        }
        throw error;
    }
};

export const deleteCohortScheduleById = async (id: number) => {
    try {
        const result = await db.cohortSchedule.delete({ where: { id } })
        return result;
    } catch(error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                throw new NotFoundError(`Cohort schedule with id ${id} doesn't exist`);
            }
        }
        throw error;
    }
};

export const getCohortScheduleList = async () => {
    const result = await db.cohortSchedule.findMany();
    return result;
};