import { createClassEvent } from '@services/class-event.service';
import { createCourse } from '@services/course.service';
import { createIntern, createInternCourse } from '@services/intern.service'

type createFunctionsType = { // typescript i love you
    [key: string]: any
}

const createFunctions: createFunctionsType = {
    'intern': createIntern,
    'course': createCourse,
    'internCourse': createInternCourse,
    'classEvent': createClassEvent
}

export const createNewRows = async (dataToCreate: any, tableName: string): Promise<string> => {
    for (let row of dataToCreate) {
        try {
            createFunctions[tableName](row)
        } catch(error) {
            console.log(error) // I can`t put some kind of custom error here with throw new Error(...) because it disables contrinue;
            continue;
        }
    }

    return JSON.stringify({ message: "Data created successfully" })
}