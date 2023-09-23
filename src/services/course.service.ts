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