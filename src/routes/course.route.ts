import { Router } from 'express';

import * as CourseController from '@controllers/course.controller';
import tryCatchMiddleware from '@middlewares/tryCatchMiddleware.middleware';
import validateRequestBody from '@middlewares/validateRequestBody.middleware';
import * as CourseModels from '@models/course.model';


const router = Router();

router.get('/courses', tryCatchMiddleware(CourseController.getCourses));

router.get('/courses/:id', tryCatchMiddleware(CourseController.getCourseById));

router.post(
    '/courses', 
    validateRequestBody(CourseModels.createCourseScheme),
    tryCatchMiddleware(CourseController.createCourse)
)

router.put(
    '/courses/:id',
    validateRequestBody(CourseModels.updateCourseScheme),
    tryCatchMiddleware(CourseController.updateCourseById)
)

router.delete(
    '/courses/:id',
    tryCatchMiddleware(CourseController.deleteCourseById)
)

export default router;