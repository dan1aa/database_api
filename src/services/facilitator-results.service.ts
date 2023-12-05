import { FacilitatorResult, Prisma } from '@prisma/client';
import { db } from '@utils/db.server';
import { NotFoundError } from '@utils/exeptions/ApiErrors';
import { FacilitatorResultType } from 'types/types';

export const createFacilitatorResults = async (data: FacilitatorResult[]): Promise<FacilitatorResult[] | null> => {
    const createdFacilitatorResults: any = await db.facilitatorResult.createMany({ data })

    return createdFacilitatorResults;
}

export const getListOfFacilitatorResults = async (): Promise<FacilitatorResult[] | null> => {
    const facilitatorResultsList: FacilitatorResult[] | null = await db.facilitatorResult.findMany()

    return facilitatorResultsList
}

export const getFacilitatorResultById = async (id: number): Promise<FacilitatorResultType> => {
    const facilitatorResult: FacilitatorResultType = await db.facilitatorResult.findUnique({ where: { id } })

    if (!facilitatorResult) {
        throw new NotFoundError(`Facilitator result with id ${id} doesn't exist`);
    }

    return facilitatorResult;

}

export const updateFacilitatorResultById = async (id: number, data: Prisma.FacilitatorResultUpdateInput): Promise<FacilitatorResultType> => {
    const updatedFacilitatorResult: FacilitatorResultType = await db.facilitatorResult.update({ where: { id }, data });
    
    return updatedFacilitatorResult;
} 

export const deleteFacilitatorResultById = async (id: number): Promise<FacilitatorResultType> => {
    const deletedFacilitatorResult: FacilitatorResultType = await db.facilitatorResult.delete({ where: { id } })

    return deletedFacilitatorResult;
}