import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import * as ClassEventService from '@services/class-event.service';

export const createClassEvent = async (req: Request, res: Response) => {
    const classEventData = req.body;

    const createdClassEvent = await ClassEventService.createClassEvent(classEventData);

    res.status(StatusCodes.CREATED).json(createdClassEvent).end();
};

export const getClassEventById = async (req: Request, res: Response) => {
    const classEventId = Number(req.params.id);

    const classEventData = await ClassEventService.getClassEventById(classEventId);

    res.status(StatusCodes.OK).json(classEventData).end();
};

export const updateClassEventById = async (req: Request, res: Response) => {
    const classEventData = req.body;
    const classEventId = Number(req.params.id);
    
    const updatedClassevent = await ClassEventService.updateClassEventById(classEventId, classEventData);

    res.status(StatusCodes.OK).json(updatedClassevent).end();
};

export const deleteClassEventById = async (req: Request, res: Response) => {
    const classEventId = Number(req.params.id);

    const deletedClassEvent = await ClassEventService.deleteClassEventById(classEventId);

    res.status(StatusCodes.OK).json(deletedClassEvent).end();
};

export const getListOfClassEvents = async (req: Request, res: Response) => {
    const classEventsList = await ClassEventService.getListOfClassEvents();

    res.status(StatusCodes.OK).json(classEventsList).end();
};