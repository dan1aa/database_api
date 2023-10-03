import { Prisma } from '@prisma/client';

import { db } from '@utils/db.server';
import { BadRequestError, NotFoundError } from '@utils/exeptions/ApiErrors';

interface ClassEventCreateInput {
    meetNumber: number;
    eventDate: Date;
    googleMeetLink: string;
    courseId: number;
    classEventTypeId: number;
};

interface ClassEventUpdateInput {
    meetNumber?: number;
    eventDate?: Date;
    googleMeetLink?: string;
    courseId?: number;
    classEventTypeId?: number;
};

export const createClassEvent = async (classEventData: ClassEventCreateInput) => {
    try {
        const createdClassevent = await db.classEvent.create({ data: classEventData });
        return  createdClassevent;
    } catch(error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                throw new BadRequestError(`This meet already exist`);
            } else if (error.code === 'P2003') {
                if (error.meta && error.meta.field_name === 'courseId') {
                    throw new NotFoundError(`Course with id ${classEventData.courseId} dosen't exist`);
                } else {
                    throw new NotFoundError(`Class event type with id ${classEventData.classEventTypeId} dosen't exist`);
                }               
            }
        }
        throw error;
    }
};

export const getClassEventById = async (id: number) => {
    const findingResult = await db.classEvent.findUnique({ where: { id } });

    if (!findingResult) {
        throw new NotFoundError(`Class event with id ${id} dosen't exist`);
    }

    return findingResult;
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