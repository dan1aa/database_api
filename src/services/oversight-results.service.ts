import { FeedbackOnFacilitator, Prisma } from "@prisma/client"
import { db } from "@utils/db.server"
import { NotFoundError } from "@utils/exeptions/ApiErrors";
import { FeedbackOnFacilitatorType } from "types/types";


export const getListOfOversightResults = async (): Promise<FeedbackOnFacilitatorType[] | null> => {
    const oversightResultsList: FeedbackOnFacilitatorType[] | null = await db.feedbackOnFacilitator.findMany({})

    return oversightResultsList;
}

export const getOfOversightResultById = async (id: number): Promise<FeedbackOnFacilitatorType> => {
    const oversightResult: FeedbackOnFacilitatorType = await db.feedbackOnFacilitator.findUnique({where: { id }})

    if (!oversightResult) {
        throw new NotFoundError(`Oversight result with id ${id} doesn't exist`);
    }

    return oversightResult;
}

export const createOversightResults = async (oversightResults: FeedbackOnFacilitator[]): Promise<any> => {
    const createdOversightResults: any = await db.feedbackOnFacilitator.createMany({ data: oversightResults })

    return createdOversightResults;
}

export const updateOversightResultById = async (id: number, oversightResult: Prisma.FeedbackOnFacilitatorUpdateInput): Promise<FeedbackOnFacilitatorType> => {
    const updatedOversightResult: FeedbackOnFacilitatorType = await db.feedbackOnFacilitator.update({where: { id }, data: oversightResult}) 

    return updatedOversightResult;
}

export const deleteOversightResultById = async (id: number): Promise<FeedbackOnFacilitatorType> => {
    const deletedOversightResult: FeedbackOnFacilitatorType = await db.feedbackOnFacilitator.delete({where: { id }})

    return deletedOversightResult;
}