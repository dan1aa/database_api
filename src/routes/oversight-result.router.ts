import { Router } from 'express';

import * as OversightResultController from '@controllers/oversight-result.controller';

import validateRequestId from '@middlewares/validateRequestId.middleware';
import tryCatchMiddleware from '@middlewares/tryCatchMiddleware.middleware';
import validateRequestBody from '@middlewares/validateRequestBody.middleware';

import * as OversightResultModels from '@request-schemas/oversight-results.schema';


const router = Router();

router.post(
    '/oversight-results',
    validateRequestBody(OversightResultModels.createOversightResultScheme),
    tryCatchMiddleware(OversightResultController.createOversightResults)
);


router.get(
    '/oversight-results/:id',
    validateRequestId,
    tryCatchMiddleware(OversightResultController.getOversightResultById)
);

router.put(
    '/oversight-results/:id',
    validateRequestId,
    validateRequestBody(OversightResultModels.updateOversightResultScheme),
    tryCatchMiddleware(OversightResultController.updateOversightResultById)
);

router.delete(
    '/oversight-results/:id',
    validateRequestId,
    tryCatchMiddleware(OversightResultController.deleteOversightResultById)
);

router.get(
    '/oversight-results',
    tryCatchMiddleware(OversightResultController.getListOfOversightResults)
);


export default router;

