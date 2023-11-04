import { db } from '@utils/db.server';
import { NotFoundError } from '@utils/exeptions/ApiErrors';
import { ClassEventCreateInput, ClassEventUpdateInput } from 'types/types';


export const createClassEvent = async (classEvent: ClassEventCreateInput) => {
    classEvent.eventDate = new Date(classEvent.eventDate);

    const result = await db.classEvent.create({ data: classEvent });

    return result;
};

export const getClassEventById = async (id: number) => {
    const result = await db.classEvent.findUnique({ where: { id } });

    if (!result) {
        throw new NotFoundError(`Class event with id ${id} dosen't exist`);
    }

    return result;
};

export const updateClassEventById = async (id: number, data: ClassEventUpdateInput) => {
    const result = await db.classEvent.update({ where: { id }, data: data });
    return result;
};

export const deleteClassEventById = async (id: number) => {
    const result = await db.classEvent.delete({ where: { id } })
    return result;
};

export const getListOfClassEvents = async () => {
    const result = await db.classEvent.findMany();
    return result;
};