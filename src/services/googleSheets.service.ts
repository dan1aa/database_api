import { Response } from 'express';
import { db } from '@utils/db.server';
import { course, intern } from '@prisma/client';

type tableTypes = intern[] | course[];

type UpsertFunctions = {
    [key: string]: (dataToInsert: any[]) => Promise<tableTypes>;
};

function removeDuplicates(data: any[]) {
    const uniqueObjects: any[] = [];
    const uniqueIds = new Set();

    for (const obj of data) {
        if (!uniqueIds.has(obj.id)) {
            uniqueIds.add(obj.id);
            uniqueObjects.push(obj);
        }
    }

    return uniqueObjects
}


async function updateInterns(dataToInsert: intern[]): Promise<intern[]> {

    const insertedInterns: intern[] = []

    for (const intern of dataToInsert) {
        await db.intern.upsert({
            where: {
                explorer_id: intern.explorer_id
            },
            update: intern,
            create: intern,
        }).then((currIntern: intern) => {
            insertedInterns.push(currIntern)
        })

    }


    let uniqueInters = removeDuplicates(insertedInterns)

    return uniqueInters
}


async function updateCourses(dataToInsert: course[]): Promise<course[]> {

    const insertedCourses: course[] = []

    for (const course of dataToInsert) {
        course.start_date = new Date(course.start_date)
        course.end_date = new Date(course.end_date)

        await db.course.upsert({
            where: {
                course_name: course.course_name
            },
            update: course,
            create: course,
        }).then((currCourse: course) => {
            insertedCourses.push(currCourse)
        })
    }

    let unqiueCourses = removeDuplicates(insertedCourses)

    return unqiueCourses

}

export const insertData = async (tableName: string, dataToInsert: any[], res: Response) => {
    const upsertFunctions: UpsertFunctions = {
        'intern': updateInterns,
        'course': updateCourses
    }

    const result: tableTypes = await upsertFunctions[tableName](dataToInsert)

    res.end(JSON.stringify(result));
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
        default:
            throw new Error(`Unknown table name: ${tableName}`);
    }
}

const deleteRowsFromInternTable = async (dataToDelete: any[]) => {
    const targetExplorerIds = dataToDelete.map(data => data.explorerId);
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
    const targetCoursesIds = dataToDelete.map(data => data.courseId);
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