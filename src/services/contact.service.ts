import { Prisma } from '@prisma/client';

import { db } from '@utils/db.server';
import { NotFoundError } from '@utils/exeptions/ApiErrors';


export const createContact = async (contactData: Prisma.ContactCreateInput) => {
    try {
        const createdContact = await db.contact.create({ data: contactData });
        return  createdContact;
    } catch(error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            // Contact with email contactData.email already exist
            const targetContact = await db.contact.findUnique({ where: { email: contactData.email!} });
            const updatedContact = await updateContactById(targetContact!.id, contactData);
            return updatedContact;
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
    const result = await db.contact.update({ where: { id }, data: data });
    return result;
};

export const deleteContactById = async (id: number) => {
    const result = await db.contact.delete({ where: { id } })
    return result;
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

