import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import CourseRouter from '@routes/course.route';
import InternRouter from '@routes/intern.route';
import ContacRouter from '@routes/contact.route';
import ClassEventRouter from '@routes/class-events.route';
import CourseResultRouter from '@routes/course-result.route';
import GoogleSheetsRouter from '../integrations/googleSheets/index';

import errorHandler from '@middlewares/errorHandler.middleware';

import { swaggerOptions } from '@utils/swagger';

export const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));

app.use('/api', InternRouter);
app.use('/api', ContacRouter);
app.use('/api', CourseRouter);
app.use('/api', ClassEventRouter);
app.use('/api', CourseResultRouter);
app.use('/', GoogleSheetsRouter);

const specs = swaggerJsdoc(swaggerOptions);

app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

app.use(errorHandler);

export default app;