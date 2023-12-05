import { Contact, Prisma } from '@prisma/client';

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

export const getContactById = async (id: number): Promise<Contact | null> => {
    const contact: Contact | null = await db.contact.findUnique({ where: { id } });

    if (!contact) {
        throw new NotFoundError(`Contact with id ${id} doesn't exist`);
    }

    return contact;
};

export const updateContactById = async (id: number, data: Prisma.ContactUpdateInput): Promise<Contact | null> => {
    const updatedContact: Contact | null = await db.contact.update({ where: { id }, data: data });

    return updatedContact;
};

export const deleteContactById = async (id: number): Promise<Contact | null> => {
    const deletedContact: Contact | null = await db.contact.delete({ where: { id } })

    return deletedContact;
};

export const getContactsList = async (from: number, to: number): Promise<Contact[] | null> => {
    const contactsList: Contact[] | null = await db.contact.findMany({
        skip: from,
        take: to - from
    });

    return contactsList;
};

export const bulkingCreation = async (contactsData: Prisma.ContactCreateInput[]) => {
    const errors = [];
    let createdContactsCount = 0;

    for (let contactData of contactsData) {
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

