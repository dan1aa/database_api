import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import * as ClassEventService from '@services/class-event.service';
import { ClassEvent } from '@prisma/client';
import { NotFoundError } from '@utils/exeptions/ApiErrors';

export const createClassEvents = async (req: Request, res: Response) => {
    const { data } = req.body;

    const createdClassEvent = await ClassEventService.createClassEvents(data);

    res.status(StatusCodes.CREATED).json(createdClassEvent).end();
};

export const getClassEventById = async (req: Request, res: Response) => {
    const classEventId = Number(req.params.id);

    const classEvent: ClassEvent | null = await ClassEventService.getClassEventById(classEventId);

    res.status(StatusCodes.OK).json(classEvent).end();
};

export const updateClassEventById = async (req: Request, res: Response) => {
    const classEventData = req.body;
    const classEventId = Number(req.params.id);
    
    const updatedClassevent: ClassEvent = await ClassEventService.updateClassEventById(classEventId, classEventData);

    res.status(StatusCodes.OK).json(updatedClassevent).end();
};

export const deleteClassEventById = async (req: Request, res: Response) => {
    const classEventId = Number(req.params.id);

    const deletedClassEvent: ClassEvent = await ClassEventService.deleteClassEventById(classEventId);

    res.status(StatusCodes.OK).json(deletedClassEvent).end();
};

export const getListOfClassEvents = async (req: Request, res: Response) => {
    const classEventsList: ClassEvent[] | null = await ClassEventService.getListOfClassEvents();

    res.status(StatusCodes.OK).json(classEventsList).end();
};

export const getClassEventByGoogleMeetCode = async (req: Request, res: Response) => {
    const { code } = req.params;
    const ClassEventByGoogleMeetCode: ClassEvent | null = await ClassEventService.getClassEventByGoogleMeetCode(code)

    res.status(StatusCodes.OK).json(ClassEventByGoogleMeetCode).end()
}

export const getResultsByClassEventId = async (req: Request, res: Response) => {
    const { classEventId } = req.params;

    const resultsByClassEventId = await ClassEventService.getResultsByClassEventId(+classEventId);

    res.status(StatusCodes.OK).json(resultsByClassEventId).end()
}