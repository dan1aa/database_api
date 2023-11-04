import { Course, Prisma } from "@prisma/client";

import { db } from "@utils/db.server";
import { BadRequestError, NotFoundError } from "@utils/exeptions/ApiErrors";
import { CourseCreateInput } from "types/types";


export const getCourses = async () => {
    const courses: Course[] = await db.course.findMany();

    return courses
}

export const getCourseById = async (id: number) => {
    const course: any = await db.course.findUnique({
        where: {
            id
        }
    })

    if(!course) {
        throw new NotFoundError(`There is no course with id ${id}`);
    }
    

    return course
}

export const createCourse = async (course: CourseCreateInput) => {
    const { startDate, endDate } = course;

    course.startDate = new Date(startDate)
    course.endDate = new Date(endDate)

    const result = await db.course.create({ data: course });
    return result;
};

export const updateCourseById = async (id: number , course: any) => {

    const { startDate, endDate } = course;

    course.startDate = new Date(startDate);
    course.endDate = new Date(endDate)

    const courseExistance: any = await db.course.findUnique({
        where: {
            id
        }
    })

    if(!courseExistance) throw new NotFoundError(`Course with id ${id} does not exist`)

    const result: Course = await db.course.update({
        where: {
            id
        },
        data: course
    })

    return result
}

export const deleteCourseById = async (id: number) => {

    const courseExistance: any = await db.course.findUnique({
        where: {
            id
        }
    })

    if(!courseExistance) throw new NotFoundError(`Course with id ${id} does not exist`)

    await db.course.delete({
        where: {
            id
        }
    })

    return { message: `Course with id ${id} deleted` }
}

export const getCourseParticipantsInfoByCourseId = async (id: number) => {
    const result: { [key: string]: any[] } = {};

    const dbResult: any[] = await db.internCourse.findMany({
        where: { courseId: id },
        include: {
            classRole: true,
            intern: true
        },
    });

    dbResult.forEach(data => {
        const roleName: string = `${data.role.name.toLocaleLowerCase()}s`;

        if (!result.hasOwnProperty(roleName)) {
            result[roleName] = [];
        } 

        result[roleName].push(data.intern); 
    });

    return result;
};


export const getCourseDetailsByCipher = async (courseCipher: string) => {
    const targetCourse = await db.course.findUnique({ where: { courseCipher }});

    if (!targetCourse) {
        throw new NotFoundError(`${courseCipher} course dosen't exist`)
    }

    const courseParticipants = await db.internCourse.findMany({
        where: { classRoleId: targetCourse.id },
        include: {
            classRole: {
                select: {
                    name: true
                }
            },
            intern: {
                include: {
                    contact: true
                }
            }
        },
    });

    const courseSchedule = await db.classEvent.findMany({
        where: { courseId: targetCourse.id },
        include: {
            classEventType: {
                select: {
                    name: true
                }
            }
        }
    });

    return {
        courseInfo: targetCourse,
        participants: courseParticipants,
        schedule: courseSchedule
    };
}