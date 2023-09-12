import { Router } from 'express';
import * as InternController from '../controllers/intern.controller';

const router = Router();

router.get('/intern/:id', InternController.getInternById);


export default router;