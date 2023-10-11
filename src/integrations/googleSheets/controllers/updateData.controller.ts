import { Request, Response } from "express"
import { updateRows } from "../services/dataSynchronization/updateData.service";

export const sheetsUpdate = async (req: Request, res: Response) => {
    const { tableName } = req.params;
    const { update: dataToUpdate } = req.body;

    const result = await updateRows(dataToUpdate, tableName)
    res.end(result)
    
}