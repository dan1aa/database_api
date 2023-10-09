import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import * as CourseResultService from '@services/course-result.service';

export const createCourseResult = async (req: Request, res: Response) => {
    const courseResultData = req.body;

    const createdCourseResultRecord = await CourseResultService.createCourseResult(courseResultData);

    res.status(StatusCodes.CREATED).json(createdCourseResultRecord).end();
};

export const updateCourseResultById = async (req: Request, res: Response) => {
    const courseResultData = req.body;
    const courseResultId = Number(req.params.id);
    
    const updatedCourseResultRecord = await CourseResultService.updateCourseResultById(courseResultId, courseResultData);

    res.status(StatusCodes.OK).json(updatedCourseResultRecord).end();
};

export const getCourseResultById = async (req: Request, res: Response) => {
    const courseResultId = Number(req.params.id);

    const courseResultData = await CourseResultService.getCourseResultById(courseResultId);

    res.status(StatusCodes.OK).json(courseResultData).end();
};

export const deleteCourseResultById = async (req: Request, res: Response) => {
    const courseResultId = Number(req.params.id);

    const deletedCourseResult = await CourseResultService.deleteCourseResultById(courseResultId);

    res.status(StatusCodes.OK).json(deletedCourseResult).end();
};

export const getListOfCourseResults = async (req: Request, res: Response) => {
    const courseResultsList = await CourseResultService.getListOfCourseResults();

    res.status(StatusCodes.OK).json(courseResultsList).end();
};