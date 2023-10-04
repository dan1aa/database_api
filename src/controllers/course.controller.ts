import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

import * as CourseService from '@services/course.service';
import { Course } from '@prisma/client';


export const getCourses = async (req: Request, res: Response): Promise<string | void> => {
    const result: Course[] = await CourseService.getCourses();
        
    res.status(StatusCodes.OK).json(result).end();
};

export const getCourseById = async (req: Request, res: Response): Promise<string | void> => {
    const { id } = req.params;
    const result: Course | null = await CourseService.getCourseById(+id)

    res.status(StatusCodes.OK).json(result).end()
}

export const createCourse = async (req: Request, res: Response): Promise<string | void> => {
    const courseData = req.body;

    const result = await CourseService.createCourse(courseData);

    res.status(StatusCodes.CREATED).json(result).end();
}

export const updateCourseById = async (req: Request, res: Response): Promise<string | void> => {
    const { id } = req.params;
    const data = req.body;

    const result = await CourseService.updateCourseById(+id, data);

    res.status(StatusCodes.OK).json(result).end();
}


export const deleteCourseById = async (req: Request, res: Response): Promise<string | void> => {
    const { id } = req.params;

    const result = await CourseService.deleteCourseById(+id);

    res.status(StatusCodes.OK).json(result).end();
}

interface CourseDetailsResponse {
    courseName: string,
    courseCipher: string,
    linkToClassMaterials: string | null,
    startDate: Date,
    endDate: Date, 
    participants: {
        [key: string]: any[];
    },
    schedule: any[]
}

export const getCourseDetails = async (req: Request, res: Response) => {
    const courseId = Number(req.params.id);

    const databaseResult = await CourseService.getCourseDetailsById(courseId);

    const responseResult: CourseDetailsResponse = {
        ...databaseResult,
        participants: {},
        schedule: databaseResult.schedule.map(data => ({
            meetNumber: data.meetNumber,
            eventDate: data.eventDate,
            googleMeetLink: data.googleMeetLink,
            classEventType: data.classEventType.name
        })),
    };

    databaseResult.participants.forEach(data => {
        const classRole = data.classRole.name;
        const contactInfo = data.intern.contact;
        const { explorerId, explorerMail, explorerPassword, discordNickname, cohort } = data.intern;

        const formatedInternData = {
            explorerId,
            explorerMail,
            explorerPassword,
            discordNickname,
            cohort,
            contactInfo
        };

        responseResult.participants[`${classRole}s`] = [
            ...(responseResult.participants[`${classRole}s`] || []),
            formatedInternData
        ];
    });

    res.status(StatusCodes.OK).json(responseResult).end();
};
