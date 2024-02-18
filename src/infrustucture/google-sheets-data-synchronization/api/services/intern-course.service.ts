import { Prisma } from '@prisma/client';

import { db } from '@utils/db.server';

type explorerId = string;

interface InternCourseData {
    courseCipher: string;
    participants: {
        [key: string]: Array<explorerId>;
    }
};

const mergeCourseData = async (data: Prisma.CourseCreateInput[]) => {
    const promises = data.map(courseData => {
        return db.course.upsert({
            where: { courseCipher: courseData.courseCipher },
            update: { ...courseData },
            create: { ...courseData }
        });
    }); 

    const mergingResult = await Promise.all(promises);

    return mergingResult;
};

const mergeInternCourseData = async (data: InternCourseData[]) => {
    const promises = data.map(internCourseData => enrollInternsToCourse(internCourseData));

    const mergingResult = await Promise.all(promises);

    return mergingResult;
};

const enrollInternsToCourse = async (data: InternCourseData) => {
    const { courseCipher, participants } = data;
    
    const recordsToCreate = [];
    const targetCourseData = await db.course.findUnique({ where: { courseCipher } });

    if (!targetCourseData) {
        return { message: `Course ${courseCipher} not found`};
    }

    for (const internRole in participants) {
        const processedInternsExplorerIds = participants[internRole];
        const classRoleId = getClassRoleDatabaseIdByNameFromSheets(internRole);

        const internsData = await db.intern.findMany({
            where: {
                explorerId: {
                    in: processedInternsExplorerIds
                }
            }
        });


        const targetRecordsToCreate = internsData.map(intern => {
            return { courseId: targetCourseData.id,  internId: intern.id, classRoleId }
        });

        recordsToCreate.push(...targetRecordsToCreate);
    }

    const enrollingResult = await db.internCourseRole.createMany({ data: recordsToCreate, skipDuplicates: true });
    
    return enrollingResult;
}

const getClassRoleDatabaseIdByNameFromSheets = (roleName: string) => {
    if (roleName === 'o') {
        return 3;
    }

    return roleName === 'f' ? 1 : 2;
};

export default {
    mergeCourseData,
    mergeInternCourseData
};