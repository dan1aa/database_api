import { Prisma } from "@prisma/client";

import { db } from "@utils/db.server";
import { NotFoundError } from "@utils/exeptions/ApiErrors";


// export const getCourses = async (): Promise<course[]> => {
//     // const courses: course[] = await db.course.findMany();

//     // return courses
// }

export const getCourseById = async (id: number) => {
    // const course: course | null = await db.course.findUnique({
    //     where: {
    //         id
    //     }
    // })

    // if(!course) throw new NotFoundError(`There is no course with id ${id}`)

    // return course
}

export const createCourse = async () => {

    // const { course_name, start_date, end_date } = data;

    // data.start_date = new Date(start_date);
    // data.end_date = new Date(end_date);

    // const courseExistance = await db.course.findUnique({
    //     where: {
    //         course_name: course_name
    //     }
    // })

    // if(courseExistance) throw new NotFoundError('Course with that course name is already exist')

    // const result: course = await db.course.create({ data })

    // return result
}

export const updateCourseById = async () => {

    // const { start_date, end_date } = data;

    // data.start_date = new Date(start_date);
    // data.end_date = new Date(end_date)

    // const courseExistance: course | null = await db.course.findUnique({
    //     where: {
    //         id
    //     }
    // })

    // if(!courseExistance) throw new NotFoundError(`Course with id ${id} does not exist`)

    // const result: course = await db.course.update({
    //     where: {
    //         id
    //     },
    //     data
    // })

    // return result
}

export const deleteCourseById = async (id: number) => {

    // const courseExistance: course | null = await db.course.findUnique({
    //     where: {
    //         id
    //     }
    // })

    // if(!courseExistance) throw new NotFoundError(`Course with id ${id} does not exist`)

    // await db.course.delete({
    //     where: {
    //         id
    //     }
    // })

    // return { message: `Course with id ${id} deleted` }
}

export const getCourseParticipantsInfoByCourseId = async (id: number) => {
    // const result: { [key: string]: any[] } = {};

    // const dbResult: any[] = await db.intern_course.findMany({
    //     where: { course_id: id },
    //     include: {
    //         role: true,
    //         intern: true
    //     },
    // });

    // console.log(dbResult)

    // dbResult.forEach(data => {
    //     const roleName: string = `${data.role.name.toLocaleLowerCase()}s`;

    //     if (!result.hasOwnProperty(roleName)) {
    //         result[roleName] = [];
    //     } 

    //     result[roleName].push(data.intern); 
    // });

    // return result;
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