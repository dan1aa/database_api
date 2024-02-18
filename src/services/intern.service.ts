import { Intern } from '@prisma/client';

import { db } from '@utils/db.server';
import { NotFoundError } from '@utils/exeptions/ApiErrors';
import { FilteringParams } from 'types/types';


export const createInterns = async (interns: Intern[]) => {
    const promises = interns.map(intern => {
        return db.intern.upsert({
            where: { explorerId: intern.explorerId },
            update: { ...intern },
            create: { ...intern }
        });
    }); 

    await Promise.all(promises);

    return { message: "Interns created and updated successfully!" };
};


export const getInternById = async (id: number): Promise<Intern | null> => {
    const intern: Intern | null = await db.intern.findUnique({ where: { id } });

    return intern

};

export const deleteInternById = async (id: number): Promise<Intern> => {
    const deletedIntern: Intern = await db.intern.delete({ where: { id } });

    return deletedIntern;
};

export const updateInternById = async (id: number, intern: Intern): Promise<Intern> => {
    const updatedIntern: Intern = await db.intern.update({ where: { id }, data: intern });

    return updatedIntern;
};

export const getInternsList = async (filteringParams: FilteringParams): Promise<Intern[] | null> => {
    const internsList: Intern[] | null = await db.intern.findMany({
        where: {
            cohort: filteringParams.cohort,
            internCourseRole: {
                some: {
                    course: {
                        courseCipher: filteringParams.courseCipher,
                    },
                },
            },
        },
    });

    return internsList;
};

export const getCohortScheduleByExplorerId = async (explorerId: string) => {
    const targetIntern: Intern | null = await db.intern.findUnique({ where: { explorerId } });

    if (!targetIntern) {
        throw new NotFoundError;
    }

    const cohortSchedule = db.cohortSchedule.findMany({
        where: {
            cohort: targetIntern.cohort!,
        },
        orderBy: {
            eventDate: { sort: 'asc', nulls: 'last' },
        }
    });

    return cohortSchedule;
};

export const getInternBadgesListByCourseId = async (internId: number, courseId: number) => {
    const internCoursesBadges = await db.eventInternBadge.findMany({
        where: {
            internId,
            classEvent: {
                courseId
            }
        },
        include: {
            badge: true
        }
    });

    const badgesStatisticsByBadgeName = internCoursesBadges.reduce((accumulator: { [key: string]: number }, internBadge) => {
        const badgeName = internBadge.badge.name;

        accumulator[badgeName] = (accumulator[badgeName] || 0) + 1;

        return accumulator;
    }, {});

    return badgesStatisticsByBadgeName;
};