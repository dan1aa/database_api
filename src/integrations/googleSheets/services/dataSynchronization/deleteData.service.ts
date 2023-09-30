import { db } from '@utils/db.server';
import { BadRequestError } from '@utils/exeptions/ApiErrors';

const deleteRequstetData = async (tableName: string, data: any[]) => {
    switch (tableName) {
        case 'intern':
            await deleteRowsFromInternTable(data);
            break;
        case 'course':
            await deleteRowsFromCourseTable(data);
            break;
        default:
            throw new BadRequestError(`Unknown table name: ${tableName}`);
    }
};

const deleteRowsFromInternTable = async (data: any[]) => {
    const targetIds = data.map(internData => internData.id);

    const existingIds = await db.intern.findMany({
        where: {
            id: {
                in: targetIds,
            },
        },
        select: {
            id: true,
        },
    });

    const existingTargetIds = targetIds.filter(id => existingIds.some(existingId => existingId.id === id));


    const result = await db.intern.deleteMany({
        where: {
            id: {
                in: existingTargetIds,
            },
        },
    });

    return result;
};

const deleteRowsFromCourseTable = async (data: any[]) => {
    const targetIds = data.map(courseData => courseData.id);

    const existingIds = await db.course.findMany({
        where: {
            id: {
                in: targetIds,
            },
        },
        select: {
            id: true,
        },
    });

    const existingTargetIds = targetIds.filter(id => existingIds.some(existingId => existingId.id === id));

    const result = await db.course.deleteMany({
        where: {
            id: {
                in: existingTargetIds,
            },
        },
    });

    return result;
};

export default deleteRequstetData;