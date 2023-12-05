import { OversightResult, Prisma } from "@prisma/client"
import { db } from "@utils/db.server"
import { NotFoundError } from "@utils/exeptions/ApiErrors";


export const getListOfOversightResults = async (): Promise<OversightResult[] | null> => {
    const oversightResultsList: OversightResult[] | null = await db.oversightResult.findMany({})

    return oversightResultsList;
}

export const getOfOversightResultById = async (id: number): Promise<OversightResult | null> => {
    const oversightResult: OversightResult | null = await db.oversightResult.findUnique({where: { id }})

    if (!oversightResult) {
        throw new NotFoundError(`Oversight result with id ${id} doesn't exist`);
    }

    return oversightResult;
}

export const createOversightResults = async (oversightResults: OversightResult[]): Promise<any> => {
    const createdOversightResults: any = await db.oversightResult.createMany({ data: oversightResults })

    return createdOversightResults;
}

export const updateOversightResultById = async (id: number, oversightResult: Prisma.OversightResultUpdateInput): Promise<OversightResult | null> => {
    const updatedOversightResult: OversightResult | null = await db.oversightResult.update({where: { id }, data: oversightResult}) 

    return updatedOversightResult;
}

export const deleteOversightResultById = async (id: number): Promise<OversightResult | null> => {
    const deletedOversightResult: OversightResult | null = await db.oversightResult.delete({where: { id }})

    return deletedOversightResult;
}