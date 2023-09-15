import { Router } from 'express';

import * as GoogleSheetsController from '@controllers/googleSheets.controller';
import googleSheetsDataValidator from '@middlewares/googleSheetsDataValidator.middleware';


const router = Router();

router.put(
    '/googleSheets/:tableName', 
    googleSheetsDataValidator,
    GoogleSheetsController.updateData,
);

export default router;