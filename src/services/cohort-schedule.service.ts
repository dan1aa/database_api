import { CohortSchedule, Prisma } from '@prisma/client';

import { db } from '@utils/db.server';

export const createCohortSchedules = async (data: CohortSchedule[]) => {

    data.forEach(cohortSchedule => {
        if (cohortSchedule.eventDate) cohortSchedule.eventDate = new Date(cohortSchedule.eventDate);
    })

    await db.cohortSchedule.createMany({ data });

    return { message: "Cohort schedules created successfully!" }
};

export const getCohortScheduleById = async (id: number): Promise<CohortSchedule | null> => {
    const cohortSchedule: CohortSchedule | null = await db.cohortSchedule.findUnique({ where: { id } });

    return cohortSchedule;
};

export const updateCohortScheduleById = async (id: number, data: CohortSchedule): Promise<CohortSchedule> => {
    if (data.eventDate && typeof data.eventDate === 'string') data.eventDate = new Date(data.eventDate)
    const updatedCohortSchedule: CohortSchedule = await db.cohortSchedule.update({ where: { id }, data: data });

    return updatedCohortSchedule;
};

export const deleteCohortScheduleById = async (id: number): Promise<CohortSchedule> => {
    const deletedCohortSchedule: CohortSchedule = await db.cohortSchedule.delete({ where: { id } })

    return deletedCohortSchedule;
};

export const getCohortScheduleList = async (): Promise<CohortSchedule[] | null> => {
    const cohortSchedulesList: CohortSchedule[] | null = await db.cohortSchedule.findMany();

    return cohortSchedulesList;
};