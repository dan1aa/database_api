import { exec } from "child_process";
import { Response } from "express";

export const restartAppOnGithubUpdate = async (res: Response) => {
  exec('git stash', (err, stdout, stderr) => {
    if (err) {
      return JSON.stringify(err)
    }
    exec('cd database_api/ && git pull origin master', (err, stdout, stderr) => {
      if (err) {
        return JSON.stringify(err)
      }

      exec('tsc', (err, stdout, stderr) => {

        exec('pm2 restart index', (err, stdout, stderr) => {
          if (err) {
            return JSON.stringify(err)
          }

        });

      });

    });


  });
}