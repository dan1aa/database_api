import { exec } from "child_process";
import { Response } from "express";

export const restartAppOnGithubUpdate = async (res: Response) => {
    exec('git stash', (err, stdout, stderr) => {
        if (err) {
          return JSON.stringify(err)
        }

        exec('pm2 stop index', (err, stdout, stderr) => {
            if (err) {
              return JSON.stringify(err)
            }
        
            exec('pm2 delete index', (err, stdout, stderr) => {
              if (err) {
                return JSON.stringify(err)
              }

              exec('cd database_middleware/ && git pull origin master', (err, stdout, stderr) => {
                if (err) {
                  return JSON.stringify(err)
                }

                exec('npm run start:dev', (err, stdout, stderr) => {
                  if (err) {
                    return JSON.stringify(err)
                  }

                  exec('pm2 start ./dist/index.js --watch', (err, stdout, stderr) => {
                    if (err) {
                      return JSON.stringify(err)
                    }
  
    
                  });
  
                });

              });
        

            });
          });
  
      });
}