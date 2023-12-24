import { Router } from 'express';

import * as FeedbackOnInternController from '@controllers/feedback-on-intern.controller';

import validateRequestId from '@middlewares/validateRequestId.middleware';
import tryCatchMiddleware from '@middlewares/tryCatchMiddleware.middleware';
import validateRequestBody from '@middlewares/validateRequestBody.middleware';

import * as FeedbackOnInternModels from '@request-schemas/feedback-on-intern.request-schema';

const router = Router();

router.post(
    '/feedbacks-on-intern',
    validateRequestBody(FeedbackOnInternModels.createFeedbackOnInternScheme),
    tryCatchMiddleware(FeedbackOnInternController.getListOfFeedbacksOnIntern)
);

router.get(
    '/feedbacks-on-intern/:id',
    validateRequestId,
    tryCatchMiddleware(FeedbackOnInternController.getFeedbackOnInternById)
);

router.put(
    '/feedbacks-on-intern/:id',
    validateRequestId,
    validateRequestBody(FeedbackOnInternModels.updateFeedbackOnInternScheme),
    tryCatchMiddleware(FeedbackOnInternController.updateFeedbackOnInternById)
);

router.delete(
    '/feedbacks-on-intern/:id',
    validateRequestId,
    tryCatchMiddleware(FeedbackOnInternController.deleteFeedbackOnInternById)
);

router.get(
    '/feedbacks-on-intern',
    tryCatchMiddleware(FeedbackOnInternController.getListOfFeedbacksOnIntern)
);


export default router;

