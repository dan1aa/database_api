import { Prisma, course } from "@prisma/client";

import { db } from "@utils/db.server";


export const getCourses = async (): Promise<course[]> => {
    const courses: course[] = await db.course.findMany();

    return courses
}

export const getCourseById = async (id: number): Promise<course | null> => {
    const course: course | null = await db.course.findUnique({
        where: {
            id
        }
    })

    return course
}

export const createCourse = async (data: Prisma.courseCreateInput): Promise<Object> => {

    const { course_name, start_date, end_date } = data;

    data.start_date = new Date(start_date);
    data.end_date = new Date(end_date);

    const courseExistance = await db.course.findUnique({
        where: {
            course_name: course_name
        }
    })

    if(courseExistance) return { message: `Course with name ${course_name} already exist` };

    const result: course = await db.course.create({ data })

    return result
}

export const updateCourseById = async (id: number, data: any): Promise<Object> => {

    const { start_date, end_date } = data;

    data.start_date = new Date(start_date);
    data.end_date = new Date(end_date)

    const courseExistance: course | null = await db.course.findUnique({
        where: {
            id
        }
    })

    if(!courseExistance) return { message: `Course with id ${id} doesn't exist` };

    await db.course.update({
        where: {
            id
        },
        data
    })

    return { message: `Course with id ${id} updated` }
}

export const deleteCourseById = async (id: number): Promise<Object> => {

    const courseExistance: course | null = await db.course.findUnique({
        where: {
            id
        }
    })

    if(!courseExistance) return { message: `Course with id ${id} doesn't exist` };

    await db.course.delete({
        where: {
            id
        }
    })

    return { message: `Course with id ${id} deleted` }
}

export const getCourseParticipantsInfoByCourseId = async (id: number) => {
    const result: { [key: string]: any[] } = {};

    const dbResult = await db.intern_course.findMany({
        where: { course_id: id },
        include: {
            role: true,
            intern: true
        },
    });

    dbResult.forEach(data => {
        const roleName = `${data.role.name.toLocaleLowerCase()}s`;

        if (!result.hasOwnProperty(roleName)) {
            result[roleName] = [];
        } 

        result[roleName].push(data.intern); 
    });

    return result;
};

export const getCourseScheduleInfoByCourseId = async (id: number) => {
    return await db.nobel_event.findMany({
        where: { course_id: id },
        select: {
            meet_num: true,
            event_date: true
        }
    });
};