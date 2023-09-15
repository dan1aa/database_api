import { Router } from 'express';

import * as InternController from '@controllers/intern.controller';
import tryCatchMiddleware from '@middlewares/tryCatchMiddleware.middleware';


const router = Router();

router.get('/interns', tryCatchMiddleware(InternController.filterInterns));
router.get('/interns/:id', tryCatchMiddleware(InternController.getInternById));


export default router;