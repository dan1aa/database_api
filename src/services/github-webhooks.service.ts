import { exec } from "child_process";
import { Response, Request } from "express";

export const restartAppOnGithubUpdate = async (res: Response) => {
    exec('git stash', (err, stdout, stderr) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Error restarting app' });
        }

        exec('git pull origin master', (err, stdout, stderr) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ error: 'Error updating repository' });
            }
        
            exec('pm2 restart api', (err, stdout, stderr) => {
              if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Error restarting app' });
              }
        
              return res.status(200).json({ success: true });
            });
          });
  
        return res.status(200).json({ success: true });
      });
}