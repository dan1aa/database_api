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
    const result = await db.intern.deleteMany({
        where: {
            id: {
                in: targetIds,
            },
        },
    });

    return result;
};

const deleteRowsFromCourseTable = async (data: any[]) => {
    const targetIds = data.map(courseData => courseData.id);
    const deleteResult = await db.course.deleteMany({
        where: {
            id: {
                in: targetIds,
            },
        },
    });

    return deleteResult;
};

export default deleteRequstetData;