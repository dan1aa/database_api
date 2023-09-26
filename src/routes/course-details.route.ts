import { Router } from 'express';

import tryCatchMiddleware from '@middlewares/tryCatchMiddleware.middleware';
import * as CoursesDetailsController from '@controllers/course-details.controller';

const router = Router();

router.get(
    '/course-details',
    tryCatchMiddleware(CoursesDetailsController.getCourseDetailsList)
);

router.get(
    '/course-details/:courseName',
    tryCatchMiddleware(CoursesDetailsController.getCourseDetails)
);

export default router;