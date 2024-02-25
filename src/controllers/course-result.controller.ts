import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import * as CourseResultService from '@services/course-result.service';
import { CourseResult } from '@prisma/client';

export const createCourseResults = async (req: Request, res: Response) => {
    const { data } = req.body;

    const createdCourseResults = await CourseResultService.createCourseResults(data);

    res.status(StatusCodes.CREATED).json(createdCourseResults).end();
};

export const updateCourseResultById = async (req: Request, res: Response) => {
    const courseResultData = req.body;
    const courseResultId = Number(req.params.id);
    
    const updatedCourseResult: CourseResult = await CourseResultService.updateCourseResultById(courseResultId, courseResultData);

    res.status(StatusCodes.OK).json(updatedCourseResult).end();
};

export const getCourseResultById = async (req: Request, res: Response) => {
    const courseResultId = Number(req.params.id);

    const courseResult: CourseResult | null = await CourseResultService.getCourseResultById(courseResultId);

    res.status(StatusCodes.OK).json(courseResult).end();
};

export const deleteCourseResultById = async (req: Request, res: Response) => {
    const courseResultId = Number(req.params.id);

    const deletedCourseResult: CourseResult = await CourseResultService.deleteCourseResultById(courseResultId);

    res.status(StatusCodes.OK).json(deletedCourseResult).end();
};

export const getListOfCourseResults = async (req: Request, res: Response) => {
    const courseResultsList: CourseResult[] | null = await CourseResultService.getListOfCourseResults();

    res.status(StatusCodes.OK).json(courseResultsList).end();
};

export const getAllCourseResultsByExplorerId = async (req: Request, res: Response) => {
    const { explorerId } = req.params;

    const courseResults = await CourseResultService.getAllCourseResultsByExplorerId(explorerId);

    res.status(StatusCodes.OK).json(courseResults).end();
}