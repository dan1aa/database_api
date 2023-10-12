import { dbObjects } from './config/config'
import { sendDataToSheets } from './helpers/sendDataToSheets'

export const createNewRows = async (dataToCreate: any, tableName: string): Promise<string> => {

    const errorStack = []

    for (let row of dataToCreate) {
        try {
            await dbObjects[tableName].create(row)
        } catch(error: any) {
            errorStack.push({error})
            continue;
        }
    }

    await sendDataToSheets(tableName)

    return JSON.stringify({ message: "Data created successfully", errorStack })
}