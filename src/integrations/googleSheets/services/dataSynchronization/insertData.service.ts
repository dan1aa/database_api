import { course, intern, intern_course } from '@prisma/client';

import { db } from '@utils/db.server';


type tableTypes = intern[] | course[] | intern_course[];
type parametrizedDbData = (string | number | Date | null)[];
type UpsertFunctions = {
    [key: string]: (dataToInsert: tableTypes) => Promise<intern[] | course[] | intern_course[]>;
};

const insertRequstedData = async (tableName: string, dataToInsert: tableTypes | any[]) => {
    const upsertFunctions: UpsertFunctions = {
        'intern': updateInterns,
        'course': updateCourses,
        'intern_course': updateInternCourse
    }
    
    const result = await upsertFunctions[tableName](dataToInsert);

    return result;
};

async function updateInterns(dataToInsert: (intern[] | any[])): Promise<intern[]> {

    for (const intern of dataToInsert) {
        await db.intern.upsert({
            where: {
                explorer_id: intern.explorer_id
            },
            update: intern,
            create: intern,
        })
    }

    const allInterns: intern[] = await db.intern.findMany();

    return allInterns;
}


async function updateCourses(dataToInsert: course[] | any[]): Promise<course[]> {

    for (const course of dataToInsert) {
        course.start_date = new Date(course.start_date)
        course.end_date = new Date(course.end_date)

        await db.course.upsert({
            where: {
                course_name: course.course_name
            },
            update: course,
            create: course,
        })
    }

    const allCourses: course[] = await db.course.findMany();

    return allCourses;
}

async function updateInternCourse(dataToInsert: intern_course[] | any[]): Promise<intern_course[]> {
    for (const intern_course of dataToInsert) {

        await db.intern_course.upsert({
            where: {
                intern_id_course_id: {
                    intern_id: intern_course.intern_id,
                    course_id: intern_course.course_id,
                },
            },
            update: intern_course,
            create: intern_course
        })
    }

    const intern_courses: intern_course[] = await db.intern_course.findMany();

    return intern_courses;
}

export default insertRequstedData;

