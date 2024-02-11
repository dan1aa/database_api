import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import CourseRouter from '@routes/course.route';
import InternRouter from '@routes/intern.route';
import ClassEventRouter from '@routes/class-events.route';
import CourseResultRouter from '@routes/course-result.route';
import CohortScheduleRouter from '@routes/cohort-schedule.route';
import GithubWebhooksRouter from '@routes/github-webhooks.route';
import FeedbackOnInternRouter from '@routes/feedback-on-intern.route';
import FeedbackOnFacilitatorRouter from '@routes/feedback-on-facilitator.route';

import GoogleSheetsSynchronizationRouter from '../infrustucture/google-sheets-data-synchronization/api';

import errorHandler from '@middlewares/errorHandler.middleware';
// import validateRequestApiToken from '@middlewares/validateRequestApiToken.middleware';

import { swaggerOptions } from '@utils/swagger';

export const app = express();

dotenv.config();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));

//app.use('/api', validateRequestApiToken);

app.use('/api', InternRouter);
app.use('/api', CourseRouter);
app.use('/api', ClassEventRouter);
app.use('/api', CourseResultRouter);
app.use('/api', CohortScheduleRouter);
app.use('/api', FeedbackOnInternRouter);
app.use('/api', FeedbackOnFacilitatorRouter);
app.use('/', GithubWebhooksRouter);

app.use('/google-sheets-data-synchronization', GoogleSheetsSynchronizationRouter);


const specs = swaggerJsdoc(swaggerOptions);

app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

app.use(errorHandler);

export default app;