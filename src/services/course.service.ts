import { Course, Prisma } from "@prisma/client";

import { db } from "@utils/db.server";
import { NotFoundError } from "@utils/exeptions/ApiErrors";
import { CourseType } from "types/types";

export const createCourses = async (courses: Prisma.CourseCreateInput[]) => {

    courses.forEach(course => {
        course.startDate = new Date(course.startDate)
        course.endDate = new Date(course.endDate)
    })

    const createdCourses = await db.course.createMany({ data: courses });
    return createdCourses;
};


export const getCourses = async (): Promise<Course[] | null> => {
    const coursesList: Course[] = await db.course.findMany();

    return coursesList
}

export const getCourseById = async (id: number): Promise<CourseType> => {
    const course: CourseType = await db.course.findUnique({
        where: {
            id
        }
    })

    if(!course) {
        throw new NotFoundError(`There is no course with id ${id}`);
    }
    

    return course
}

export const updateCourseById = async (id: number , course: any): Promise<CourseType> => {

    const { startDate, endDate } = course;

    course.startDate = new Date(startDate);
    course.endDate = new Date(endDate)

    const courseExistance: CourseType = await db.course.findUnique({
        where: {
            id
        }
    })

    if(!courseExistance) throw new NotFoundError(`Course with id ${id} does not exist`)

    const updatedCourse: CourseType = await db.course.update({
        where: {
            id
        },
        data: course
    })

    return updatedCourse
}

export const deleteCourseById = async (id: number): Promise<CourseType> => {

    const courseExistance: CourseType = await db.course.findUnique({
        where: {
            id
        }
    })

    if(!courseExistance) throw new NotFoundError(`Course with id ${id} does not exist`)

    const deletedCourse: CourseType = await db.course.delete({
        where: {
            id
        }
    })

    return deletedCourse;
}

export const enrollInternsInCourseById = async (courseId: number, participantsData: Array<{ internId: number, classRoleId: number }>) => {
    for (const participantData of participantsData) {
        const { internId, classRoleId } = participantData;

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
    const targetCourseData: CourseType = await db.course.findUnique({ where: { courseCipher }});

    if (!targetCourseData) {
        throw new NotFoundError(`${courseCipher} course doesn't exist`);
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