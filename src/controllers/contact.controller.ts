import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import * as ContactService from '@services/contact.service';

export const createContact = async (req: Request, res: Response) => {
    const contactData = req.body;

    const createdContact = await ContactService.createContact(contactData);

    res.status(StatusCodes.CREATED).json(createdContact).end();
};

export const getContactById = async (req: Request, res: Response) => {
    const contactId = Number(req.params.id);

    const contactData = await ContactService.getContactById(contactId);

    res.status(StatusCodes.OK).json(contactData).end();
};

export const updateContactById = async (req: Request, res: Response) => {
    const contactData = req.body;
    const contactId = Number(req.params.id);
    
    const updatedContact = await ContactService.updateContactById(contactId, contactData);

    res.status(StatusCodes.OK).json(updatedContact).end();
};

export const deleteContactById = async (req: Request, res: Response) => {
    const contactId = Number(req.params.id);

    const deletedContact = await ContactService.deleteContactById(contactId);

    res.status(StatusCodes.OK).json(deletedContact).end();
};

export const getContactsList = async (req: Request, res: Response) => {
    const contactsList = await ContactService.getContactsList();

    res.status(StatusCodes.OK).json(contactsList).end();
};

export const bulkingCreation = async (req: Request, res: Response) => {
    const contactsData = req.body;
    
    const result = await ContactService.bulkingCreation(contactsData);

    res.status(StatusCodes.OK).json(result).end();
};
