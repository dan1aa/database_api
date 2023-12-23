import cors from 'cors';
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
import FacilitatorResultRouter from '@routes/facilitator-result.route';
import OversightResultRouter from '@routes/oversight-result.router';

import errorHandler from '@middlewares/errorHandler.middleware';
import prismaErrorHandler from '@middlewares/prismaErrorsHandler.moddleware';
import validateRequestApiToken from '@middlewares/validateRequestApiToken.middleware';

import { swaggerOptions } from '@utils/swagger';

export const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));

//app.use('/api', validateRequestApiToken);

app.use('/api', InternRouter);
app.use('/api', CourseRouter);
app.use('/api', ClassEventRouter);
app.use('/api', CourseResultRouter);
app.use('/api', CohortScheduleRouter);
app.use('/api', FacilitatorResultRouter);
app.use('/api', OversightResultRouter);
app.use('/', GithubWebhooksRouter);


const specs = swaggerJsdoc(swaggerOptions);

app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

app.use(prismaErrorHandler);
app.use(errorHandler);

export default app;