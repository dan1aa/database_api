import { Router } from 'express';

import * as CohortScheduleController from '@controllers/cohort-schedule.controller';

import validateRequestId from '@middlewares/validateRequestId.middleware';
import tryCatchMiddleware from '@middlewares/tryCatchMiddleware.middleware';
import validateRequestBody from '@middlewares/validateRequestBody.middleware';

import {
    createCohorScheduleScheme,
    updateCohorScheduleScheme
} from '@request-schemas/cohort-schedule.request-schema';

const router = Router();

router.post(
    '/cohort-schedule',
    validateRequestBody(createCohorScheduleScheme),
    tryCatchMiddleware(CohortScheduleController.createCohorSchedule)
);

router.get(
    '/cohort-schedule/:id',
    validateRequestId,
    tryCatchMiddleware(CohortScheduleController.getCohortScheduleById)
);

router.put(
    '/cohort-schedule/:id',
    validateRequestId,
    validateRequestBody(updateCohorScheduleScheme),
    tryCatchMiddleware(CohortScheduleController.updateCohortScheduleById)
);

router.delete(
    '/cohort-schedule/:id',
    validateRequestId,
    tryCatchMiddleware(CohortScheduleController.deleteCohortScheduleById)
);

router.get(
    '/cohort-schedule',
    tryCatchMiddleware(CohortScheduleController.getCohortScheduleList)
);

export default router;