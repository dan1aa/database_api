import { course, event_feedback, facilitator_feedback, intern, intern_course, nobel_event, oversight_feedback } from '@prisma/client';

import { db } from '@utils/db.server';


type tableTypes = intern[] | course[] | intern_course[] | nobel_event[] | oversight_feedback[] | facilitator_feedback[] | event_feedback[];

type UpsertFunctions = {
    [key: string]: (dataToInsert: tableTypes) => Promise<intern[] | course[] | intern_course[]>;
};


const insertRequestedData = async (tableName: string, dataToInsert: tableTypes | any[]): Promise<tableTypes> => {
    const upsertFunctions: UpsertFunctions = {
        'intern': updateInterns,
        'course': updateCourses,
        'intern_course': updateInternCourse
    }
    
    const result = await upsertFunctions[tableName](dataToInsert);

    return result;
};

async function updateInterns(dataToInsert: (intern[] | any[])): Promise<intern[]> {

    const internsEmails: string[] = []

    for (const intern of dataToInsert) {
        if (internsEmails.includes(intern.email)) {
            console.log('Duplicated email for ', intern.explorer_id)
            continue;
        }

        else {
            internsEmails.push(intern.email)
            await db.intern.upsert({
                where: {
                    explorer_id: intern.explorer_id
                },
                update: intern,
                create: intern,
            })
        }
    }

    const allInterns: any[] = await db.intern.findMany({
        select: {
            id: true,   
            explorer_id: true,  
            discord_id: true,  
            first_name: true,
            last_name: true,
            email: true,
            cohort: true
          },
    });

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

export default insertRequestedData;


const intern_course = {
    "id": 2,
    "first_name": "John",
    "last_name": "Snow",
    "email": "john.snow@email.com",
    "cohort": "SEP 16 WE 23",
    "explorer_id": "explorerE8Jr5",
    "discord_id": "605636683f6e29c81c8b2db0",
    "course_name": "adf",
    "start_date": "adf",
    "end_date": "dasd",
    "role": "facilitator"
}