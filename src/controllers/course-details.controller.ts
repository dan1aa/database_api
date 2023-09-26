import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import * as CourseDetailsService from '@services/course-details.service';


export const getCourseDetails = async (req: Request, res: Response) => {
    const courseName = req.params.courseName;
    const result = await CourseDetailsService.getCourseDetailsByName(courseName);

    res.status(StatusCodes.OK).json(result).end();
};

export const getCourseDetailsList = async (req: Request, res: Response) => {
    const courseNames: string[] = Array.isArray(req.query.courseName)
        ? req.query.courseName.map(name => String(name))
        : [String(req.query.courseName)];
    
    const result = await CourseDetailsService.getCoursesDetailsList(courseNames);

    res.status(StatusCodes.OK).json(result).end();
};