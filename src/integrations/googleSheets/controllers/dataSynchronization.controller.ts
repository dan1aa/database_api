// import axios from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

// import deleteRequestedData from '../services/dataSynchronization/deleteData.service';
// import insertRequestedData from '../services/dataSynchronization/insertData.service';



export const synchronizeData = async (req: Request, res: Response) => {
    const { tableName } = req.params;

    // const { insert: dataToInsert, delete: dataToDelete } = req.body;

    // await deleteRequestedData(tableName, dataToDelete);
    // const insertResult = await insertRequestedData(tableName, dataToInsert);

    // const convertedInsertionDataToQueryParams: string = JSON.stringify(insertResult.map((row: any) => [...Object.values(row)]))

    // const data = { table: tableName, object: convertedInsertionDataToQueryParams }

    // const url: string | undefined = process.env.GOOGLE_SHEETS_DATABASE_BASE_URL;

    // axios.post((url || ""), data, {
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    // })
    //     .then(response => {
    //         console.log('Response:', response.data);
    //     })
    //     .catch(error => {
    //         console.error('Error:', error);
    //     });

    res.status(StatusCodes.OK).send({ msg: "Data syncronized successfully!" }).end();
};

