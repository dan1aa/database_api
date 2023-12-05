import { Intern, Prisma } from '@prisma/client';

import { db } from '@utils/db.server';
import { NotFoundError } from '@utils/exeptions/ApiErrors';
import { FilteringParams, InternType } from 'types/types';


export const createInterns = async (interns: Prisma.InternCreateInput[]) => {
    const createdInterns = await db.intern.createMany({ data: interns});

    return createdInterns;
};


export const getInternById = async (id: number): Promise<InternType> => {
    const intern: InternType = await db.intern.findUnique({ where: { id } });
    
    if (!intern) {
        throw new NotFoundError(`Intern with id ${id} doesn't exist`);
    }

    return intern;
};

export const deleteInternById = async (id: number): Promise<InternType> => {
    const deletedIntern: InternType = await db.intern.delete({ where: { id } });

    return deletedIntern;
};

export const updateInternById = async (id: number, intern: Prisma.InternUpdateInput): Promise<InternType> => {    
    const updatedIntern: InternType = await db.intern.update({ where: { id }, data: intern });

    return updatedIntern;
};

export const getInternsList = async (filteringParams: FilteringParams): Promise<Intern[] | null> => {
    const internsList: Intern[] | null = await db.intern.findMany({
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

    return internsList;
};

export const getCohortScheduleByExplorerId = async (explorerId: string) => {
    const targetIntern: InternType = await db.intern.findUnique({ where: { explorerId }});

    if (!targetIntern) {
        throw new NotFoundError(`Intern with exporerId ${explorerId} doesn't exist`);
    }

    const cohortSchedule = db.cohortSchedule.findMany({
        where: {
            cohort: targetIntern.cohort!,
        }, 
        orderBy: {
            eventDate: { sort: 'asc', nulls: 'last' },
        }
    });

    return cohortSchedule;
};