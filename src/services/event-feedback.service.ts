import { EventFeedback } from "@prisma/client";

import { db } from "@utils/db.server";

export const createEventFeedbacks = async (eventFeedbacks: EventFeedback[]) => {
    for (const eventFeedback of eventFeedbacks) {
        await db.eventFeedback.upsert({
            where: {
                classEventId: eventFeedback.classEventId
            },
            create: eventFeedback,
            update: eventFeedback
        })
    }

    return { message: "Event Feedbacks created and updated successfully!" }
}

export const getListOfEventFeedbacks = async (): Promise<EventFeedback[] | null> => {
    const eventFeedbacks: EventFeedback[] = await db.eventFeedback.findMany({});

    return eventFeedbacks
}

export const getEventFeedbackById = async (id: number): Promise<EventFeedback | null> => {
    const eventFeedback: EventFeedback | null = await db.eventFeedback.findUnique({
        where: { id }
    })

    return eventFeedback;
}

export const updateEventFeedbackById = async (id: number, eventFeedback: EventFeedback): Promise<EventFeedback> => {
    const updatedEventFeedback = await db.eventFeedback.update({
        where: { id },
        data: eventFeedback
    })

    return updatedEventFeedback
}

export const deleteEventFeedbackById = async (id: number): Promise<EventFeedback> => {
    const deletedEventFeedback = await db.eventFeedback.delete({where: { id }})

    return deletedEventFeedback;
}