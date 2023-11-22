import { Prisma } from '@prisma/client';

import { db } from '@utils/db.server';
import { NotFoundError } from '@utils/exeptions/ApiErrors';
import { FilteringParams } from 'types/types';


export const createInterns = async (data: Prisma.InternCreateInput[]) => {
    const result = await db.intern.createMany({ data: data});
    return result;
};



export const getInternById = async (id: number) => {
    const result = await db.intern.findUnique({ where: { id } });
    
    if (!result) {
        throw new NotFoundError(`Intern with id ${id} dosen't exist`);
    }

    return result;
};

export const deleteInternById = async (id: number) => {
    const result = await db.intern.delete({ where: { id } });
    return result;
};

export const updateInternById = async (id: number, data: Prisma.InternUpdateInput) => {    
    const result = await db.intern.update({ where: { id }, data: data });
    return result;
};

export const getInternsList = async (filteringParams: FilteringParams) => {
    const result = await db.intern.findMany({
        where: {
            cohort: filteringParams.cohort,
            internCourse: {
                some: {
                    course: {
                        courseCipher: filteringParams.courseCipher,
                    },
                },
            },
        },
    });

    return result;
};

export const getCohortScheduleByExplorerId = async (explorerId: string) => {
    const targetIntern = await db.intern.findUnique({ where: { explorerId }});

    if (!targetIntern) {
        throw new NotFoundError(`Intern with exporerId ${explorerId} dosen't exist`);
    }

    const schedule = db.cohortSchedule.findMany({
        where: {
            cohort: targetIntern.cohort!,
        }, 
        orderBy: {
            eventDate: { sort: 'asc', nulls: 'last' },
        }
    });

    return schedule;
};