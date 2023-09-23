import { Router } from 'express';

import DataSynchronizationRouter from './routes/dataSynchronization.route';

const router = Router();

//Here can be other routes related to google sheets
router.use('/google-sheets', DataSynchronizationRouter);

export default router;
