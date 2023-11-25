import { exec } from "child_process";
import { Response, Request } from "express";

export const restartAppOnGithubUpdate = async (res: Response) => {
    exec('git stash', (err, stdout, stderr) => {
        if (err) {
          return JSON.stringify(err)
        }

        exec('git pull origin master', (err, stdout, stderr) => {
            if (err) {
              return JSON.stringify(err)
            }
        
            exec('pm2 restart api', (err, stdout, stderr) => {
              if (err) {
                return JSON.stringify(err)
              }
        
            });
          });
  
      });
}