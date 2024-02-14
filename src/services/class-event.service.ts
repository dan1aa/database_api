import { ClassEvent, EventInternBadge } from '@prisma/client';
import { db } from '@utils/db.server';


export const createClassEvents = async (classEvents: ClassEvent[]) => {

    let invalidCourseIds = []

    for (let classEvent of classEvents) {
        classEvent.eventDate = new Date(classEvent.eventDate);

        const { courseId, meetNumber, googleMeetLink, eventDate } = classEvent;

        const courseCipher: any = courseId;

        const course = await db.course.findUnique({ where: { courseCipher } });
        
        if (course) {
            const sqlCourseId = course?.id;

            await db.classEvent.upsert({
                where: {
                    courseId_meetNumber: {
                        courseId: sqlCourseId,
                        meetNumber: meetNumber
                    }
                },
                create: { courseId: sqlCourseId, meetNumber, googleMeetLink, eventDate },
                update: { courseId: sqlCourseId, meetNumber, googleMeetLink, eventDate }
            })
        } else {
            invalidCourseIds.push(courseId)
        }
    }

    const message = !invalidCourseIds.length
    ? `Class Events created and updated successfully!` 
    : `Class Events created and updated successfully! Course with course ciphers ${invalidCourseIds.join(', ')} were not added, we can't find courses with these course ciphers.`;


    return { message };
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

    const classEvent = await db.classEvent.findUnique({ where: { id: classEventId } })

    if (!classEvent) return { message: `Class event with id ${classEventId} not found` }

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

export const createEventInternBadges = async (eventInternBadges: EventInternBadge[]) => {
    await db.eventInternBadge.createMany({
        data: eventInternBadges
    })

    return { message: "EventInternBadges created successfully!" }
}