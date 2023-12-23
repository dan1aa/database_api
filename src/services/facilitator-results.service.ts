import { FeedbackOnIntern, Prisma } from '@prisma/client';
import { db } from '@utils/db.server';
import { NotFoundError } from '@utils/exeptions/ApiErrors';
import { FeedbackOnInternType } from 'types/types';

export const createFacilitatorResults = async (data: FeedbackOnIntern[]): Promise<FeedbackOnIntern[] | null> => {
    const createdFacilitatorResults: any = await db.feedbackOnIntern.createMany({ data })

    return createdFacilitatorResults;
}

export const getListOfFacilitatorResults = async (): Promise<FeedbackOnIntern[] | null> => {
    const facilitatorResultsList: FeedbackOnIntern[] | null = await db.feedbackOnIntern.findMany()

    return facilitatorResultsList
}

export const getFacilitatorResultById = async (id: number): Promise<FeedbackOnInternType> => {
    const facilitatorResult: FeedbackOnInternType = await db.feedbackOnIntern.findUnique({ where: { id } })

    if (!facilitatorResult) {
        throw new NotFoundError(`Facilitator result with id ${id} doesn't exist`);
    }

    return facilitatorResult;

}

export const updateFacilitatorResultById = async (id: number, data: Prisma.FeedbackOnInternUpdateInput): Promise<FeedbackOnInternType> => {
    const updatedFacilitatorResult: FeedbackOnInternType = await db.feedbackOnIntern.update({ where: { id }, data });
    
    return updatedFacilitatorResult;
} 

export const deleteFacilitatorResultById = async (id: number): Promise<FeedbackOnInternType> => {
    const deletedFacilitatorResult: FeedbackOnInternType = await db.feedbackOnIntern.delete({ where: { id } })

    return deletedFacilitatorResult;
}