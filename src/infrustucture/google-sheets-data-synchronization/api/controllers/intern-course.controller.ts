import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import InternCourseService from '../services/intern-course.service';

const mergeInternCourseData = async  (req: Request, res: Response) => {
    const data = req.body;

    const mergingResult = await InternCourseService.mergeInternCourseData(data);

    res.status(StatusCodes.OK).json(mergingResult);
};

export default {
    mergeInternCourseData
};