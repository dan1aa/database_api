import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

import * as CourseService from '@services/course.service';
import { Course, CourseResult } from '@prisma/client';
import { NotFoundError } from '@utils/exeptions/ApiErrors';

export const createCourses = async (req: Request, res: Response) => {
    const { data } = req.body;

    const cratedCourses = await CourseService.createCourses(data);

    res.status(StatusCodes.CREATED).json(cratedCourses).end();
};

export const getCourses = async (req: Request, res: Response) => {
    const coursesList: Course[] | null = await CourseService.getCourses();
        
    res.status(StatusCodes.OK).json(coursesList).end();
};

export const getCourseById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const course: Course | null = await CourseService.getCourseById(+id)

    res.status(StatusCodes.OK).json(course).end()
}

export const updateCourseById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;

    const updatedCourse: Course = await CourseService.updateCourseById(+id, data);

    res.status(StatusCodes.OK).json(updatedCourse).end();
}


export const deleteCourseById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const deletedCourse: Course = await CourseService.deleteCourseById(+id);

    res.status(StatusCodes.OK).json(deletedCourse).end();
}

export const enrollInternsInCourseById = async (req: Request, res: Response) => {
    const courseId = Number(req.params.id);
    const participantsData = req.body.data;

    await CourseService.enrollInternsInCourseById(courseId, participantsData);

    res.status(StatusCodes.OK).end();
}


export const getCourseDetailsByCipher = async (req: Request, res: Response) => {
    const courseCipher = req.params.courseCipher;

    const courseDetails = await CourseService.getCourseDetailsByCipher(courseCipher);

    res.status(StatusCodes.OK).json(courseDetails).end();
};

export const getCourseResultsByCourseId = async(req: Request, res: Response) => {
    const { courseId } = req.params;

    const courseResults: CourseResult[] | null = await CourseService.getCourseResultsByCourseId(+courseId);

    res.status(StatusCodes.OK).json(courseResults).end()
}