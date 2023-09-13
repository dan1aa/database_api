import { Request, Response } from 'express';
import * as GoogleSheetsService from '../services/googleSheets.service';

export const updateData = async (req: Request, res: Response) => {

    // GoogleSheetsService.updateData()

    // GoogleSheetsService.insertData()
    // GoogleSheetsService.deleteData()
    //TODO: implement this function: 
    // depends on values in request data invoke appropriate function from service
    const event = {
        meet_num: 2,
        event_date: "2",
        course_id: "iwd"
    }
};