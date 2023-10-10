import { updateClassEventById } from '@services/class-event.service';
import { updateCourseById } from '@services/course.service';
import { updateInternById } from '@services/intern.service'

type createFunctionsType = { // typescript i love you
    [key: string]: any
}

const updateFunctions: createFunctionsType = {
    'intern': updateInternById,
    'course': updateCourseById,
    'classEvent': updateClassEventById
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