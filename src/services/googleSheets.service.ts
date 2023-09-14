import { Response } from 'express';
import { db } from '../utils/db.server';

export const updateData = async () => { };

export const deleteData = async (tableName: string, dataToInsert: any[], res: Response) => {
    res.end()
 };

export const insertData = async (tableName: string, dataToInsert: any[], res: Response) => {

    const insertQueries: Record<string, { insert: string; }> = {
        intern: {
            insert: 'INSERT IGNORE INTO intern (explorer_id, discord_id, first_name, last_name, email, cohort) VALUES',
        },
        course: {
            insert: 'INSERT IGNORE INTO course (cohort, start_date, end_date, course_id) VALUES',
        },
        nobel_event: {
            insert: 'INSERT INTO nobel_event (course_id, meet_num, event_date) VALUES'
        }
    }
    

    const outputArray = dataToInsert.map(data => Object.values(data))

    const values = outputArray.map(row => `(${row.map(value => `'${value}'`).join(',')})`).join(',');

    const result = await db.$queryRawUnsafe(`${insertQueries[tableName].insert} ${values}`);
    res.end()
};
