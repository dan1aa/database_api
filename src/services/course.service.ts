import { course } from "@prisma/client";
import { db } from "@utils/db.server";

export const getCourses = async (): Promise<course[]> => {
    const courses: course[] = await db.course.findMany();

    return courses
}

export const getCourseByName = async (courseName: string): Promise<course[]> => {
    const course: course[] = await db.course.findMany({
        where: {
            course_name: courseName
        }
    })

    return course
}