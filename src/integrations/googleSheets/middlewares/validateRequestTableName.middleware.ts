import { Request, Response, NextFunction } from 'express';

import { BadRequestError } from '@utils/exeptions/ApiErrors';


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
};

const validateRequestTableName = (req: Request, res: Response, next: NextFunction) => {
    const tableName: string = req.params.tableName;
    const isValidTableName: boolean = Object.values(tableNames).includes(tableName as tableNames);

    if (!isValidTableName) {
        throw new BadRequestError('Invalid table name');
    }

    next();
};

export default validateRequestTableName;

