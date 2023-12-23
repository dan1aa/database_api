import { Router } from 'express';

import * as CourseController from '@controllers/course.controller';
import tryCatchMiddleware from '@middlewares/tryCatchMiddleware.middleware';
import validateRequestBody from '@middlewares/validateRequestBody.middleware';
import * as CourseModels from '../request-schemas/course.request-schema';

const router = Router();

router.get('/courses', tryCatchMiddleware(CourseController.getCourses));

router.get('/courses/:id', tryCatchMiddleware(CourseController.getCourseById));

router.post(
    '/courses', 
    validateRequestBody(CourseModels.createCoursesScheme),
    tryCatchMiddleware(CourseController.createCourses)
);

router.put(
    '/courses/:id',
    validateRequestBody(CourseModels.updateCourseScheme),
    tryCatchMiddleware(CourseController.updateCourseById)
);

router.delete(
    '/courses/:id',
    tryCatchMiddleware(CourseController.deleteCourseById)
);

router.get(
    '/courses/:courseCipher/details',
    tryCatchMiddleware(CourseController.getCourseDetailsByCipher)
);

router.post(
    '/courses/:id/enroll-interns',
    validateRequestBody(CourseModels.enrollmentInternsScheme),
    tryCatchMiddleware(CourseController.enrollInternsInCourseById)
);

export default router;