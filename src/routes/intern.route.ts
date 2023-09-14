import { Router } from 'express';
import * as InternController from '../controllers/intern.controller';

const router = Router();

router.get('/interns', InternController.filterInternts);
router.get('/interns/:id', InternController.getInternById);


export default router;