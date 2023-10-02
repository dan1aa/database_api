import { Course, EventFeedback, FacilitatorFeedback, Intern, InternCourse, ClassEvent, OversightFeedback } from '@prisma/client';

import { db } from '@utils/db.server';

type UpsertFunctions = {
    [key: string]: (dataToInsert: any) => Promise<any>;
};


const insertRequestedData = async (tableName: string, dataToInsert: any[]): Promise<any> => {
    const upsertFunctions: UpsertFunctions = {
        'intern': updateInterns,
        'course': updateCourses,
        'internCourse': updateInternCourse
    }

    const result = await upsertFunctions[tableName](dataToInsert);

    return result;
};

async function updateInterns(dataToInsert: any[]): Promise<any> {


    for (const intern of dataToInsert) {
        await db.intern.upsert({
            where: {
                explorerId: intern.explorerId
            },
            update: intern,
            create: intern,
        })
    }

    const allInterns: Intern[] = await db.intern.findMany({
        select: {
            id: true,
            explorerId: true,
            explorerMail: true,
            explorerPassword: true,
            discordId: true,
            cohort: true,
            discordNickname: true,
            contactId: true
        },
    });

    return allInterns;
}


async function updateCourses(dataToInsert: any): Promise<any> {

    for (const course of dataToInsert) {
        course.startDate = new Date(course.startDate)
        course.endDate = new Date(course.endDate)

        await db.course.upsert({
            where: {
                courseCipher: course.courseCipher
            },
            update: {
                startDate: course.startDate,
                endDate: course.endDate,
                courseName: course.courseName,
                courseCipher: course.courseCipher,
                linkToClassMaterials: course.linkToClassMaterials
            },
            create: {
                startDate: course.startDate,
                endDate: course.endDate,
                courseName: course.courseName,
                courseCipher: course.courseCipher,
                linkToClassMaterials: course.linkToClassMaterials
            },
        })
    }

    const allCourses: Course[] = await db.course.findMany();

    return allCourses;
}

async function updateInternCourse(dataToInsert: any): Promise<any> {
    for (const internCourse of dataToInsert) {

        await db.internCourse.upsert({
            where: {
                internId_courseId: {
                    internId: internCourse.internId,
                    courseId: internCourse.courseId,
                },
            },
            update: internCourse,
            create: internCourse
        })
    }

    const intern_courses: InternCourse[] = await db.internCourse.findMany();

    return intern_courses;
}

export default insertRequestedData;