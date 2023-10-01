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
                throw new BadRequestError(`There is a unique constraint violation, a new user cannot be created with this email: ${contactData.email}`);
            }
        }
        throw error;
    }
};

export const createListOfContacts = async (listOfContactsData: Prisma.ContactCreateInput[]) => {
    const result = {
        createdContacts: 0,
        errors: []
    };

    for (let contactData of listOfContactsData) {
        try {
            const createdContact = await db.contact.create({ data: contactData });
            result.createdContacts += 1;
        } catch(error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                
                }
            }
        }
    }

    return result;
};

export const getContactById = async (id: number) => {
    const findingResult = await db.contact.findUnique({ where: { id } });

    if (!findingResult) {
        throw new NotFoundError(`Contact with id: ${id} dosen't exist`);
    }

    return findingResult;
};

export const updateContactById = async (id: number, updatedData: Prisma.ContactUpdateInput) => {
    
};

export const deleteContactById = async (id: number) => {
    const result = await db.contact.delete({ where: { id } })

    return result;
};

