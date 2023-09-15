import { db } from '@utils/db.server';
import { NotFoundError } from '@exeptions/ApiErrors';

interface FilteringParams {
    cohort?: string,
    course_id?: string
};

export const getInternById = async (id: number) => {
    const result = await db.intern.findUnique({
        where: {
            id,
        },
    });

    if (!result) throw new NotFoundError();

    return result;
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

    if (!result) throw new NotFoundError();

    return result;
};

