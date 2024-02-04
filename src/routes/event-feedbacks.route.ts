import { Router } from 'express';

import * as EventFeedbackController from '@controllers/event-feedback.controller';
import tryCatchMiddleware from '@middlewares/tryCatchMiddleware.middleware';
import validateRequestBody from '@middlewares/validateRequestBody.middleware';
import * as EventFeedbackModels from '../request-schemas/event-feedback.request-shema';
import validateRequestId from '@middlewares/validateRequestId.middleware';

const router = Router();

router.get('/event-feedbacks', tryCatchMiddleware(EventFeedbackController.getListOfEventFeedbacks))

router.get('/event-feedbacks/:id',
            validateRequestId,
            tryCatchMiddleware(EventFeedbackController.getEventFeedbackById))

router.post('/event-feedbacks',
            validateRequestBody(EventFeedbackModels.createEventFeedbacksSheme),
            tryCatchMiddleware(EventFeedbackController.createEventFeedbacks))

router.put('/event-feedbacks/:id',
            validateRequestId,
            validateRequestBody(EventFeedbackModels.updateEventFeedbackSheme),
            tryCatchMiddleware(EventFeedbackController.updateEventFeedbackById))

router.delete('/event-feedbacks/:id',
              validateRequestId,
              tryCatchMiddleware(EventFeedbackController.deletedEventFeedbackById)
)

export default router;