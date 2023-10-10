import { createClassEvent } from '@services/class-event.service';
import { createCourse } from '@services/course.service';
import { createIntern, createInternCourse } from '@services/intern.service'
import { db } from '@utils/db.server';
import axios from 'axios'

type createFunctionsType = { // typescript i love you
    [key: string]: any
}

const dbObjects: createFunctionsType = {
    'intern': {
        db: db.intern,
        create: createIntern
    },
    'course': {
        db: db.course,
        create: createCourse
    },
    'internCourse': {
        db: db.internCourse,
        create: createInternCourse
    },
    'classEvent': {
        db: db.classEvent,
        create: createClassEvent
    }
}

export const createNewRows = async (dataToCreate: any, tableName: string): Promise<string> => {
    for (let row of dataToCreate) {
        try {
            await dbObjects[tableName].create(row)
        } catch(error) {
            console.log(error) // I can`t put some kind of custom error here with throw new Error(...) because it disables contrinue;
            continue;
        }
    }

    const rows = await dbObjects[tableName].db.findMany({})

    const convertedInsertionDataToQueryParams: any = rows.map((row: any) => [...Object.values(row)])

    const data = { table: tableName.charAt(0).toUpperCase() + tableName.slice(1), object: convertedInsertionDataToQueryParams }
    const url: string | undefined = process.env.GOOGLE_SHEETS_DATABASE_BASE_URL;

    axios.post((url || ""), data, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            console.log('Response:', response.data);
        })
        .catch(error => {
            console.error('Error:', error);
        });

    return JSON.stringify({ message: "Data created successfully" })
}