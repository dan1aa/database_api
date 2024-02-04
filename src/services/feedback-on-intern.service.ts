import { FeedbackOnIntern } from '@prisma/client';
import { db } from '@utils/db.server';

export const createFeedbacksOnIntern = async (feedbacksOnIntern: FeedbackOnIntern[]) => {
    for (const feedbackOnIntern of feedbacksOnIntern) {
        await db.feedbackOnIntern.upsert({
            where: {
                senderId_internId_classEventId: {
                    senderId: feedbackOnIntern.senderId,
                    internId: feedbackOnIntern.internId,
                    classEventId: feedbackOnIntern.classEventId,
                }
            },
            create: feedbackOnIntern,
            update: feedbackOnIntern
        })
    }

    return { message: 'Feedbacks on Intern created and updated successfully!' }
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