import { Router } from 'express';

import * as CourseResultController from '@controllers/course-result.controller';

import validateRequestId from '@middlewares/validateRequestId.middleware';
import tryCatchMiddleware from '@middlewares/tryCatchMiddleware.middleware';
import validateRequestBody from '@middlewares/validateRequestBody.middleware';

import { createCourseResultsScheme, updateCourseResultScheme } from '@request-schemas/course-result.request-shema';

const router = Router();

router.post(
    '/course-results',
    validateRequestBody(createCourseResultsScheme),
    tryCatchMiddleware(CourseResultController.createCourseResults)
);

router.get(
    '/course-results/:id',
    validateRequestId,
    tryCatchMiddleware(CourseResultController.getCourseResultById)
);

router.put(
    '/course-results/:id',
    validateRequestId,
    validateRequestBody(updateCourseResultScheme),
    tryCatchMiddleware(CourseResultController.updateCourseResultById)
);

router.delete(
    '/course-results/:id',
    validateRequestId,
    tryCatchMiddleware(CourseResultController.deleteCourseResultById)
);

router.get(
    '/course-results',
    tryCatchMiddleware(CourseResultController.getListOfCourseResults)
);

router.get(
    '/course-results/all-course-results/:explorerId',
    tryCatchMiddleware(CourseResultController.getAllCourseResultsByExplorerId)
)


export default router;