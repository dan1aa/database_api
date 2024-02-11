import Router from 'express';

import InterCourseRouter from './routes/intern-course.router'

const router = Router();

router.use('/intern-course', InterCourseRouter);

export default router;