import { Prisma } from '@prisma/client';

import { db } from '@utils/db.server';
import { NotFoundError } from '@exeptions/ApiErrors';


interface FilteringParams {
    cohort?: string,
    course_id?: string
};

export const createIntern = async (data: Prisma.internCreateInput) => {
    //TODO: handle erro when insert data with duplicated unique values
    const result = await db.intern.create({ data });

    return result;
}

export const updateInternById = async (id: number, data: Prisma.internUpdateInput) => {
    const isInternExist = await db.intern.findUnique({ where: { id } });

    if (!isInternExist) throw new NotFoundError('Intern with this id doesn`t exist');

    const result = await db.intern.update({
        where: { id },
        data: data
    });

    return result;
};

export const getInternById = async (id: number) => {
    const result = await db.intern.findUnique({
        where: { id },
    });

    if (!result) throw new NotFoundError();

    return result;
};

export const getFilteredInternsList = async (filteringParams: FilteringParams) => {
    const result = await db.intern.findMany({
        where: {
            cohort: filteringParams.cohort,
            course_intern: {
                some: {
                    course: {
                        course_name: filteringParams.course_id,
                    },
                },
            },
        },
    });

    return result;
};

export const deleteInternById = async (id: number) => {
    const result = await db.intern.delete({
        where: { id }
    });

    return result;
}

