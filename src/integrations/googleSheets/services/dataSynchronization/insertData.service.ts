import { Course, EventFeedback, FacilitatorFeedback, Intern, InternCourse, ClassEvent, OversightFeedback } from '@prisma/client';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';

import { db } from '@utils/db.server';

type UpsertFunctions = {
    [key: string]: (dataToInsert: any) => Promise<any>;
};


const insertRequestedData = async (tableName: string, dataToInsert: any[]): Promise<any> => {
    const upsertFunctions: UpsertFunctions = {
        'intern': updateInterns,
        'course': updateCourses,
        'internCourse': updateInternCourse,
        'classEvent': updateClassEvent
    }

    const result = await upsertFunctions[tableName](dataToInsert);

    return result;
};

async function updateInterns(interns: Intern[]): Promise<any> {

    for (const intern of interns) {
        try {
            await db.intern.upsert({
                where: {
                    explorerId: intern.explorerId
                },
                update: intern,
                create: intern,
            })
        } catch(error) {
            continue;
        }
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


async function updateCourses(courses: Course[]): Promise<any> {

    for (const course of courses) {

        const { startDate, endDate, courseCipher } = course;

        course.startDate = new Date(startDate)
        course.endDate = new Date(endDate)

        try {
            await db.course.upsert({
                where: {
                    courseCipher
                },
                update: course,
                create: course
            })
        } catch(error) {
            continue;
        }
    }

    const allCourses: Course[] = await db.course.findMany();

    return allCourses;
}

async function updateInternCourse(internCourses: InternCourse[]): Promise<any> {
    for (const internCourse of internCourses) {

        const { internId, courseId } = internCourse;

        try {
            await db.internCourse.upsert({
                where: {
                    internId_courseId: {
                        internId,
                        courseId,
                    },
                },
                update: internCourse,
                create: internCourse
            })
        } catch (error) {
            continue;
        }
    }

    const allInternCourses: InternCourse[] = await db.internCourse.findMany();

    return allInternCourses;
}

async function updateClassEvent(classEvents: ClassEvent[]) {
    for (const classEvent of classEvents) {

        const { eventDate, courseId, meetNumber, classEventTypeId } = classEvent;

        classEvent.eventDate = new Date(eventDate)

        try {
            await db.classEvent.upsert({
                where: {
                    courseId_meetNumber_classEventTypeId: {
                        courseId,
                        meetNumber,
                        classEventTypeId
                    }
                },
                update: classEvent,
                create: classEvent
            })
        } catch(error) {
            continue;
        }
    }

    const allClassEvents: ClassEvent[] = await db.classEvent.findMany();

    return allClassEvents;
}

export default insertRequestedData;
