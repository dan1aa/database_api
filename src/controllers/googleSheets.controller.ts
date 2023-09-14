import { Request, Response } from 'express';
import * as GoogleSheetsService from '../services/googleSheets.service';

export const updateData = async (req: Request, res: Response) => {

    const { tableName } = req.params;
    const dataToInsert: any[] = req.body.add;

    await GoogleSheetsService.deleteData(tableName, dataToInsert, res)
    await GoogleSheetsService.insertData(tableName, dataToInsert, res)
    // GoogleSheetsService.updateData()
    //TODO: implement this function: 
    // depends on values in request data invoke appropriate function from service
};