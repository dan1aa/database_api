import { Request, Response, NextFunction } from 'express';

import { BadRequestError } from '@utils/exeptions/ApiErrors';


enum tableNames {
    Badge = 'badge',
    Intern = 'intern',
    Course = 'course',
    NobelEvent = 'classEvent',
    InternCourse = 'internCourse',
    EventFeedback = 'eventFeedback',
    OversightFeedback = 'oversightFeedback',
    FacilitatorFeedback = 'facilitatorFeedback', 
    EventInternBadge = 'eventInternBadge'
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

