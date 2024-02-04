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

    for (const feedbackOnFacilitator of feedbacksOnFacilitator) {
        await db.feedbackOnFacilitator.upsert({
            where: {
                senderId_internId_classEventId: {
                    senderId: feedbackOnFacilitator.senderId,
                    internId: feedbackOnFacilitator.internId,
                    classEventId: feedbackOnFacilitator.classEventId
                }
            },
            create: feedbackOnFacilitator,
            update: feedbackOnFacilitator
        })
    }

    return { message: "Feedbacks on Facilitator created and updated successfully!" }
}

export const updateFeedbackOnFacilitatorById = async (id: number, feedbacksOnFacilitator: FeedbackOnFacilitator): Promise<FeedbackOnFacilitator> => {
    const updatedFeedbackOnFacilitator: FeedbackOnFacilitator = await db.feedbackOnFacilitator.update({ where: { id }, data: feedbacksOnFacilitator })

    return updatedFeedbackOnFacilitator;
}

export const deleteFeedbackOnFacilitatorById = async (id: number): Promise<FeedbackOnFacilitator> => {
    const deletedFeedbackOnFacilitator: FeedbackOnFacilitator = await db.feedbackOnFacilitator.delete({ where: { id } })

    return deletedFeedbackOnFacilitator;
}