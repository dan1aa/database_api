import { Prisma } from '@prisma/client';

import { db } from '@utils/db.server';
import { NotFoundError } from '@utils/exeptions/ApiErrors';
import { FilteringParams, InternCreateInput, InternUpdateInput } from 'types/types';


export const createInternCourse = async (internCourse: any) => {    
    const result = await db.internCourse.create({data: internCourse})
    return result;
}

export const createIntern = async (internData: InternCreateInput) => {
    const result = await db.intern.create({ data: internData });
    return result;
};

export const getInternById = async (id: number) => {
    const result = await db.intern.findUnique({ where: { id } });
    
    if (!result) {
        throw new NotFoundError(`Intern with id ${id} dosen't exist`);
    }

    return result;
};

export const deleteInternById = async (id: number) => {
    const result = await db.intern.delete({ where: { id } });
    return result;
};

export const updateInternById = async (id: number, data: InternUpdateInput) => {    
    const result = await db.intern.update({ where: { id }, data: data });
    return result;
};

export const getInternsList = async (filteringParams: FilteringParams) => {
    const result = await db.intern.findMany({
        where: {
            cohort: filteringParams.cohort,
            internCourse: {
                some: {
                    course: {
                        courseCipher: filteringParams.courseCipher,
                    },
                },
            },
        },
    });

    return result;
};

export const synchronizeDiscordData = async (discordData: { discordNickname: string, discordId: string }[]) => {
    const errors = [];
    let updatedInterns = 0;

    for (let data of discordData) {
        try {
            const updatedIntern = await db.intern.update({
                where: { discordNickname: data.discordNickname },
                data: { discordId: data.discordId }
            });

            updatedInterns += 1;
        } catch(error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    errors.push({ msg: `Intern with discordNickname ${data.discordNickname} doesn't exist` });
                }
            }
        };
    };

    return errors.length > 0 ? { updatedInterns, errors } : { updatedInterns };
};