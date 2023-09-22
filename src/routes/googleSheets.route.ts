import { Router } from 'express';

import * as GoogleSheetsController from '@controllers/googleSheets.controller';
import tryCatchMiddleware from '@middlewares/tryCatchMiddleware.middleware';


const router = Router();

router.put(
    '/googleSheets/:tableName', 
    GoogleSheetsController.updateData
);

export default router;