import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

import * as CourseService from '@services/course.service';
import { course } from '@prisma/client';


export const getCourses = async (req: Request, res: Response): Promise<string | void> => {
    const result: course[] = await CourseService.getCourses();
        
    res.status(StatusCodes.OK).json(result).end();
};

export const getCourseById = async (req: Request, res: Response): Promise<string | void> => {
    const { id } = req.params;
    const result: course | null = await CourseService.getCourseById(+id)

    res.status(StatusCodes.OK).json(result).end()
}

export const createCourse = async (req: Request, res: Response): Promise<string | void> => {
    const courseData = req.body;

    const result = await CourseService.createCourse(courseData);

    res.status(StatusCodes.CREATED).json(result).end();
}

export const updateCourseById = async (req: Request, res: Response): Promise<string | void> => {
    const { id } = req.params;
    const data = req.body;

    const result = await CourseService.updateCourseById(+id, data);

    res.status(StatusCodes.OK).json(result).end();
}


export const deleteCourseById = async (req: Request, res: Response): Promise<string | void> => {
    const { id } = req.params;

    const result = await CourseService.deleteCourseById(+id);

    res.status(StatusCodes.OK).json(result).end();
}