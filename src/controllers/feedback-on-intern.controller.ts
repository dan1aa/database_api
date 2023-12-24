import { Request, Response } from "express";
import * as FeedbackOnInternService from '@services/feedback-on-intern.service';
import { StatusCodes } from "http-status-codes";
import { FeedbackOnIntern } from "@prisma/client";

export const createFeedbacksOnIntern = async (req: Request, res: Response) => {
    const { data } = req.body;

    const createdFeedbacksOnIntern: FeedbackOnIntern[] | null = await FeedbackOnInternService.createFeedbacksOnIntern(data)

    res.status(StatusCodes.CREATED).json(createdFeedbacksOnIntern).end()
}

export const getListOfFeedbacksOnIntern = async (req: Request, res: Response) => {
    const feedbacksOnInternList: FeedbackOnIntern[] | null = await FeedbackOnInternService.getListOfFeedbacksOnIntern();

    res.status(StatusCodes.OK).json(feedbacksOnInternList).end()
}

export const getFeedbackOnInternById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const feedbackOnIntern: FeedbackOnIntern = await FeedbackOnInternService.getFeedbackOnInternById(+id);

    res.status(StatusCodes.OK).json(feedbackOnIntern).end();
}

export const updateFeedbackOnInternById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;

    const updatedFeedbackOnIntern: FeedbackOnIntern = await FeedbackOnInternService.updateFeedbackOnInternById(+id, data);

    res.status(StatusCodes.OK).json(updatedFeedbackOnIntern).end();
}

export const deleteFeedbackOnInternById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const deletedFeedbackOnIntern: FeedbackOnIntern = await FeedbackOnInternService.deleteFeedbackOnInternById(+id)

    res.status(StatusCodes.OK).json(deletedFeedbackOnIntern).end()
}