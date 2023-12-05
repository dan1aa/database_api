import { Router } from 'express';

import * as FacilitatorResultController from '@controllers/facilitator-result.controller';

import validateRequestId from '@middlewares/validateRequestId.middleware';
import tryCatchMiddleware from '@middlewares/tryCatchMiddleware.middleware';
import validateRequestBody from '@middlewares/validateRequestBody.middleware';

import * as FacilitatorResultModels from '@request-schemas/facilitator-results.request-schema';


const router = Router();

router.post(
    '/facilitator-results',
    validateRequestBody(FacilitatorResultModels.createFacilitatorResultScheme),
    tryCatchMiddleware(FacilitatorResultController.createFacilitatorResults)
);


router.get(
    '/facilitator-results/:id',
    validateRequestId,
    tryCatchMiddleware(FacilitatorResultController.getFacilitatorResultById)
);

router.put(
    '/facilitator-results/:id',
    validateRequestId,
    validateRequestBody(FacilitatorResultModels.updateFacilitatorResultScheme),
    tryCatchMiddleware(FacilitatorResultController.updateFacilitatorResultById)
);

router.delete(
    '/facilitator-results/:id',
    validateRequestId,
    tryCatchMiddleware(FacilitatorResultController.deleteFacilitatorResultById)
);

router.get(
    '/facilitator-results',
    tryCatchMiddleware(FacilitatorResultController.getListOfFacilitatorResults)
);


export default router;

