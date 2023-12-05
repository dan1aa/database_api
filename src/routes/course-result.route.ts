import { Router } from 'express';

import * as CourseResultController from '@controllers/course-result.controller';

import validateRequestId from '@middlewares/validateRequestId.middleware';
import tryCatchMiddleware from '@middlewares/tryCatchMiddleware.middleware';
import validateRequestBody from '@middlewares/validateRequestBody.middleware';

import * as CourseResultRequestShemas from '@request-schemas/course-result.request-shema';

const router = Router();

router.post(
    '/course-results',
    validateRequestBody(CourseResultRequestShemas.createCourseResultScheme),
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
    validateRequestBody(CourseResultRequestShemas.updateCourseResultScheme),
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

export default router;