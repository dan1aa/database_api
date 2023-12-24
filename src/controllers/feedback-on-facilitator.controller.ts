import { Request, Response } from "express";
import * as FeedbackOnFacilitatorController from '@services/feedback-on-facilitator.service';
import { StatusCodes } from "http-status-codes";
import { FeedbackOnFacilitator } from "@prisma/client";

export const getListOfFeedbacksOnFacilitator = async (req: Request, res: Response) => {
    const feedbacksOnFacilitatorList: any = await FeedbackOnFacilitatorController.getListOfFeedbacksOnFacilitator();

    res.status(StatusCodes.OK).json(feedbacksOnFacilitatorList).end();
}

export const getFeedbackOnFacilitatorById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const feedbackOnFacilitator: FeedbackOnFacilitator | null = await FeedbackOnFacilitatorController.getFeedbackOnFacilitatorById(+id);

    res.status(StatusCodes.OK).json(feedbackOnFacilitator).end();
}

export const updateFeedbackOnFacilitatorById = async(req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;

    const updatedFeedbackOnFacilitator: FeedbackOnFacilitator | null = await FeedbackOnFacilitatorController.updateFeedbackOnFacilitatorById(+id, data);

    res.status(StatusCodes.OK).json(updatedFeedbackOnFacilitator).end();
}

export const deleteFeedbackOnFacilitatorById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const deletedFeedbackOnFacilitator: FeedbackOnFacilitator | null = await FeedbackOnFacilitatorController.deleteFeedbackOnFacilitatorById(+id);

    res.status(StatusCodes.OK).json(deletedFeedbackOnFacilitator).end();
}

export const createFeedbacksOnFacilitator = async(req: Request, res: Response) => {
    const { data } = req.body;

    const createdFeedbackOnFacilitator: any = await FeedbackOnFacilitatorController.createFeedbacksOnFacilitator(data);

    res.status(StatusCodes.OK).json(createdFeedbackOnFacilitator).end();
}