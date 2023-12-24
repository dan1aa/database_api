import { Router } from 'express';

import * as FeedbackOnFacilitatorController from '@controllers/feedback-on-facilitator.controller';

import validateRequestId from '@middlewares/validateRequestId.middleware';
import tryCatchMiddleware from '@middlewares/tryCatchMiddleware.middleware';
import validateRequestBody from '@middlewares/validateRequestBody.middleware';

import * as FeedbackOnFacilitatorModels from '@request-schemas/feedback-on-facilitator.request-schema';


const router = Router();

router.post(
    '/feedbacks-on-facilitator',
    validateRequestBody(FeedbackOnFacilitatorModels.createFeedbackOnFacilitatorScheme),
    tryCatchMiddleware(FeedbackOnFacilitatorController.createFeedbacksOnFacilitator)
);


router.get(
    '/feedbacks-on-facilitator/:id',
    validateRequestId,
    tryCatchMiddleware(FeedbackOnFacilitatorController.getFeedbackOnFacilitatorById)
);

router.put(
    '/feedbacks-on-facilitator/:id',
    validateRequestId,
    validateRequestBody(FeedbackOnFacilitatorModels.updateFeedbackOnFacilitatorScheme),
    tryCatchMiddleware(FeedbackOnFacilitatorController.updateFeedbackOnFacilitatorById)
);

router.delete(
    '/feedbacks-on-facilitator/:id',
    validateRequestId,
    tryCatchMiddleware(FeedbackOnFacilitatorController.deleteFeedbackOnFacilitatorById)
);

router.get(
    '/feedbacks-on-facilitator',
    tryCatchMiddleware(FeedbackOnFacilitatorController.getListOfFeedbacksOnFacilitator)
);


export default router;

