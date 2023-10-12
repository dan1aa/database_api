import axios from "axios";
import { dbObjects } from "../config/config";

export const sendDataToSheets = async (tableName: string) => {

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
}