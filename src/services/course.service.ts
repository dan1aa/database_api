import { Course, Prisma } from "@prisma/client";

import { db } from "@utils/db.server";
import { BadRequestError, NotFoundError } from "@utils/exeptions/ApiErrors";
import { CourseCreateInput } from "types/types";

export const createCourses = async (data: Prisma.CourseCreateInput[]) => {
    const result = await db.course.createMany({ data});
    return result;
};


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

export const enrollInternsInCourseById = async (courseId: number, participantsData: Array<{ internId: number, classRoleId: number }>) => {
    for (const data of participantsData) {
        const { internId, classRoleId } = data;

        const internEnrollmentResult = await db.internCourse.create({ data: { internId, courseId } });
        const internCourseRoleAssignmentResult = await db.internCourseRole.create({ 
            data: { 
                classRoleId,
                internCourseId: internEnrollmentResult.id 
            } 
        });
    }
}


export const getCourseDetailsByCipher = async (courseCipher: string) => {
    const targetCourseData = await db.course.findUnique({ where: { courseCipher }});

    if (!targetCourseData) {
        throw new NotFoundError(`${courseCipher} course dosen't exist`);
    }
    
    const courseSchedule = await getCourseScheduleByCourseId(targetCourseData.id);
    const courseParticipants = await getCourseParticipantsByCourseId(targetCourseData.id);
    
    const result = {
        ...targetCourseData,
        participants: courseParticipants,
        schedule: courseSchedule
    }

    return result;
}

const getCourseScheduleByCourseId = async (courseId: number) => {
    const courseSchedule = await db.classEvent.findMany({
        where: { courseId },
        include: {
            classEventType: {
                select: {
                    name: true
                }
            }
        }
    });

    return courseSchedule;
};

const getCourseParticipantsByCourseId = async (courseId: number) => {
    const courseParticipants = await db.internCourseRole.findMany({ 
        where: {
            internCourse: {
                courseId: courseId
            }
        },
        include: {
            internCourse: {
                include: {
                    intern: true
                }
            },
            classRole: true
        }
    });

    const groupedInternsByRole = courseParticipants.reduce((result: Record<string, Array<any>>, participant) => {
        const { classRole, internCourse } = participant;
      
        const role = classRole.name;
        const intern = internCourse.intern;
      
        if (!result[role]) {
            result[role] = [];
        }
        
        result[role].push(intern);

        return result;
    }, {});
      

    return groupedInternsByRole;
};