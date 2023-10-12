import { Request, Response } from "express"
import deleteRequestedData from "../services/deleteData.service";

export const sheetsDelete = async (req: Request, res: Response) => {
    const { tableName } = req.params;
    const { delete: dataToDelete } = req.body;

    const result = await deleteRequestedData(dataToDelete, tableName)
    res.end(result)
    
}