import { db } from '@utils/db.server';
import { NotFoundError } from '@utils/exeptions/ApiErrors';
import { CourseResultCreateInput, CourseResultUpdateInput } from 'types/types';

export const createCourseResult = async (data: CourseResultCreateInput) => {
    const result = await db.courseResult.create({ data: data });
    return result;
};

export const updateCourseResultById = async (id: number, data: CourseResultUpdateInput) => {
    const result = await db.courseResult.update({ where: { id }, data: data });
    return result;
};

export const getCourseResultById = async (id: number) => {
    const result = await db.courseResult.findUnique({ where: { id } });
    
    if (!result) {
        throw new NotFoundError(`Course-result with id ${id} dosen't exist`);
    } 

    return result;
};

export const deleteCourseResultById = async (id: number) => {
    const result = await db.courseResult.delete({ where: { id } });
    return result;
};

export const getListOfCourseResults = async () => {
    const result = await db.courseResult.findMany();
    return result;
};