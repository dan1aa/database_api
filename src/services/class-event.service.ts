import { ClassEvent } from '@prisma/client';
import { db } from '@utils/db.server';


export const createClassEvents = async (data: ClassEvent[]) => {


    data.forEach((classEvent) => {
        classEvent.eventDate = new Date(classEvent.eventDate)
    })

    const createdClassEvents = await db.classEvent.createMany({ data });

    return createdClassEvents;
};

export const getClassEventById = async (id: number): Promise<ClassEvent | null> => {
    const classEvent: ClassEvent | null = await db.classEvent.findUnique({ where: { id } });

    return classEvent;
};

export const updateClassEventById = async (id: number, data: ClassEvent): Promise<ClassEvent> => {

    if (data.eventDate) data.eventDate = new Date(data.eventDate)

    const updatedClassEvent: ClassEvent = await db.classEvent.update({ where: { id }, data });

    return updatedClassEvent;
};

export const deleteClassEventById = async (id: number): Promise<ClassEvent> => {
    const deletedClassEvent: ClassEvent = await db.classEvent.delete({ where: { id } })

    return deletedClassEvent;
};

export const getListOfClassEvents = async (): Promise<ClassEvent[] | null> => {
    const classEventsList: ClassEvent[] | null = await db.classEvent.findMany();

    return classEventsList;
};

export const getClassEventByGoogleMeetCode = async (code: string): Promise<ClassEvent | null> => {
    const classEvent: ClassEvent | null = await db.classEvent.findFirst({
        where: {
            googleMeetLink: `https://meet.google.com/${code}`
        }
    })

    return classEvent;
}

export const getResultsByClassEventId = async (classEventId: number) => {
    const feedbackOnIntern = await db.feedbackOnIntern.findMany({
        where: {
            classEventId
        }
    })

    const feedbackOnFacilitator = await db.feedbackOnFacilitator.findMany({
        where: {
            classEventId
        }
    })

    return { feedbackOnFacilitator, feedbackOnIntern }
}