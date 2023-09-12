import { db } from '../utils/db.server';

export const getInternById = async (id: number) => {
    return db.intern.findUnique({
        where: {
            id,
        },
    });
};

