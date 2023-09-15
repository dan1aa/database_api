import { Response } from 'express';
import { db } from '@utils/db.server';
import { NotFoundError } from '@exeptions/ApiErrors';

export const deleteData = async (tableName: string, dataToInsert: any[], res: Response) => {
    res.end()
};

export const insertData = async (tableName: string, dataToInsert: any[], res: Response) => {

    try {
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
            },
            oversight_feedback: {
                insert: `INSERT IGNORE INTO oversight_feedback (event_id, feedback, attendance) VALUES`,
                onUpdate: `as new_oversight_feedback
                ON DUPLICATE KEY UPDATE
                event_id = new_oversight_feedback.event_id,
                feedback = new_oversight_feedback.feedback,
                attendance = new_oversight_feedback.attendance`
            },
            facilitator_feedback: {
                insert: `INSERT IGNORE INTO facilitator_feedback (event_id, sender_id, receiver_id, feedback, attendance) VALUES`,
                onUpdate: `as new_facilitator_feedback
                ON DUPLICATE KEY UPDATE
                event_id = new_facilitator_feedback.event_id,
                sender_id = new_facilitator_feedback.sender_id,
                receiver_id = new_facilitator_feedback.receiver_id,
                feedback = new_facilitator_feedback.feedback,
                attendance = new_facilitator_feedback.attendance`
            },
            event_feedback: {
                insert: `INSERT IGNORE INTO event_feedback (event_id, sender_id, comment) VALUES`,
                onUpdate: `as new_event_feedback
                ON DUPLICATE KEY UPDATE
                event_id = new_event_feedback.event_id,
                sender_id = new_event_feedback.sender_id,
                comment = new_event_feedback.comment`
            },
        }


        const outputArray = dataToInsert.map(data => Object.values(data))

        const values = outputArray.map(row => `(${row.map(value => `'${value}'`).join(',')})`).join(',');

        const result = await db.$queryRawUnsafe(`${insertQueries[tableName].insert} ${values} ${insertQueries[tableName].onUpdate}`);
        res.end()
    } catch(e) {
        throw new NotFoundError();
    }

}