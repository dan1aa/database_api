import { Router } from 'express';

import * as InternRequestsShemas from '../request-schemas/intern.request-schema';

import * as InternController from '@controllers/intern.controller';

import validateRequestId from '@middlewares/validateRequestId.middleware';
import tryCatchMiddleware from '@middlewares/tryCatchMiddleware.middleware';
import validateRequestBody from '@middlewares/validateRequestBody.middleware';


const router = Router();

router.post(
    '/interns',
    validateRequestBody(InternRequestsShemas.createInternScheme),
    tryCatchMiddleware(InternController.createIntern)
);

router.put(
    '/interns/:id',
    validateRequestId,
    validateRequestBody(InternRequestsShemas.updateInternSheme),
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

export default router;