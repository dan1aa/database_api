import { Prisma } from "@prisma/client";
import { db } from "@utils/db.server";


export const bulkUpdateIntern = async (internToUpdate: any) => {
    const { id } = internToUpdate;

    try {
        await db.intern.update({ where: { id }, data: internToUpdate });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                return `Intern with id ${id} doesn't exist`
            }
            if(error.code === 'P2003') {
                return `Contact with id ${internToUpdate.contactId} doesn't exist`
            }
        }
    }
}

export const bulkUpdateCourse = async (courseToUpdate: any) => {
    const { id, startDate, endDate } = courseToUpdate;
    
    if (startDate && endDate) {
        courseToUpdate.startDate = new Date(startDate)
        courseToUpdate.endDate = new Date(endDate)
    }

    try {
        await db.course.update({ where: { id }, data: courseToUpdate });
    } catch (error: any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                return `Course with id ${id} does not exist`
            }
        } else {
            return error.message
        }
    }
}

export const bulkUpdateInternCourse = async (internCourseToUpdate: any) => {
    const { id , courseId, internId, classRoleId} = internCourseToUpdate;

    try {
        await db.internCourse.update({ where: { id }, data: {courseId, internId, classRoleId }});
    } catch (error: any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                return `internCourse with id ${id} does not exist`
            }
            if(error.code === 'P2003') {
                return `You are trying to add foreign keys (courseId, internId or courseRoleId that don't exist)`;
            }
        }
    }
}

export const bulkUpdateClassEvent = async (classEventToUpdate: any) => {

    let { id, eventDate, meetNumber, googleMeetLink, courseId, classEventTypeId } = classEventToUpdate;

    if (eventDate) eventDate = new Date(eventDate)

    try {
        await db.classEvent.update({ where: { id }, data: {meetNumber, googleMeetLink, courseId, classEventTypeId, eventDate} });
    } catch (error: any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                return `classEvent with id ${id} does not exist`
            }
            if(error.code === 'P2003') {
                return `Class event with courseId ${courseId} or with classEventTypeId ${classEventTypeId} does not exist`;
            }
        } else {
            return error.message
        }
    }
}