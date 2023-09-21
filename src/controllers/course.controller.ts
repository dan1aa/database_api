import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

import * as CourseService from '@services/course.service';
import { course } from '@prisma/client';


export const getCourses = async (req: Request, res: Response): Promise<string | void> => {
    const result: course[] = await CourseService.getCourses();
        
    res.status(StatusCodes.OK).json(result);
};

export const getCourseByName = async (req: Request, res: Response): Promise<string | void> => {
    const courseName: string = req.params.courseName;
    const result: course[] = await CourseService.getCourseByName(courseName)

    res.status(StatusCodes.OK).json(result)
}