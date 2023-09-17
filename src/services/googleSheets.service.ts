import { Response } from 'express';
import { db } from '@utils/db.server';
import { insertQueries } from '@queries/insert.query'
import { formatRequestDataForCourseAndIntern } from '@utils/formatRequestData';

export const deleteData = async (tableName: string, dataToInsert: any[], res: Response) => {
};

export const insertData = async (tableName: string, dataToInsert: any[], res: Response) => {

    if(tableName == 'intern' || tableName == 'course') {
        const values = formatRequestDataForCourseAndIntern(dataToInsert)
        const result = await db.$queryRawUnsafe(`${insertQueries[tableName].insert} ${values} ${insertQueries[tableName].onUpdate}`);
    }

    res.end()
}