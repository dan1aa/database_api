import { InternCourse, Prisma } from '@prisma/client';
import { db } from '@utils/db.server';

type AnyObject = { // fuck typescript I don`t have permision to use object in prisma without that type
    [key: string]: any
}

const tables: AnyObject = { // I need it in dynamic deleteRowsFromStaticTables func
    'intern': db.intern,
    'course': db.course,
    'classEvent': db.classEvent,
    'internCourse': db.internCourse
}
const nonStaticTables: string[] = ['internCourse'] // more will be added soon, like eventInternBadge , the tables which has many fields to filter by, not only id

const nonStaticDeletes: AnyObject = { // Same thing, dynamic functions for non-static tables
    'internCourse': deleteRowsFromInternCourseTable
}


const deleteRequestedData = async (tableName: string, data: any[]) => {
    if(nonStaticTables.includes(tableName)) return await nonStaticDeletes[tableName](data) 
    await deleteRowsFromStaticTables(data, tableName) 
    // Sorry Nikita, I can`t find better way, if you can do somehow else pls do it
}; 

const deleteRowsFromStaticTables = async (data: any[], tableName: string) => {
    const targetIds = data.map(data => data.id);

    const existingIds = await tables[tableName].findMany({
        where: {
            id: {
                in: targetIds,
            },
        },
        select: {
            id: true,
        },
    });


    const existingTargetIds = targetIds.filter(id => existingIds.some((existingId: any) => existingId.id === id));

    const result = await tables[tableName].deleteMany({
        where: {
            id: {
                in: existingTargetIds,
            },
        },
    });

    return result;
}

async function deleteRowsFromInternCourseTable (internCourses: InternCourse[]) {
    for (let internCourse of internCourses) {

        try {
            await db.internCourse.deleteMany({
                where: internCourse
            })

        } catch(error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2003') continue;
            }
        }
    }
}

export default deleteRequestedData;