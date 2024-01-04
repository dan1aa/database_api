import { FeedbackOnIntern } from '@prisma/client';
import { db } from '@utils/db.server';
import { NotFoundError } from '@utils/exeptions/ApiErrors';

export const createFeedbacksOnIntern = async (data: FeedbackOnIntern[]) => {

    const createdFeedbacksOnIntern: any = await db.feedbackOnIntern.createMany({ data })

    return createdFeedbacksOnIntern;
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