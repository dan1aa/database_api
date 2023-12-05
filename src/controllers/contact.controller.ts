import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import * as ContactService from '@services/contact.service';
import * as IpGeolocationService from '@services/ip-geolocation.service';
import { Contact } from '@prisma/client';

export const createContact = async (req: Request, res: Response) => {
    const requestContactData = req.body;
    const userIpAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    const userLocation = await IpGeolocationService.getLocationByIpAddress(userIpAddress);

    if (userLocation && (userLocation['country_name'] === 'Russia' || userLocation['country_name'] === 'Belarus')) {
        //TODO: using mail service, it is needed to sent mail with stop war message
        return res.status(StatusCodes.FORBIDDEN).json('It is not possible to create a contact from Russia or Belarus').end();
    }

    const contactData = {...requestContactData, city: userLocation?.city}
    const createdContact = await ContactService.createContact(contactData);

    res.status(StatusCodes.CREATED).json(createdContact).end();
};

export const getContactById = async (req: Request, res: Response) => {
    const contactId = Number(req.params.id);

    const contact: Contact | null = await ContactService.getContactById(contactId);

    res.status(StatusCodes.OK).json(contact).end();
};

export const updateContactById = async (req: Request, res: Response) => {
    const contactData = req.body;
    const contactId = Number(req.params.id);
    
    const updatedContact: Contact | null = await ContactService.updateContactById(contactId, contactData);

    res.status(StatusCodes.OK).json(updatedContact).end();
};

export const deleteContactById = async (req: Request, res: Response) => {
    const contactId = Number(req.params.id);

    const deletedContact: Contact | null = await ContactService.deleteContactById(contactId);

    res.status(StatusCodes.OK).json(deletedContact).end();
};

export const getContactsList = async (req: Request, res: Response) => {
    const from = Number(req.query.from) || 0;
    const to = Number(req.query.to) || 250;

    const contactsList: Contact[] | null = await ContactService.getContactsList(from, to);

    res.status(StatusCodes.OK).json(contactsList).end();
};

export const bulkingCreation = async (req: Request, res: Response) => {
    const contactsData = req.body;
    
    const createdContacts = await ContactService.bulkingCreation(contactsData);

    res.status(StatusCodes.OK).json(createdContacts).end();
};
