import Router from 'express';

import InternCourseController from '../controllers/intern-course.controller';
import InternCourseValidatingShemas from '../request-schemas/intern-courses.request.schema';

import tryCatchMiddleware from '@middlewares/tryCatchMiddleware.middleware';
import validateRequestBody from '@middlewares/validateRequestBody.middleware';

const router = Router();

router.post(
    '/merge-interns', 
    tryCatchMiddleware(InternCourseController.mergeInternData)
);

router.post(
    '/merge-courses',
    tryCatchMiddleware(InternCourseController.mergeCourseData)
);

router.post(
    '/merge-intern-course',
    tryCatchMiddleware(InternCourseController.mergeInternCourseData)
);

export default router;