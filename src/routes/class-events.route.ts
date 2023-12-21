import { Router } from 'express';

import * as ClassEventController from '@controllers/class-event.controller';

import validateRequestId from '@middlewares/validateRequestId.middleware';
import tryCatchMiddleware from '@middlewares/tryCatchMiddleware.middleware';
import validateRequestBody from '@middlewares/validateRequestBody.middleware';

import {
    createClassEventsScheme,
    updateClassEventScheme
} from '@request-schemas/class-event.request-shema';

const router = Router();

router.get(
    '/class-events',
    tryCatchMiddleware(ClassEventController.getListOfClassEvents)
);

router.get(
    '/class-events/:id',
    validateRequestId,
    tryCatchMiddleware(ClassEventController.getClassEventById)
);

router.post(
    '/class-events',
    validateRequestBody(createClassEventsScheme),
    tryCatchMiddleware(ClassEventController.createClassEvents)
);


router.put(
    '/class-events/:id',
    validateRequestId,
    validateRequestBody(updateClassEventScheme),
    tryCatchMiddleware(ClassEventController.updateClassEventById)
);

router.delete(
    '/class-events/:id',
    validateRequestId,
    tryCatchMiddleware(ClassEventController.deleteClassEventById)
);


router.get(
    '/class-events/link/:code',
    tryCatchMiddleware(ClassEventController.getClassEventByGoogleMeetCode)
)

export default router;