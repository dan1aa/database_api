import { Response } from 'express';
import { db } from '@utils/db.server';
import { insertQueries } from '@queries/insert.query'
import { formatRequestDataForCourseAndIntern } from '@utils/formatRequestData';

export const insertData = async (tableName: string, dataToInsert: any[], res: Response) => {

    if (tableName == 'intern' || tableName == 'course') {
        const values = formatRequestDataForCourseAndIntern(dataToInsert)
        const result = await db.$queryRawUnsafe(`${insertQueries[tableName].insert} ${values} ${insertQueries[tableName].onUpdate}`);
    }
}

export const insertRowsIntoOversightFeedbackTable = () => {
    const data = [
        {
            eventId: 1,
            oversight_id: "Explorer1ID",
            facilitator_id: "Explorer2ID",
            feedback: "some feedback text"
        },
        {
            eventId: 1,
            oversight_id: "Explorer2ID",
            facilitator_id: "Explorer1ID",
            feedback: "some feedback text ..."
        }
    ]

    // Ваша логика вставки данных
}

export const deleteData = async (tableName: string, dataToDelete: Array<Object>) => {
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