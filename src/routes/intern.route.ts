import { Router } from 'express';

import * as InternController from '@controllers/intern.controller';

import validateRequestId from '@middlewares/validateRequestId.middleware';
import tryCatchMiddleware from '@middlewares/tryCatchMiddleware.middleware';
import validateRequestBody from '@middlewares/validateRequestBody.middleware';

import * as InternRequestsShemas from '../request-schemas/intern.request-schema';

const router = Router();

router.post(
    '/interns',
    validateRequestBody(InternRequestsShemas.createInternsScheme),
    tryCatchMiddleware(InternController.createInterns)
);

router.put(
    '/interns/:id',
    validateRequestId,
    validateRequestBody(InternRequestsShemas.updateInternScheme),
    tryCatchMiddleware(InternController.updateInternById)
);

router.get(
    '/interns', 
    tryCatchMiddleware(InternController.getFilteredInternsList)
);

router.get(
    '/interns/:id',
    validateRequestId, 
    tryCatchMiddleware(InternController.getInternById)
);

router.delete(
    '/interns/:id',
    validateRequestId,
    tryCatchMiddleware(InternController.deleteInternById)
);

router.get(
    '/interns/:explorerId/cohort-schedule',
    tryCatchMiddleware(InternController.getCohortScheduleByExplorerId)
);

router.get(
    '/interns/:explorerId/course-badges/:courseCipher',
    tryCatchMiddleware(InternController.getInternBadgesListByCourseId)
);

router.get(
    '/interns/all-badges/:explorerId',
    tryCatchMiddleware(InternController.getAllInternBadges)
)

router.put(
    '/interns/discord/update',
    tryCatchMiddleware(InternController.insertDiscordData)
)


export default router;