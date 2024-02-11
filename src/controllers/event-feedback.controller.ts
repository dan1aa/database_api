import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

import * as EventFeedbackService from '@services/event-feedback.service'
import { EventFeedback } from '@prisma/client';

export const createEventFeedbacks = async (req: Request, res: Response) => {
    const { data } = req.body;
    
    const createdEventFeedbacks = await EventFeedbackService.createEventFeedbacks(data)
    res.status(StatusCodes.CREATED).json(createdEventFeedbacks).end()
}

export const getListOfEventFeedbacks = async (_: Request, res: Response) => {
    const eventFeedbacks: EventFeedback[] | null = await EventFeedbackService.getListOfEventFeedbacks()

    res.status(StatusCodes.OK).json(eventFeedbacks).end();
}

export const getEventFeedbackById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const eventFeedback: EventFeedback | null = await EventFeedbackService.getEventFeedbackById(+id);
    res.status(StatusCodes.OK).json(eventFeedback).end();
}

export const updateEventFeedbackById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;

    const updatedEventFeedback = await EventFeedbackService.updateEventFeedbackById(+id, data);
    res.status(StatusCodes.OK).json(updatedEventFeedback).end();
}

export const deletedEventFeedbackById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const deletedEventFeedback = await EventFeedbackService.deleteEventFeedbackById(+id)
    res.status(StatusCodes.OK).json(deletedEventFeedback).end();
}