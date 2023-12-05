import axios from 'axios';
import { Prisma } from '@prisma/client';

type TReplicationDataTag = 'Intern'; 


const replicateData = async(tag: TReplicationDataTag, data: Prisma.InternCreateInput) => {
    try {
        if (!process.env.GOOGLE_SHEETS_DATABASE_BASE_URL) {
            throw new Error('GOOGLE_SHEETS_DATABASE_BASE_URL is not defined in the environment.');
        }
    
        await axios.post(process.env.GOOGLE_SHEETS_DATABASE_BASE_URL, {
            tag,
            data
        });
    } catch(error) {
        throw new Error(`Error replicating data to Google Sheets:\n ${error}`);
    }
};


export default replicateData;