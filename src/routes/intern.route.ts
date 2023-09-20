import { Router } from 'express';

import * as InternController from '@controllers/intern.controller';
import tryCatchMiddleware from '@middlewares/tryCatchMiddleware.middleware';

const router = Router();

/**
 * @swagger
 * /interns/{id}:
 *   get:
 *     summary: Get an intern by ID
 *     tags: [Interns]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the intern
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Intern not found
 */

router.get('/interns', tryCatchMiddleware(InternController.filterInterns));
router.get('/interns/:id', tryCatchMiddleware(InternController.getInternById));


export default router;