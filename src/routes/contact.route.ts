import { Router } from 'express';

import * as ContactController from '@controllers/contact.controller';

import validateRequestId from '@middlewares/validateRequestId.middleware';
import tryCatchMiddleware from '@middlewares/tryCatchMiddleware.middleware';
import validateRequestBody from '@middlewares/validateRequestBody.middleware';

import { 
    createContactScheme, 
    updateContactScheme,
    createContactArraySchema
} from '@request-schemas/contact.request-shema';


const router = Router();

router.post(
    '/contacts',
    validateRequestBody(createContactScheme),
    tryCatchMiddleware(ContactController.createContact)
);

router.get(
    '/contacts/:id',
    validateRequestId,
    tryCatchMiddleware(ContactController.getContactById)
);

router.put(
    '/contacts/:id',
    validateRequestId,
    validateRequestBody(updateContactScheme),
    tryCatchMiddleware(ContactController.updateContactById)
);

router.delete(
    '/contacts/:id',
    validateRequestId,
    tryCatchMiddleware(ContactController.deleteContactById)
);

router.get(
    '/contacts',
    tryCatchMiddleware(ContactController.getContactsList)
);

router.post(
    '/contacts/bulkingCreation',
    validateRequestBody(createContactArraySchema),
    tryCatchMiddleware(ContactController.bulkingCreation)
);

export default router;

