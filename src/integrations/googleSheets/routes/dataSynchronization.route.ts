import { Router } from 'express';

// import synchronizationDataSchema from '../schemes/synchronizationData.sheme';

import tryCatchMiddleware from '@middlewares/tryCatchMiddleware.middleware';
// import validateRequestBody from '@middlewares/validateRequestBody.middleware';
import validateRequestTableName from '../middlewares/validateRequestTableName.middleware';

import * as sheetsCreateController from '../controllers/createData.controller';
import * as sheetsDeleteController from '../controllers/deleteData.controller';
import * as sheetsUpdateController from '../controllers/updateData.controller';


const router = Router();

// router.put(
//     '/synchronizeData/:tableName',
//     validateRequestTableName, 
//     validateRequestBody(synchronizationDataSchema),
//     tryCatchMiddleware(DataSynchronizationController.synchronizeData)
// );

router.post('/synchronizeData/create/:tableName', validateRequestTableName, tryCatchMiddleware(sheetsCreateController.sheetsCreate))
router.delete('/synchronizeData/delete/:tableName', validateRequestTableName, tryCatchMiddleware(sheetsDeleteController.sheetsDelete))
router.put('/synchronizeData/update/:tableName', validateRequestTableName, tryCatchMiddleware(sheetsUpdateController.sheetsUpdate))

export default router;