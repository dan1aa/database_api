import { Response } from 'express';
import { db } from '@utils/db.server';
import { NotFoundError } from '@exeptions/ApiErrors';
import { insertQueries } from '../queries/insert.query'
import { formatRequestData } from '../helpers/formatRequestData';

export const deleteData = async (tableName: string, dataToInsert: any[], res: Response) => {
    res.end()
};

export const insertData = async (tableName: string, dataToInsert: any[], res: Response) => {

    try {
        const values = formatRequestData(dataToInsert)

        const result = await db.$queryRawUnsafe(`${insertQueries[tableName].insert} ${values} ${insertQueries[tableName].onUpdate}`);
        res.end("Values inserted And Updated!")
    } catch(e) {
        throw new NotFoundError();
    }

}