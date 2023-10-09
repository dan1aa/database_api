import { Router } from 'express';

// import synchronizationDataSchema from '../schemes/synchronizationData.sheme';

import tryCatchMiddleware from '@middlewares/tryCatchMiddleware.middleware';
// import validateRequestBody from '@middlewares/validateRequestBody.middleware';
import validateRequestTableName from '../middlewares/validateRequestTableName.middleware';

import * as sheetsCreateController from '../controllers/createData.controller';


const router = Router();

// router.put(
//     '/synchronizeData/:tableName',
//     validateRequestTableName, 
//     validateRequestBody(synchronizationDataSchema),
//     tryCatchMiddleware(DataSynchronizationController.synchronizeData)
// );

router.put('/synchronizeData/create/:tableName', validateRequestTableName, tryCatchMiddleware(sheetsCreateController.sheetsCreate))

export default router;