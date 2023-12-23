import { Request, Response } from "express";
import * as OversightResultController from '@services/oversight-results.service';
import { StatusCodes } from "http-status-codes";
import { FeedbackOnFacilitatorType } from "types/types";

export const getListOfOversightResults = async (req: Request, res: Response) => {
    const oversightResultsList: FeedbackOnFacilitatorType[] | null = await OversightResultController.getListOfOversightResults();

    res.status(StatusCodes.OK).json(oversightResultsList).end();
}

export const getOversightResultById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const oversightResult: FeedbackOnFacilitatorType = await OversightResultController.getOfOversightResultById(+id);

    res.status(StatusCodes.OK).json(oversightResult).end();
}

export const updateOversightResultById = async(req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;

    const updatedOversightResult: FeedbackOnFacilitatorType = await OversightResultController.updateOversightResultById(+id, data);

    res.status(StatusCodes.OK).json(updatedOversightResult).end();
}

export const deleteOversightResultById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const deletedOversightResult: FeedbackOnFacilitatorType = await OversightResultController.deleteOversightResultById(+id);

    res.status(StatusCodes.OK).json(deletedOversightResult).end();
}

export const createOversightResults = async(req: Request, res: Response) => {
    const { data } = req.body;

    const createdOversightResults: any = await OversightResultController.createOversightResults(data);

    res.status(StatusCodes.OK).json(createdOversightResults).end();
}