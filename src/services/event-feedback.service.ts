import { ClassEvent, Course, EventFeedback } from "@prisma/client";

import { db } from "@utils/db.server";
import { SheetEventFeedback } from "types/types";

export const createEventFeedbacks = async (eventFeedbacks: SheetEventFeedback[]) => {
    let notFoundCourses: string[] = [];

    const promises = eventFeedbacks.map(async (eventFeedback: SheetEventFeedback) => {
        let { meetNumber, courseId, feedback } = eventFeedback;

        const course: Course | null = await db.course.findUnique({ where: { courseCipher: courseId } });

        if (course) {
            const courseSQLId: number = course.id;

            const classEvent: ClassEvent | null = await db.classEvent.findUnique({ where: { courseId_meetNumber: { courseId: courseSQLId, meetNumber } } });

            if (classEvent) {
                const classEventSQLId: number = classEvent.id;
                
                await db.eventFeedback.upsert({
                    where: { classEventId: classEventSQLId },
                    create: { feedback, classEventId: classEventSQLId },
                    update: { feedback, classEventId: classEventSQLId },
                });
            }
        } else {
            notFoundCourses.push(courseId);
        }
    });

    await Promise.all(promises);

    const coursesNotFound = notFoundCourses.length ? `Event feedbacks with these course ids: ${notFoundCourses.join(',')} were not added` : 'All good';

    return { message: "Event Feedbacks created and updated successfully!", coursesNotFound };
};


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
    const deletedEventFeedback = await db.eventFeedback.delete({ where: { id } })

    return deletedEventFeedback;
}