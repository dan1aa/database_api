import { FeedbackOnFacilitator } from "@prisma/client"
import { db } from "@utils/db.server"
import { NotFoundError } from "@utils/exeptions/ApiErrors";


export const getListOfFeedbacksOnFacilitator = async (): Promise<FeedbackOnFacilitator[] | null> => {
    const feedbacksOnFacilitatorList: FeedbackOnFacilitator[] | null = await db.feedbackOnFacilitator.findMany({})

    return feedbacksOnFacilitatorList;
}

export const getFeedbackOnFacilitatorById = async (id: number): Promise<FeedbackOnFacilitator> => {
    const feedbackOnFacilitator: FeedbackOnFacilitator | null = await db.feedbackOnFacilitator.findUnique({where: { id }})

    if (!feedbackOnFacilitator) {
        throw new NotFoundError(`Feedback on Facilitator with id ${id} doesn't exist`);
    }

    return feedbackOnFacilitator;
}

export const createFeedbacksOnFacilitator = async (feedbackOnFacilitator: FeedbackOnFacilitator[]): Promise<any> => {
    const createdFeedbackOnFacilitator: any = await db.feedbackOnFacilitator.createMany({ data: feedbackOnFacilitator })

    return createdFeedbackOnFacilitator;
}

export const updateFeedbackOnFacilitatorById = async (id: number, feedbacksOnFacilitator: FeedbackOnFacilitator): Promise<FeedbackOnFacilitator> => {
    const updatedFeedbackOnFacilitator: FeedbackOnFacilitator = await db.feedbackOnFacilitator.update({where: { id }, data: feedbacksOnFacilitator}) 

    return updatedFeedbackOnFacilitator;
}

export const deleteFeedbackOnFacilitatorById = async (id: number): Promise<FeedbackOnFacilitator> => {
    const deletedFeedbackOnFacilitator: FeedbackOnFacilitator = await db.feedbackOnFacilitator.delete({where: { id }})

    return deletedFeedbackOnFacilitator;
}