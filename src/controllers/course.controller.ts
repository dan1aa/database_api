import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

import * as CourseService from '@services/course.service';
import { Course } from '@prisma/client';

export const createCourses = async (req: Request, res: Response) => {
    const { data } = req.body;

    const result = await CourseService.createCourses(data);

    res.status(StatusCodes.CREATED).json(result).end();
};

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

export const enrollInternsInCourseById = async (req: Request, res: Response) => {
    const courseId = Number(req.params.id);
    const participantsData = req.body.data;

    const result = await CourseService.enrollInternsInCourseById(courseId, participantsData);

    res.status(StatusCodes.OK).end();
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

export const getCourseDetailsByCipher = async (req: Request, res: Response) => {
    const courseCipher = req.params.courseCipher;

    const databaseResult = await CourseService.getCourseDetailsByCipher(courseCipher);
    console.log(databaseResult)
    // const formatedScheduleData = databaseResult.schedule.map(data => ({
    //     id: data.id,
    //     meetNumber: data.meetNumber,
    //     eventDate: data.eventDate,
    //     googleMeetLink: data.googleMeetLink,
    //     classEventType: data.classEventType.name,
    // }));

    // const formatedParticipantsData = databaseResult.participants.reduce((result, data) => {
    //     const roleName = data.classRoleId.name;
    //     const participantFormatedData = {
    //         explorerId: data.intern.explorerId,
    //         explorerMail: data.intern.explorerMail,
    //         explorerPassword: data.intern.explorerPassword,
    //         discordNickname: data.intern.discordNickname,
    //         cohort: data.intern.cohort,
    //         contactInfo: {
    //             id: data.intern.contact.id,
    //             firstName: data.intern.contact.firstName,
    //             lastName: data.intern.contact.lastName,
    //             email: data.intern.contact.email,
    //             age: data.intern.contact.age,
    //             country: data.intern.contact.country,
    //             timezone: data.intern.contact.timezone,
    //             sourceOfReferral: data.intern.contact.sourceOfReferral,
    //             eduQuestSelectedDateTime: data.intern.contact.eduQuestSelectedDateTime,
    //             eduQuestDecision: data.intern.contact.eduQuestDecision,
    //         }
    //     };

    //     if (!result[roleName]) {
    //         result[roleName] = [];
    //     }

    //     result[roleName].push(participantFormatedData);

    //     return result;
    // }, {} as Record<string, any>);

    // const result = {
    //     course: databaseResult.courseInfo,
    //     participants: formatedParticipantsData,
    //     schedule: formatedScheduleData
    // };

    res.status(StatusCodes.OK).json(databaseResult).end();
};
