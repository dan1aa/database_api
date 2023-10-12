import { bulkUpdateClassEvent, bulkUpdateCourse, bulkUpdateIntern, bulkUpdateInternCourse } from './bulkUpdate.service';
import { dbObjects } from './config/config';
import { sendDataToSheets } from './helpers/sendDataToSheets';

type createFunctionsType = { // typescript i love you
    [key: string]: any
}

const updateFunctions: createFunctionsType = {
    'intern': bulkUpdateIntern,
    'course': bulkUpdateCourse,
    'classEvent': bulkUpdateClassEvent,
    'internCourse': bulkUpdateInternCourse
}

export const updateRows = async (dataToUpdate: any, tableName: string): Promise<string> => {

    const errorStack = []

    for (let row of dataToUpdate) {
        try {
            const error = await updateFunctions[tableName](row); 
            if (error) errorStack.push({error})
        } catch (error) {
            continue;
        }
    }
    await sendDataToSheets(tableName);
    return JSON.stringify({ message: "Data updated successfully", errorStack })
}