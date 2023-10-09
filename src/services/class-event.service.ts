import { Prisma } from '@prisma/client';

import { db } from '@utils/db.server';
import { BadRequestError, NotFoundError } from '@utils/exeptions/ApiErrors';
import { ClassEventCreateInput, ClassEventUpdateInput } from 'types/types';


export const createClassEvent = async (classEvent: ClassEventCreateInput) => {
    try {

        classEvent.eventDate = new Date(classEvent.eventDate)

        const result = await db.classEvent.create({ data: classEvent });
        return result;
    } catch(error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                throw new BadRequestError(`This meet already exist`);
            } else if (error.code === 'P2003') {
                if (error.meta && error.meta.field_name === 'courseId') {
                    throw new NotFoundError(`Course with id ${classEvent.courseId} dosen't exist`);
                } else {
                    throw new NotFoundError(`Class event type with id ${classEvent.classEventTypeId} dosen't exist`);
                }               
            }
        }
        throw error;
    }
};

export const getClassEventById = async (id: number) => {
    const result = await db.classEvent.findUnique({ where: { id } });

    if (!result) {
        throw new NotFoundError(`Class event with id ${id} dosen't exist`);
    }

    return result;
};

export const updateClassEventById = async (id: number, data: ClassEventUpdateInput) => {
    try {
        const result = await db.classEvent.update({ where: { id }, data: data });
        return result;
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                throw new BadRequestError(`Class event with id ${id} dosen't exist`);
            } else if (error.code === 'P2003') {
                if (error.meta && error.meta.field_name === 'courseId') {
                    throw new NotFoundError(`Course with id ${data.courseId} dosen't exist`);
                } else {
                    throw new NotFoundError(`Class event type with id ${data.classEventTypeId} dosen't exist`);
                }               
            }
        }
        throw error;
    }
};

export const deleteClassEventById = async (id: number) => {
    try {
        const result = await db.classEvent.delete({ where: { id } })
        return result;
    } catch(error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                throw new NotFoundError(`Class event with id ${id} doesn't exist`);
            }
        }
        throw error;
    }
};

export const getListOfClassEvents = async () => {
    const result = await db.classEvent.findMany();
    return result;
};