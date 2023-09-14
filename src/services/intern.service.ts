import { db } from '../utils/db.server';

interface FilteringParams {
    cohort?: string,
    course_id?: string
};

export const getInternById = async (id: number) => {
    return await db.intern.findUnique({
        where: {
            id,
        },
    });
};

export const filterInterns = async (filteringParams: FilteringParams) => {
    const result = await db.intern.findMany({
        where: {
            cohort: filteringParams.cohort,
            course_intern: {
                some: {
                    course: {
                        course_id: filteringParams.course_id,
                    },
                },
            },
        },
    });

    return result;
};