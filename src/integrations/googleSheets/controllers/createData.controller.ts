import { Request, Response } from "express"
import { createNewRows } from '../services/createData.service';

export const sheetsCreate = async (req: Request, res: Response) => {
    const { tableName } = req.params;
    const { create: dataToCreate } = req.body;

    const result = await createNewRows(dataToCreate, tableName)
    res.end(result)
    
}