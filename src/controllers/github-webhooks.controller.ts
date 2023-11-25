import { Response, Request } from 'express';

import * as GithubWebhooksService from '@services/github-webhooks.service';

export const restartAppOnGithubUpdate = async (res: Response) => {
    
    await GithubWebhooksService.restartAppOnGithubUpdate(res)
    
}