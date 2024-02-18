import { Course, CourseResult, Intern } from '@prisma/client';
import { db } from '@utils/db.server';
import { SheetCourseResult } from 'types/types';

export const createCourseResults = async (courseResults: SheetCourseResult[]) => {
    let invalidCourseResults: string[] = [];

    const promises = courseResults.map(async (courseResult: SheetCourseResult) => {
        const { courseId, internId, ...rest } = courseResult;

        const course: Course | null = await db.course.findUnique({ where: { courseCipher: courseId } });
        const intern: Intern | null = await db.intern.findUnique({ where: { explorerId: internId } });

        if (course && intern) {
            const courseSQLId: number = course.id;
            const internSQLId: number = intern.id;

            await db.courseResult.upsert({
                where: {
                    internId_courseId: {
                        internId: internSQLId,
                        courseId: courseSQLId
                    }
                },
                create: { internId: internSQLId, courseId: courseSQLId, ...rest },
                update: { internId: internSQLId, courseId: courseSQLId, ...rest}
            });
        } else {
            invalidCourseResults.push(`(courseId: ${courseId}, internId: ${internId})`);
        }
    });

    await Promise.all(promises);

    const courseResultsNotAdded: string = invalidCourseResults.length ? `Course results with these ids were not added: ${invalidCourseResults.join(',')}` : 'All good';

    return { message: "Course Results created and updated successfully!", courseResultsNotAdded };
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