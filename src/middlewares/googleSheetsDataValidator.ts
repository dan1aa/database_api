import { Request, Response, NextFunction } from 'express';
import googleSheetsDataSchema from '../models/googleSheetsData';

enum tableNames {
    Badge = 'badge',
    Intern = 'intern',
    Course = 'course',
    NobelEvent = 'nobel_event',
    InternCourse = 'intern_course',
    EventFeedback = 'event_feedback',
    OversightFeedback = 'oversight_feedback',
    CourseInternBadge = 'course_intern_badge',
    FacilitatorFeedback = 'facilitator_feedback', 
}

export const isValidTableName = (tableName: string) => {
    return Object.values(tableNames).includes(tableName as tableNames);
}

const googleSheetsDataValidator = (
    req: Request, 
    res: Response, 
    next: NextFunction) => {
    const tableName = String(req.params.tableName);

    if (!isValidTableName(tableName)) {
        return res.status(404).send('This table doesn`t exist');
    }

    const requestData = req.body;
    const { error, value } = googleSheetsDataSchema.validate(requestData);

    if (error) {
        return res.status(404).send(`Bad request data: ${error}`); 
    } 

    //TODO: Parse data to convenient use in google sheet service

    next();
};

export default googleSheetsDataValidator;

