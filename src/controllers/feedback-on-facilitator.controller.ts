import { Request, Response } from "express";
import * as FeedbackOnFacilitatorController from '@services/feedback-on-facilitator.service';
import { StatusCodes } from "http-status-codes";
import { FeedbackOnFacilitator } from "@prisma/client";
import { NotFoundError } from "@utils/exeptions/ApiErrors";

export const getListOfFeedbacksOnFacilitator = async (req: Request, res: Response) => {
    const feedbacksOnFacilitatorList: any = await FeedbackOnFacilitatorController.getListOfFeedbacksOnFacilitator();

    res.status(StatusCodes.OK).json(feedbacksOnFacilitatorList).end();
}

export const getFeedbackOnFacilitatorById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const feedbackOnFacilitator: FeedbackOnFacilitator | null = await FeedbackOnFacilitatorController.getFeedbackOnFacilitatorById(id);

    res.status(StatusCodes.OK).json(feedbackOnFacilitator).end();
}

export const updateFeedbackOnFacilitatorById = async(req: Request, res: Response) => {
    const id = Number(req.params.id);
    const data = req.body;

    const updatedFeedbackOnFacilitator: FeedbackOnFacilitator = await FeedbackOnFacilitatorController.updateFeedbackOnFacilitatorById(id, data);

    res.status(StatusCodes.OK).json(updatedFeedbackOnFacilitator).end();
}

export const deleteFeedbackOnFacilitatorById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const deletedFeedbackOnFacilitator: FeedbackOnFacilitator = await FeedbackOnFacilitatorController.deleteFeedbackOnFacilitatorById(id);

    res.status(StatusCodes.OK).json(deletedFeedbackOnFacilitator).end();
}

export const createFeedbacksOnFacilitator = async(req: Request, res: Response) => {
    const { data } = req.body;

    const createdFeedbacksOnFacilitator: any = await FeedbackOnFacilitatorController.createFeedbacksOnFacilitator(data);

    res.status(StatusCodes.CREATED).json(createdFeedbacksOnFacilitator).end();
}