import { ClassEvent, Course, FeedbackOnIntern, Intern } from '@prisma/client';
import { db } from '@utils/db.server';
import { SheetFeedbackOnIntern } from 'types/types';

export const createFeedbacksOnIntern = async (feedbacksOnIntern: SheetFeedbackOnIntern[]) => {
    let invalidFeedbacksOnIntern: string[] = [];

    const promises = feedbacksOnIntern.map(async (feedbackOnIntern: SheetFeedbackOnIntern) => {
        const { courseId, meetNumber, internId, senderId, ...rest } = feedbackOnIntern;

        const sender: Intern | null = await db.intern.findUnique({ where: { explorerId: senderId } })
        const receiver: Intern | null = await db.intern.findUnique({ where: { explorerId: internId } })

        if (sender && receiver) {
            const course: Course | null = await db.course.findUnique({ where: {
                courseCipher: courseId
            } })

            if (course) {
                const senderId: number = sender.id;
                const internId: number = receiver.id;
                const courseSQLId: number = course.id;

                const classEvent: ClassEvent | null = await db.classEvent.findUnique({
                    where: {
                        courseId_meetNumber: {
                            courseId: courseSQLId,
                            meetNumber
                        }
                    }
                })

                if (classEvent) {

                    const classEventId: number = classEvent.id;

                    await db.feedbackOnIntern.upsert({
                        where: {
                            senderId_internId_classEventId: {
                                senderId, internId, classEventId
                            }
                        },
                        create: { ...rest, internId, senderId, classEventId },
                        update: { ...rest, internId, senderId, classEventId },
                    })
                }

            }
        } else {
            invalidFeedbacksOnIntern.push(`(senderId: ${senderId}, internId: ${internId}, courseId: ${courseId}, meetNumber: ${meetNumber})`)
        }
    })

    await Promise.all(promises)

    let notAddedFeedbacksOnIntern: string = invalidFeedbacksOnIntern.length ? `Feedbacks on Intern with these ids were not added: ${invalidFeedbacksOnIntern.join(',')}` : 'All good';

    return { message: "Feedbacks on Intern were created and updated successfully!", notAddedFeedbacksOnIntern }


}

export const getListOfFeedbacksOnIntern = async (): Promise<FeedbackOnIntern[] | null> => {
    const feedbacksOnInternList: FeedbackOnIntern[] | null = await db.feedbackOnIntern.findMany()

    return feedbacksOnInternList
}

export const getFeedbackOnInternById = async (id: number): Promise<FeedbackOnIntern | null> => {
    const feedbackOnIntern: FeedbackOnIntern | null = await db.feedbackOnIntern.findUnique({ where: { id } })

    return feedbackOnIntern;

}

export const updateFeedbackOnInternById = async (id: number, data: FeedbackOnIntern): Promise<FeedbackOnIntern> => {
    const updatedFeedbackOnIntern: FeedbackOnIntern = await db.feedbackOnIntern.update({ where: { id }, data });

    return updatedFeedbackOnIntern;
}

export const deleteFeedbackOnInternById = async (id: number): Promise<FeedbackOnIntern> => {
    const deletedFeedbackOnIntern: FeedbackOnIntern = await db.feedbackOnIntern.delete({ where: { id } })

    return deletedFeedbackOnIntern;
}