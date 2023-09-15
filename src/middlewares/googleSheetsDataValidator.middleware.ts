import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

import googleSheetsDataSchema from '@models/googleSheetsData';


enum tableNames {
    Badge = 'badge',
    Intern = 'intern',
    Course = 'course',
    NobelEvent = 'nobel_event',
    InternCourse = 'intern_course',
    EventFeedback = 'event_feedback',
    OversightFeedback = 'oversight_feedback',
    FacilitatorFeedback = 'facilitator_feedback', 
    EventInternBadge = 'event_intern_badge'
}

export const isValidTableName = (tableName: string) => {
    return Object.values(tableNames).includes(tableName as tableNames);
}

const googleSheetsDataValidator = (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    const tableName: string = req.params.tableName;

    if (!isValidTableName(tableName)) {
        return res.status(StatusCodes.BAD_REQUEST).send('This table doesn`t exist');
    }

    const requestData = req.body;
    const { error } = googleSheetsDataSchema.validate(requestData);

    if (error) {
        return res.status(StatusCodes.BAD_REQUEST).send(`Bad request data: ${error}`); 
    } 

    next();
};

export default googleSheetsDataValidator;

