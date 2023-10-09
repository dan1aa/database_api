import { Prisma } from '@prisma/client';

import { db } from '@utils/db.server';
import { BadRequestError, NotFoundError } from '@utils/exeptions/ApiErrors';

export const createContact = async (contactData: Prisma.ContactCreateInput) => {
    try {
        const createdContact = await db.contact.create({ data: contactData });
        return  createdContact;
    } catch(error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                throw new BadRequestError(`Contact with email ${contactData.email} already exist`);
            }
        }
        throw error;
    }
};

export const getContactById = async (id: number) => {
    const findingResult = await db.contact.findUnique({ where: { id } });

    if (!findingResult) {
        throw new NotFoundError(`Contact with id ${id} dosen't exist`);
    }

    return findingResult;
};

export const updateContactById = async (id: number, data: Prisma.ContactUpdateInput) => {
    try {
        const result = await db.contact.update({ where: { id }, data: data });
        return result;
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                throw new NotFoundError(`Contact with id ${id} dosen't exist`);
            } else if (error.code === 'P2002') {
                throw new BadRequestError(`Contact with email ${data.email} already exist`);
            }
        }
        throw error;
    }
};

export const deleteContactById = async (id: number) => {
    try {
        const result = await db.contact.delete({ where: { id } })
        return result;
    } catch(error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                throw new NotFoundError(`Contact with id ${id} doesn't exist`);
            }
        }
        throw error;
    }
};

export const getContactsList = async (from: number, to: number) => {
    const result = await db.contact.findMany({
        skip: from,
        take: to - from
    });

    return result;
};

export const bulkingCreation = async (listOfContactsData: Prisma.ContactCreateInput[]) => {
    const errors = [];
    let createdContactsCount = 0;

    for (let contactData of listOfContactsData) {
        try {
            const createdContact = await db.contact.create({ data: contactData });
            createdContactsCount += 1;
        } catch(error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    errors.push({ msg: `Contact with email ${contactData.email} already exist` });
                    continue;
                }
            }

            errors.push({ msg: (error as Error).message });
        }
    }

    return errors.length > 0 ? { createdContactsCount, errors } : { createdContactsCount };
};

