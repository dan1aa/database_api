import { Request, Response } from "express";
import * as OversightResultController from '@services/oversight-results.service';
import { StatusCodes } from "http-status-codes";
import { OversightResult } from "@prisma/client";

export const getListOfOversightResults = async (req: Request, res: Response) => {
    const oversightResultsList: OversightResult[] | null = await OversightResultController.getListOfOversightResults();

    res.status(StatusCodes.OK).json(oversightResultsList).end();
}

export const getOversightResultById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const oversightResult: OversightResult | null = await OversightResultController.getOfOversightResultById(+id);

    res.status(StatusCodes.OK).json(oversightResult).end();
}

export const updateOversightResultById = async(req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;

    const updatedOversightResult: OversightResult | null = await OversightResultController.updateOversightResultById(+id, data);

    res.status(StatusCodes.OK).json(updatedOversightResult).end();
}

export const deleteOversightResultById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const deletedOversightResult: OversightResult | null = await OversightResultController.deleteOversightResultById(+id);

    res.status(StatusCodes.OK).json(deletedOversightResult).end();
}

export const createOversightResults = async(req: Request, res: Response) => {
    const { data } = req.body;

    const createdOversightResults: any = await OversightResultController.createOversightResults(data);

    res.status(StatusCodes.OK).json(createdOversightResults).end();
}