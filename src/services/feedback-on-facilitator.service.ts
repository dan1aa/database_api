import { Course, FeedbackOnFacilitator, Intern } from "@prisma/client"
import { db } from "@utils/db.server"
import { SheetFeedbackOnFacilitator } from "types/types";

export const createFeedbacksOnFacilitator = async (feedbacksOnFacilitator: SheetFeedbackOnFacilitator[]): Promise<any> => {

    let invalidFeedbacksOnFacilitator: string[] = []

    const promises = feedbacksOnFacilitator.map(async (feedbackOnFacilitator: SheetFeedbackOnFacilitator) => {
        let { courseId, meetNumber, senderId, internId, ...rest } = feedbackOnFacilitator;

        const sender: Intern | null = await db.intern.findUnique({ where: { explorerId: senderId } })
        const receiver: Intern | null = await db.intern.findUnique({ where: { explorerId: internId } })

        if (sender && receiver) {

            const course: Course | null = await db.course.findUnique({ where: { courseCipher: courseId } })

            if (course) {
                const courseSQLId: number = course.id;

                const classEvent = await db.classEvent.findUnique({
                    where: {
                        courseId_meetNumber: { courseId: courseSQLId, meetNumber }
                    }
                })

                if (classEvent) {
                    const senderId: number = sender.id;
                    const internId: number = receiver.id;
                    const classEventId: number = classEvent.id;

                    await db.feedbackOnFacilitator.upsert({
                        where: {
                            senderId_internId_classEventId: { senderId, internId, classEventId }
                        },
                        create: { ...rest, senderId, internId, classEventId },
                        update: { ...rest, senderId, internId, classEventId },
                    })
                }
            }
        } else {
            invalidFeedbacksOnFacilitator.push(`(senderId: ${senderId}, internId: ${internId}, courseId: ${courseId}, meetNumber: ${meetNumber})`)
        }
    })

    await Promise.all(promises)

    let notAddedFeedbacksOnFacilitator: string = invalidFeedbacksOnFacilitator.length ? `Feedbacks on Facilitator with these ids were not added: ${invalidFeedbacksOnFacilitator.join(',')}` : 'All good';

    return { message: "Feedbacks on Facilitator created and updated successfully!", notAddedFeedbacksOnFacilitator }
}

export const getListOfFeedbacksOnFacilitator = async (): Promise<FeedbackOnFacilitator[] | null> => {
    const feedbacksOnFacilitatorList: FeedbackOnFacilitator[] | null = await db.feedbackOnFacilitator.findMany({})

    return feedbacksOnFacilitatorList;
}

export const getFeedbackOnFacilitatorById = async (id: number): Promise<FeedbackOnFacilitator | null> => {
    const feedbackOnFacilitator: FeedbackOnFacilitator | null = await db.feedbackOnFacilitator.findUnique({ where: { id } })

    return feedbackOnFacilitator;
}

export const updateFeedbackOnFacilitatorById = async (id: number, feedbacksOnFacilitator: FeedbackOnFacilitator): Promise<FeedbackOnFacilitator> => {
    const updatedFeedbackOnFacilitator: FeedbackOnFacilitator = await db.feedbackOnFacilitator.update({ where: { id }, data: feedbacksOnFacilitator })

    return updatedFeedbackOnFacilitator;
}

export const deleteFeedbackOnFacilitatorById = async (id: number): Promise<FeedbackOnFacilitator> => {
    const deletedFeedbackOnFacilitator: FeedbackOnFacilitator = await db.feedbackOnFacilitator.delete({ where: { id } })

    return deletedFeedbackOnFacilitator;
}