import { Prisma } from "@prisma/client";
import { db } from "@utils/db.server";


export const bulkUpdateIntern = async (internToUpdate: any) => {
    const { id } = internToUpdate;

    try {
        await db.intern.update({ where: { id }, data: internToUpdate });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                console.log(`Intern with id ${id} doesn't exist`);
            }
            if(error.code === 'P2003') {
                console.log(`Contact with id ${internToUpdate.contactId} doesn't exist`);
            }
        }
    }
}

export const bulkUpdateCourse = async (courseToUpdate: any) => {
    const { id, startDate, endDate } = courseToUpdate;

    courseToUpdate.startDate = new Date(startDate)
    courseToUpdate.endDate = new Date(endDate)

    try {
        await db.course.update({ where: { id }, data: courseToUpdate });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                console.log(`Course with id ${id} does not exist`)
            }
        }
    }
}

export const bulkUpdateInternCourse = async (internCourseToUpdate: any) => {
    const { id , courseId, internId, classRoleId} = internCourseToUpdate;

    try {
        await db.internCourse.update({ where: { id }, data: {courseId, internId, classRoleId }});
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                console.log(`internCourse with id ${id} does not exist`)
            }
            if(error.code === 'P2003') {
                console.log(`You are trying to add foreign keys (courseId, internId or courseRoleId that don't exist)`);
            }
        }
    }
}

export const bulkUpdateClassEvent = async (classEventToUpdate: any) => {

    let { id, eventDate, meetNumber, googleMeetLink, courseId, classEventTypeId } = classEventToUpdate;

    eventDate = new Date(eventDate)

    try {
        await db.classEvent.update({ where: { id }, data: {meetNumber, googleMeetLink, courseId, classEventTypeId, eventDate} });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                console.log(`classEvent with id ${id} does not exist`)
            }
            if(error.code === 'P2003') {
                console.log(`Class event with courseId ${courseId} or with classEventTypeId ${classEventTypeId} does not exist`);
            }
        }
    }
}