import { dbObjects } from './config/config';
import { sendDataToSheets } from './helpers/sendDataToSheets';

const deleteRequestedData = async (data: any[], tableName: string) => {
    const result = await deleteRowsFromTable(data, tableName)
    await sendDataToSheets(tableName)
    return result; 
}; 

const deleteRowsFromTable = async (data: any[], tableName: string) => {
    const targetIds = data.map(data => data.id);

    const existingIds = await dbObjects[tableName].db.findMany({
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

    await dbObjects[tableName].db.deleteMany({
        where: {
            id: {
                in: existingTargetIds,
            },
        },
    });

    return JSON.stringify({message: "Data deleted successfully"});
}

export default deleteRequestedData;