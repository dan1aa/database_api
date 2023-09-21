import { Router } from 'express';

import * as CourseController from '@controllers/course.controller';
import tryCatchMiddleware from '@middlewares/tryCatchMiddleware.middleware';


const router = Router();

router.get('/courses', tryCatchMiddleware(CourseController.getCourses));
router.get('/courses/:courseName', tryCatchMiddleware(CourseController.getCourseByName));

export default router;