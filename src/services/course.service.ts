import { Course, Prisma } from "@prisma/client";

import { db } from "@utils/db.server";
import { NotFoundError } from "@utils/exeptions/ApiErrors";

export const createCourses = async (courses: Course[]) => {

    courses.forEach((course: Course) => {
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

export const getCourseById = async (id: number): Promise<Course> => {
    const course: Course | null = await db.course.findUnique({
        where: {
            id
        }
    })

    if(!course) {
        throw new NotFoundError(`There is no course with id ${id}`);
    }
    

    return course
}

export const updateCourseById = async (id: number , course: any): Promise<Course> => {

    const { startDate, endDate } = course;

    course.startDate = new Date(startDate);
    course.endDate = new Date(endDate)

    const courseExistance: Course | null = await db.course.findUnique({
        where: {
            id
        }
    })

    if(!courseExistance) throw new NotFoundError(`Course with id ${id} does not exist`)

    const updatedCourse: Course = await db.course.update({
        where: {
            id
        },
        data: course
    })

    return updatedCourse
}

export const deleteCourseById = async (id: number): Promise<Course> => {

    const courseExistance: Course | null = await db.course.findUnique({
        where: {
            id
        }
    })

    if(!courseExistance) throw new NotFoundError(`Course with id ${id} does not exist`)

    const deletedCourse: Course = await db.course.delete({
        where: {
            id
        }
    })

    return deletedCourse;
}

export const enrollInternsInCourseById = async (courseId: number, participantsData: Array<{ internId: number, classRoleId: number }>) => {
    for (const participantData of participantsData) {
        const { internId, classRoleId } = participantData;

        const internEnrollmentResult = await db.internCourseRole.create({ data: { internId, courseId, classRoleId } });
    }
}


export const getCourseDetailsByCipher = async (courseCipher: string) => {
    const targetCourseData: Course | null = await db.course.findUnique({ where: { courseCipher }});

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
            courseId
        },
        include: {
            intern: true,
            classRole: true
        }
    });

    const groupedInternsByRole = courseParticipants.reduce((result: Record<string, Array<any>>, participant) => {
      
        const { intern, classRole } = participant;
      
        if (!result[classRole.name]) {
            result[classRole.name] = [];
        }
        
        result[classRole.name].push(intern);

        return result;
    }, {});
      

    return groupedInternsByRole;
};