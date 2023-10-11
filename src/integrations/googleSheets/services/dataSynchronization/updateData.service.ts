import { bulkUpdateClassEvent, bulkUpdateCourse, bulkUpdateIntern, bulkUpdateInternCourse } from './bulkUpdate.service';

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
    for (let row of dataToUpdate) {
        try {
            updateFunctions[tableName](row)
        } catch(error) {
            console.log(error)
            continue;
        }
    }

    return JSON.stringify({ message: "Data updated successfully" })
}