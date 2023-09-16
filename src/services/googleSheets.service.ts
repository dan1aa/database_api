import { Response } from 'express';
import { db } from '@utils/db.server';
import { insertQueries } from '@queries/insert.query'
import { formatRequestData } from '@utils/formatRequestData';

export const deleteData = async (tableName: string, dataToInsert: any[], res: Response) => {
};

export const insertData = async (tableName: string, dataToInsert: any[], res: Response) => {

    const values = formatRequestData(dataToInsert)

    const result = await db.$queryRawUnsafe(`${insertQueries[tableName].insert} ${values} ${insertQueries[tableName].onUpdate}`);

}