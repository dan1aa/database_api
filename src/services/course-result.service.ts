import { CourseResult } from '@prisma/client';
import { db } from '@utils/db.server';
import { NotFoundError } from '@utils/exeptions/ApiErrors';
import { CourseResultCreateInput, CourseResultType, CourseResultUpdateInput } from 'types/types';

export const createCourseResults = async (data: CourseResultCreateInput[] | any) => {
    const createdCourseResults = await db.courseResult.createMany({ data });

    return createdCourseResults;
};

export const updateCourseResultById = async (id: number, data: CourseResultUpdateInput): Promise<CourseResultType> => {
    const updatedCourseResults: CourseResultType = await db.courseResult.update({ where: { id }, data: data });

    return updatedCourseResults;
};

export const getCourseResultById = async (id: number): Promise<CourseResultType> => {
    const courseResult: CourseResultType = await db.courseResult.findUnique({ where: { id } });
    
    if (!courseResult) {
        throw new NotFoundError(`Course-result with id ${id} doesn't exist`);
    } 

    return courseResult;
};

export const deleteCourseResultById = async (id: number): Promise<CourseResultType> => {
    const deletedCourseResult: CourseResultType = await db.courseResult.delete({ where: { id } });

    return deletedCourseResult;
};

export const getListOfCourseResults = async (): Promise<CourseResult[] | null> => {
    const courseResultsList: CourseResult[] | null = await db.courseResult.findMany();

    return courseResultsList;
};