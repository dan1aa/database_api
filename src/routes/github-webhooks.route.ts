import { Router } from 'express';

import * as GithubWebhooksController from '@controllers/github-webhooks.controller';


const router = Router()

router.post(
    '/github-webhooks', 
    GithubWebhooksController.restartAppOnGithubUpdate
);