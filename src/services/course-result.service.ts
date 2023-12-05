import { CourseResult } from '@prisma/client';
import { db } from '@utils/db.server';
import { NotFoundError } from '@utils/exeptions/ApiErrors';
import { CourseResultCreateInput, CourseResultUpdateInput } from 'types/types';

export const createCourseResults = async (data: CourseResultCreateInput[]) => {
    const createdCourseResults = await db.courseResult.createMany({ data });

    return createdCourseResults;
};

export const updateCourseResultById = async (id: number, data: CourseResultUpdateInput): Promise<CourseResult | null> => {
    const updatedCourseResults: CourseResult | null = await db.courseResult.update({ where: { id }, data: data });

    return updatedCourseResults;
};

export const getCourseResultById = async (id: number): Promise<CourseResult | null> => {
    const courseResult: CourseResult | null = await db.courseResult.findUnique({ where: { id } });
    
    if (!courseResult) {
        throw new NotFoundError(`Course-result with id ${id} doesn't exist`);
    } 

    return courseResult;
};

export const deleteCourseResultById = async (id: number): Promise<CourseResult | null> => {
    const deletedCourseResult: CourseResult | null = await db.courseResult.delete({ where: { id } });

    return deletedCourseResult;
};

export const getListOfCourseResults = async (): Promise<CourseResult[] | null> => {
    const courseResultsList: CourseResult[] | null = await db.courseResult.findMany();

    return courseResultsList;
};