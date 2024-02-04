import { CourseResult } from '@prisma/client';
import { db } from '@utils/db.server';

export const createCourseResults = async (courseResults: CourseResult[] | any) => {

    for (const courseResult of courseResults) {
        await db.courseResult.upsert({
            where: {
                internId_courseId: {
                    internId: courseResult.internId,
                    courseId: courseResult.courseId
                }
            },
            create: courseResult,
            update: courseResult
        })
    }

    return { message: "Course Results created and updated successfully!" };
};

export const updateCourseResultById = async (id: number, data: CourseResult): Promise<CourseResult> => {
        const updatedCourseResults: CourseResult = await db.courseResult.update({ where: { id }, data: data });

        return updatedCourseResults;
};

export const getCourseResultById = async (id: number): Promise<CourseResult | null> => {
    const courseResult: CourseResult | null = await db.courseResult.findUnique({ where: { id } });
    
    return courseResult;
};

export const deleteCourseResultById = async (id: number): Promise<CourseResult> => {
        const deletedCourseResult: CourseResult = await db.courseResult.delete({ where: { id } });

        return deletedCourseResult;
};

export const getListOfCourseResults = async (): Promise<CourseResult[]> => {
    const courseResultsList: CourseResult[] = await db.courseResult.findMany();

    return courseResultsList;
};