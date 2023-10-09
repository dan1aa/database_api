import { Prisma } from '@prisma/client';

import { db } from '@utils/db.server';
import { BadRequestError, NotFoundError } from '@utils/exeptions/ApiErrors';

interface CourseResultCreateInput {
    internCourseId: number;
    masteryResult: string;
    englishLevel: string;
};

interface CourseResultUpdateInput {
    internCourseId?: number;
    masteryResult?: string;
    englishLevel?: string;
};

export const createCourseResult = async (data: CourseResultCreateInput) => {
    try {
        const result = await db.courseResult.create({ data: data });
        return result;
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2003') {
                throw new BadRequestError(`Record in table Intern-Course with id ${data.internCourseId} dosen't exist`);
            }
        }
        throw error;
    }
};

export const updateCourseResultById = async (id: number, data: CourseResultUpdateInput) => {
    try {
        const result = await db.courseResult.update({ where: { id }, data: data });
        return result;
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                throw new NotFoundError(`Course-result with id ${id} dosen't exist`);
            }
            if(error.code === 'P2003') {
                throw new BadRequestError(`Record in table Intern-Course with id ${data.internCourseId} dosen't exist`);
            }
        }
        throw error;
    }
};

export const getCourseResultById = async (id: number) => {
    const result = await db.courseResult.findUnique({ where: { id } });
    
    if (!result) throw new NotFoundError(`Course-result with id ${id} dosen't exist`);

    return result;
};

export const deleteCourseResultById = async (id: number) => {
    try {
        const result = await db.courseResult.delete({ where: { id } });
        return result;
    } catch(error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                throw new NotFoundError(`Course-result with id ${id} dosen't exist`);
            }
        }
        throw error;
    }
};

export const getListOfCourseResults = async () => {
    const result = await db.courseResult.findMany();
    return result;
};