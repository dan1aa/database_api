import Router from 'express';

import InternCourseController from '../controllers/intern-course.controller';

import tryCatchMiddleware from '@middlewares/tryCatchMiddleware.middleware';

const router = Router();

router.post(
    '/merge-intern-course',
    tryCatchMiddleware(InternCourseController.mergeInternCourseData)
);

export default router;