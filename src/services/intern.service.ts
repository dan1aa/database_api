import { Prisma, intern } from '@prisma/client';

import { db } from '@utils/db.server';
import { BadRequestError, NotFoundError } from '@utils/exeptions/ApiErrors';


interface FilteringParams {
    cohort?: string,
    course_id?: string
};

export const createIntern = async (data: Prisma.internCreateInput) => {
    try {
        const result = await db.intern.create({ data });
        return result;
      } catch (error) {
        console.error('Error in createIntern:', error);
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2011') {
          throw new BadRequestError('Unique constraint violation');
        }
        throw error;
      }
}

export const updateInternById = async (id: number, data: Prisma.internUpdateInput) => {
    const isInternExist: intern | null = await db.intern.findUnique({ where: { id } });

    if (!isInternExist) throw new NotFoundError('Intern with this id doesn`t exist');

    const result: intern = await db.intern.update({
        where: { id },
        data: data
    });

    return result;
};

export const getInternById = async (id: number) => {
    const result = await db.intern.findUnique({
        where: { id },
    });

    if (!result) throw new NotFoundError(`There is no intern with id ${id}`);

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

