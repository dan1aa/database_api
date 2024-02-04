import { Router } from 'express';

import * as CourseController from '@controllers/course.controller';
import tryCatchMiddleware from '@middlewares/tryCatchMiddleware.middleware';
import validateRequestBody from '@middlewares/validateRequestBody.middleware';
import * as CourseModels from '../request-schemas/course.request-schema';
import validateRequestId from '@middlewares/validateRequestId.middleware';

const router = Router();

router.get('/courses', tryCatchMiddleware(CourseController.getCourses));

router.get('/courses/:id',
    validateRequestId,
    tryCatchMiddleware(CourseController.getCourseById));

router.post(
    '/courses', 
    validateRequestBody(CourseModels.createCoursesScheme),
    tryCatchMiddleware(CourseController.createCourses)
);

router.put(
    '/courses/:id',
    validateRequestId,
    validateRequestBody(CourseModels.updateCourseScheme),
    tryCatchMiddleware(CourseController.updateCourseById)
);

router.delete(
    '/courses/:id',
    validateRequestId,
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

router.get(
    '/courses/course-results/:courseId',
    tryCatchMiddleware(CourseController.getCourseResultsByCourseId)
)

export default router;