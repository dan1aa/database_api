import { Response } from 'express';
import { db } from '@utils/db.server';

export const deleteData = async (tableName: string, dataToInsert: any[], res: Response) => {
    res.end()
};

export const insertData = async (tableName: string, dataToInsert: any[], res: Response) => {

    const insertQueries: Record<string, { insert: string; onUpdate: string; }> = {
        intern: {
            insert: 'INSERT IGNORE INTO intern (explorer_id, discord_id, first_name, last_name, email, cohort) VALUES',
            onUpdate: `as new_intern
            ON DUPLICATE KEY UPDATE
            discord_id = new_intern.discord_id,
            first_name = new_intern.first_name,
            last_name = new_intern.last_name,
            email = new_intern.email,
            cohort = new_intern.cohort`
        },
        course: {
            insert: 'INSERT IGNORE INTO course (start_date, end_date, course_id) VALUES',
            onUpdate: `as new_course
                       ON DUPLICATE KEY UPDATE
                       start_date = new_course.start_date,
                       end_date = new_course.end_date`
        },
        nobel_event: {
            insert: 'INSERT IGNORE INTO nobel_event (course_id, meet_num, event_date) VALUES',
            onUpdate: `as new_nobel_event
            ON DUPLICATE KEY UPDATE
            course_id = new_nobel_event.course_id,
            meet_num = new_nobel_event.meet_num,
            event_date = new_nobel_event.event_date
            `
        }
    }


    const outputArray = dataToInsert.map(data => Object.values(data))
    console.log(dataToInsert)

    const values = outputArray.map(row => `(${row.map(value => `'${value}'`).join(',')})`).join(',');

    const result = await db.$queryRawUnsafe(`${insertQueries[tableName].insert} ${values}`);
    res.end()

}