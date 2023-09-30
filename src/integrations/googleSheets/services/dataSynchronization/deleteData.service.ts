import { db } from '@utils/db.server';
import { BadRequestError } from '@utils/exeptions/ApiErrors';

const deleteRequestedData = async (tableName: string, data: any[]) => {
    switch (tableName) {
        case 'intern':
            await deleteRowsFromInternTable(data);
            break;
        case 'course':
            await deleteRowsFromCourseTable(data);
            break;
        case 'intern_course': 
            console.log("NIKITA PAY ATTENTION");
            break;
        default:
            throw new BadRequestError(`Unknown table name: ${tableName}`);
    }
};

const deleteRowsFromInternTable = async (data: any[]) => {
    const targetIds = data.map(internData => internData.explorer_id);
    const result = await db.intern.deleteMany({
        where: {
            explorer_id: {
                in: targetIds,
            },
        },
    });

    return result;
};

const deleteRowsFromCourseTable = async (data: any[]) => {
    const targetIds = data.map(courseData => courseData.course_name);
    const deleteResult = await db.course.deleteMany({
        where: {
            course_name: {
                in: targetIds,
            },
        },
    });

    return deleteResult;
};

export default deleteRequestedData;