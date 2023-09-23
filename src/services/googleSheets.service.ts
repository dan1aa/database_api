import { Response } from 'express';
import { db } from '@utils/db.server';
import { course, intern, intern_course } from '@prisma/client';
import axios from 'axios'

type tableTypes = intern[] | course[] | intern_course[];
type parametrizedDbData = (string | number | Date | null)[];
type UpsertFunctions = {
    [key: string]: (dataToInsert: tableTypes) => Promise<parametrizedDbData[]>;
};

const SHEET_URL: string = 'https://script.google.com/a/macros/nobelcoaching.com/s/AKfycbyxUL53XK8RyTWv-frx6QxaoxJOzP7RaRtOd8T_n1ZyWPnnDzYCcG9vJAl2svpVwFnVxQ/exec?'

function buildSheetUlr(tableName: string, result: string): string {
    return `${SHEET_URL}table=${tableName}&object=${result}`
}

function convertReceivedDataToQueryParameters (dataFromDb: tableTypes) {
    return dataFromDb.map(row => [...Object.values(row)])
}

async function updateInterns(dataToInsert: (intern[] | any[])): Promise<parametrizedDbData[]> {

    for (const intern of dataToInsert) {
        await db.intern.upsert({
            where: {
                explorer_id: intern.explorer_id
            },
            update: intern,
            create: intern,
        })
    }

    const allInterns: intern[] = await db.intern.findMany()

    let parameterInterns: parametrizedDbData[] = convertReceivedDataToQueryParameters(allInterns)
    return parameterInterns
}


async function updateCourses(dataToInsert: course[] | any[]): Promise<parametrizedDbData[]> {

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

    let allCourses: course[] = await db.course.findMany()

    let parameterCourses: parametrizedDbData[] = convertReceivedDataToQueryParameters(allCourses)
    return parameterCourses

}

async function updateInternCourse(dataToInsert: intern_course[] | any[]): Promise<parametrizedDbData[]> {
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

    let intern_courses: intern_course[] = await db.intern_course.findMany()

    let parameterInternCourses: parametrizedDbData[] = convertReceivedDataToQueryParameters(intern_courses)
    return parameterInternCourses
}

export const insertData = async (tableName: string, dataToInsert: tableTypes | any[], res: Response) => {
    const upsertFunctions: UpsertFunctions = {
        'intern': updateInterns,
        'course': updateCourses,
        'intern_course': updateInternCourse
    }

    const result: parametrizedDbData[] = await upsertFunctions[tableName](dataToInsert)
    const url: string = buildSheetUlr(tableName, JSON.stringify(result))

    axios.get(url)
    .then(() => {
        res.end("Updated mysql and updated sheets")
    })

};

export const deleteData = async (tableName: string, dataToDelete: Array<Object>, res: Response) => {
    switch (tableName) {
        case 'intern':
            await deleteRowsFromInternTable(dataToDelete);
            break;
        case 'course':
            await deleteRowsFromCourseTable(dataToDelete);
            break;
        case 'nobel_event':
            await deleteRowsFromNobelEventTable(dataToDelete);
            break;
        case 'intern_course':
            console.log('Delete for interns here, I had to add something because switch causes error')
            break;
        default:
            throw new Error(`Unknown table name: ${tableName}`);
    }
}

const deleteRowsFromInternTable = async (dataToDelete: any[]) => {
    const targetExplorerIds = dataToDelete.map(data => data.explorer_id);
    const deleteResult = await db.intern.deleteMany({
        where: {
            explorer_id: {
                in: targetExplorerIds,
            },
        },
    });

    return deleteResult;
};

const deleteRowsFromCourseTable = async (dataToDelete: any[]) => {
    const targetCoursesIds = dataToDelete.map(data => data.course_name);
  
    const deleteResult = await db.course.deleteMany({
        where: {
            course_name: {
                in: targetCoursesIds,
            },
        },
    });

    return deleteResult;
};

const deleteRowsFromNobelEventTable = async (dataToDelete: any[]) => {
    const conditionsForDeleteQuery = dataToDelete
        .map(item => ({ courseId: item.courseId, meetNumber: item.meetNumber }))
        .map(item => `(course_id = ${item.courseId} AND meet_num = ${item.meetNumber})`)
        .join(' OR ');

    const deleteQuery = `
        DELETE FROM nobel_event
        WHERE course_id IN (
            SELECT id
            FROM course
            WHERE ${conditionsForDeleteQuery}
        );
    `;

    await db.$executeRawUnsafe(deleteQuery);
};
