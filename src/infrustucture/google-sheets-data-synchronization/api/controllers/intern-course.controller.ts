import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import InternCourseService from '../services/intern-course.service';


const mergeInternData = async (req: Request, res: Response) => {
    const data = req.body;

    const mergingResult = await InternCourseService.mergeInternData(data);

    res.status(StatusCodes.OK).json(mergingResult);
};

const mergeCourseData = async  (req: Request, res: Response) => {
    const data = req.body;

    const mergingResult = await InternCourseService.mergeCourseData(data);

    res.status(StatusCodes.OK).json(mergingResult);
};

const mergeInternCourseData = async  (req: Request, res: Response) => {
    const data = req.body;

    const mergingResult = await InternCourseService.mergeInternCourseData(data);

    res.status(StatusCodes.OK).json(mergingResult);
};

export default {
    mergeInternData,
    mergeCourseData,
    mergeInternCourseData
};