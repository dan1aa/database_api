import { Request, Response } from 'express';
import * as GoogleSheetsService from '@services/googleSheets.service';

export const updateData = async (req: Request, res: Response) => {

    const { tableName } = req.params;
    const dataToInsert: any[] = req.body.insert;
    const dataToDelete: any[] = req.body.delete;

    await GoogleSheetsService.deleteData(tableName, dataToDelete, res)
    await GoogleSheetsService.insertData(tableName, dataToInsert, res)
};