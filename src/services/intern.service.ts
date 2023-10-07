import { Prisma } from '@prisma/client';

import { db } from '@utils/db.server';
import { BadRequestError, NotFoundError } from '@utils/exeptions/ApiErrors';

interface InternCreateInput {
    explorerId: string;
    explorerMail: string;
    explorerPassword: string;
    discordId: string;
    cohort: string;
    contactId: number;
};

interface InternUpdateInput {
    explorerId?: string;
    explorerMail?: string;
    explorerPassword?: string;
    discordId?: string;
    cohort?: string;
    contactId?: number;
};

export const createIntern = async (internData: InternCreateInput) => {
    try {
        const result = await db.intern.create({ data: internData });
        return result;
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                throw new BadRequestError(`Intern with explorerId ${internData.explorerId} already exist`);
            }
            if (error.code === 'P2003') {
                throw new NotFoundError(`Contact with id ${internData.contactId} dosen't exist`);
            }
        }
        throw error;
    }
};

export const getInternById = async (id: number) => {
    const result = await db.intern.findUnique({ where: { id } });
    
    if (!result) throw new NotFoundError(`Intern with id ${id} dosen't exist`);

    return result;
};

export const deleteInternById = async (id: number) => {
    try {
        const result = await db.intern.delete({ where: { id } });
        return result;
    } catch(error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                throw new NotFoundError(`Intern with id ${id} dosen't exist`);
            }
        }
        throw error;
    }
};

export const updateInternById = async (id: number, data: InternUpdateInput) => {
    try {
        const result = await db.intern.update({ where: { id }, data: data });
        return result;
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                throw new NotFoundError(`Intern with id ${id} dosen't exist`);
            }
            if(error.code === 'P2003') {
                throw new NotFoundError(`Contact with id ${data.contactId} dosen't exist`);
            }
        }
        throw error;
    }
};

export const getInternsList = async (filteringParams: { cohort?: string, courseCipher?: string }) => {
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