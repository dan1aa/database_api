import { Request, Response } from "express";
import * as FacilitatorResultService from '@services/facilitator-results.service';
import { StatusCodes } from "http-status-codes";
import { FacilitatorResult } from "@prisma/client";

export const createFacilitatorResults = async (req: Request, res: Response) => {
    const { data } = req.body;

    const createdFacilitatorResult: FacilitatorResult[] | null = await FacilitatorResultService.createFacilitatorResults(data)

    res.status(StatusCodes.CREATED).json(createdFacilitatorResult).end()
}

export const getListOfFacilitatorResults = async (req: Request, res: Response) => {
    const facilitatorResultsList: FacilitatorResult[] | null = await FacilitatorResultService.getListOfFacilitatorResults();

    res.status(StatusCodes.OK).json(facilitatorResultsList).end()
}

export const getFacilitatorResultById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const facilitatorResult: FacilitatorResult | null = await FacilitatorResultService.getFacilitatorResultById(+id);

    res.status(StatusCodes.OK).json(facilitatorResult).end();
}

export const updateFacilitatorResultById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;

    const updatedFacilitatorResult: FacilitatorResult | null = await FacilitatorResultService.updateFacilitatorResultById(+id, data);

    res.status(StatusCodes.OK).json(updatedFacilitatorResult).end();
}

export const deleteFacilitatorResultById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const deletedFacilitatorResult: FacilitatorResult | null = await FacilitatorResultService.deleteFacilitatorResultById(+id)

    res.status(StatusCodes.OK).json(deletedFacilitatorResult).end()
}