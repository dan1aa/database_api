import { db } from '@utils/db.server';

type AnyObject = { // fuck typescript I don`t have permision to use object in prisma without that type
    [key: string]: any
}

const tables: AnyObject = { // I need it in dynamic deleteRowsFromStaticTables func
    'intern': db.intern,
    'course': db.course,
    'classEvent': db.classEvent,
    'internCourse': db.internCourse
}

const deleteRequestedData = async (data: any[], tableName: string) => {
    const result = await deleteRowsFromTable(data, tableName)
    return result; 
}; 

const deleteRowsFromTable = async (data: any[], tableName: string) => {
    const targetIds = data.map(data => data.id);

    const existingIds = await tables[tableName].findMany({
        where: {
            id: {
                in: targetIds,
            },
        },
        select: {
            id: true,
        },
    });


    const existingTargetIds = targetIds.filter(id => existingIds.some((existingId: any) => existingId.id === id));

    await tables[tableName].deleteMany({
        where: {
            id: {
                in: existingTargetIds,
            },
        },
    });

    return JSON.stringify({message: "Data deleted successfully"});
}

export default deleteRequestedData;