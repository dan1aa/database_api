import { FeedbackOnFacilitator } from "@prisma/client"
import { db } from "@utils/db.server"
import { NotFoundError } from "@utils/exeptions/ApiErrors";


export const getListOfFeedbacksOnFacilitator = async (): Promise<FeedbackOnFacilitator[] | null> => {
    const feedbacksOnFacilitatorList: FeedbackOnFacilitator[] | null = await db.feedbackOnFacilitator.findMany({})

    return feedbacksOnFacilitatorList;
}

export const getFeedbackOnFacilitatorById = async (id: number): Promise<FeedbackOnFacilitator | null> => {
    const feedbackOnFacilitator: FeedbackOnFacilitator | null = await db.feedbackOnFacilitator.findUnique({ where: { id } })

    return feedbackOnFacilitator;
}

export const createFeedbacksOnFacilitator = async (feedbacksOnFacilitator: FeedbackOnFacilitator[]): Promise<any> => {

    if (!feedbacksOnFacilitator) return;

    const createdFeedbacksOnFacilitator: any = await db.feedbackOnFacilitator.createMany({ data: feedbacksOnFacilitator })

    return createdFeedbacksOnFacilitator;
}

export const updateFeedbackOnFacilitatorById = async (id: number, feedbacksOnFacilitator: FeedbackOnFacilitator): Promise<FeedbackOnFacilitator> => {
    const updatedFeedbackOnFacilitator: FeedbackOnFacilitator = await db.feedbackOnFacilitator.update({ where: { id }, data: feedbacksOnFacilitator })

    return updatedFeedbackOnFacilitator;
}

export const deleteFeedbackOnFacilitatorById = async (id: number): Promise<FeedbackOnFacilitator> => {
    const deletedFeedbackOnFacilitator: FeedbackOnFacilitator = await db.feedbackOnFacilitator.delete({ where: { id } })

    return deletedFeedbackOnFacilitator;
}