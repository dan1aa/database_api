import { Request, Response } from "express";
import * as FacilitatorResultService from '@services/facilitator-results.service';
import { StatusCodes } from "http-status-codes";
import { FeedbackOnIntern } from "@prisma/client";
import { FeedbackOnInternType } from "types/types";

export const createFacilitatorResults = async (req: Request, res: Response) => {
    const { data } = req.body;

    const createdFacilitatorResult: FeedbackOnIntern[] | null = await FacilitatorResultService.createFacilitatorResults(data)

    res.status(StatusCodes.CREATED).json(createdFacilitatorResult).end()
}

export const getListOfFacilitatorResults = async (req: Request, res: Response) => {
    const facilitatorResultsList: FeedbackOnIntern[] | null = await FacilitatorResultService.getListOfFacilitatorResults();

    res.status(StatusCodes.OK).json(facilitatorResultsList).end()
}

export const getFacilitatorResultById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const facilitatorResult: FeedbackOnInternType = await FacilitatorResultService.getFacilitatorResultById(+id);

    res.status(StatusCodes.OK).json(facilitatorResult).end();
}

export const updateFacilitatorResultById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;

    const updatedFacilitatorResult: FeedbackOnInternType = await FacilitatorResultService.updateFacilitatorResultById(+id, data);

    res.status(StatusCodes.OK).json(updatedFacilitatorResult).end();
}

export const deleteFacilitatorResultById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const deletedFacilitatorResult: FeedbackOnInternType = await FacilitatorResultService.deleteFacilitatorResultById(+id)

    res.status(StatusCodes.OK).json(deletedFacilitatorResult).end()
}