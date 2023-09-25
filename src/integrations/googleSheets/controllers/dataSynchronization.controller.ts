import axios from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import deleteRequestedData from '../services/dataSynchronization/deleteData.service';
import insertRequestedData from '../services/dataSynchronization/insertData.service';


export const synchronizeData = async (req: Request, res: Response) => {
    const { tableName } = req.params;

    const { insert: dataToInsert, delete: dataToDelete } = req.body;

    await deleteRequestedData(tableName, dataToDelete);
    const insertResult = await insertRequestedData(tableName, dataToInsert);

    const convertedInsertionDataToQueryParams = JSON.stringify(insertResult.map(row => [...Object.values(row)]))
    const baseUrlToNotifyGoogleSheetsAboutSyccesfullyInsertion = `
        ${process.env.GOOGLE_SHEETS_DATABASE_BASE_URL}table=${tableName}&object=${convertedInsertionDataToQueryParams}
    `;

    await axios.get(baseUrlToNotifyGoogleSheetsAboutSyccesfullyInsertion);

    res.status(StatusCodes.OK).send({ msg: 'Data was succesfully synchronized' }).end();
};

