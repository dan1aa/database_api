import { Course, Prisma } from "@prisma/client";

import { db } from "@utils/db.server";
import { NotFoundError } from "@utils/exeptions/ApiErrors";


export const getCourses = async (): Promise<any> => {
    const courses: Course[] = await db.course.findMany();

    return courses
}

export const getCourseById = async (id: number) => {
    const course: any = await db.course.findUnique({
        where: {
            id
        }
    })

    if(!course) throw new NotFoundError(`There is no course with id ${id}`)

    return course
}

export const createCourse = async (newCourse: any) => {

    const { courseCipher, startDate, endDate } = newCourse;

    newCourse.endDate = new Date(startDate);
    newCourse.end_date = new Date(endDate);

    const courseExistance = await db.course.findUnique({
        where: {
            courseCipher: courseCipher
        }
    })

    if(courseExistance) throw new NotFoundError('Course with that course cipher is already exist')

    const result: Course = await db.course.create({ data: newCourse })

    return result
}

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

    console.log(dbResult)

    dbResult.forEach(data => {
        const roleName: string = `${data.role.name.toLocaleLowerCase()}s`;

        if (!result.hasOwnProperty(roleName)) {
            result[roleName] = [];
        } 

        result[roleName].push(data.intern); 
    });

    return result;
};

export const getCourseScheduleInfoByCourseId = async (id: number) => {
    // return await db.nobel_event.findMany({
    //     where: { course_id: id },
    //     select: {
    //         meet_num: true,
    //         event_date: true
    //     }
    // });
};