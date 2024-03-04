import { Intern } from '@prisma/client';

import { db } from '@utils/db.server';
import { DiscordData, FilteringParams } from 'types/types';


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

    if (!targetIntern) return null;

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

    if (!internCoursesBadges) return null;

    const badgesStatisticsByBadgeName = internCoursesBadges.reduce((accumulator: { [key: string]: number }, internBadge) => {
        const badgeName = internBadge.badge.name;

        accumulator[badgeName] = (accumulator[badgeName] || 0) + 1;

        return accumulator;
    }, {});

    return badgesStatisticsByBadgeName;
};

export const getAllInternBadges = async (explorerId: string) => {

    const badges: { [key: string]: number } = {}

    const intern: Intern | null = await db.intern.findUnique({
        where: {
            explorerId
        }
    })

    if (intern) {
        const { id } = intern;

        const internBadges = await db.eventInternBadge.findMany({
            where: { internId: id },
            include: {
                badge: true
            }
        })

        internBadges.forEach(internBadge => {
            const { name } = internBadge.badge;

            if (badges[name]) badges[name] += 1
            else badges[name] = 1
        })

        return badges
    }

    return null;
}

export const insertDiscordData = async (discordData: DiscordData[]) => {
    for (let element of discordData) {
        try {
            const { explorerId, discordId, discordNickname } = element;

            const intern: Intern | null = await db.intern.findUnique({ where: { explorerId } })

            if (intern) {
                await db.intern.update({
                    where: {
                        explorerId
                    },
                    data: { discordId, discordNickname }
                })
            } else {
                continue;
            }
        } catch(e) {
            continue;
        }
    }

    return { message: "Discord data updated successfully!" };
}

// function transferDiscordNicknames () {
//     let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Internship");
  
//     let range = sheet.getRange("F:G");
  
//     let values = range.getValues().slice(2);
  
//     for (let i = 0; i < values.length; i += 100) {
//       let data = values.slice(i, i + 100);
  
//       let object = [];
  
//       data.forEach(intern => {
//         if (intern[1].length < 50) {
//           object.push({ explorerId: intern[0], discordNickname: intern[1], discordId: null })
//         }
//       })
  
  
//       let options = {
//         'method': "put",
//         'contentType': "application/json",
//         'payload': JSON.stringify({
//           data: object
//         })
//       }
  
//       UrlFetchApp.fetch(`http://52.57.170.54:5000/api/interns/discord/update`, options);
//     }
  
//   }
  