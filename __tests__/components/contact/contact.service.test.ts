import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { prismaMock } from '../../setup-tests';
import * as ContactService from '../../../src/services/contact.service';
import { BadRequestError, NotFoundError } from '../../../src/utils/exeptions/ApiErrors';

describe('Contact service', () => {
    describe('Create contact', () => {
        const mockedRequestData = {
            firstName: 'TestName',
            lastName: 'LastName',
            email: 'testMail',
            age: 16,
            country: 'testCountry',
            timezone: 'GMT+5',
            sourceOfReferral: 'Instagram',
            eduQuestSelectedDateTime: new Date(),
            eduQuestDecision: null
        };

        it('Should create contact', async () => {
            const expectedResult = {id: 2, ...mockedRequestData};
            jest.spyOn(ContactService, 'createContact').mockResolvedValue(expectedResult);
            const createdContact = await ContactService.createContact(mockedRequestData);

            expect(createdContact).toEqual(expectedResult);
        });

        it('Should return error of existing contact with unique field', async () => {
            prismaMock.contact.create.mockImplementation(() => {
                throw new PrismaClientKnownRequestError('Error', { code: 'P2002', clientVersion: 'some client version' });
            });

            await expect(ContactService.createContact(mockedRequestData)).rejects.toThrowError(new BadRequestError(`Contact with email ${mockedRequestData.email} already exist`));
        });
    });

    describe('Get contact by id', () => {
        const mockedData = {
            id: 1,
            firstName: 'TestName',
            lastName: 'LastName',
            email: 'testMail',
            age: 16,
            country: 'testCountry',
            timezone: 'GMT+5',
            sourceOfReferral: 'Instagram',
            eduQuestSelectedDateTime: new Date(),
            eduQuestDecision: null
        };

        it('Should return contact', async () => {
            prismaMock.contact.findUnique.mockResolvedValue(mockedData);
            const result = await ContactService.getContactById(1);

            expect(result).toEqual(mockedData);
        });

        it('Should return error if contact dosen`t exist', async () => {
            const requestedId = 1;
            prismaMock.contact.findUnique.mockResolvedValue(null);

            await expect(ContactService.getContactById(requestedId)).rejects.toThrowError(new NotFoundError(`Contact with id ${requestedId} dosen't exist`));
        });
    });

    describe('Update contact by id', () => {
        const mockedData = {
            firstName: 'TestName',
            lastName: 'LastName',
            email: 'testMail',
            age: 16,
            country: 'testCountry',
            timezone: 'GMT+5',
            sourceOfReferral: 'Instagram',
            eduQuestSelectedDateTime: new Date(),
            eduQuestDecision: null
        };

        it('Should update contact', async () => {
            const expectedValue = {id: 1, ...mockedData};
            prismaMock.contact.update.mockResolvedValue(expectedValue);
            const updatedIntern = await ContactService.updateContactById(1, mockedData);

            expect(updatedIntern).toEqual(expectedValue);
        });

        it('Should return error if contact dosen`t exist', async () => {
            const requestedId = 1;
            prismaMock.contact.update.mockImplementation(() => {
                throw new PrismaClientKnownRequestError('Error', { code: 'P2025', clientVersion: 'some client version' });
            });

            await expect(ContactService.updateContactById(requestedId, mockedData)).rejects.toThrowError(new NotFoundError(`Contact with id ${requestedId} dosen't exist`));
        });

        it('Should return error if try update contct email that already exist', async () => {
            const requestedId = 1;
            prismaMock.contact.update.mockImplementation(() => {
                throw new PrismaClientKnownRequestError('Error', { code: 'P2002', clientVersion: 'some client version' });
            });

            await expect(ContactService.updateContactById(requestedId, mockedData)).rejects.toThrowError(new BadRequestError(`Contact with email ${mockedData.email} already exist`));
        });
    });

    describe('Delete contact by id', () => {
        const mockedData = {
            id: 1,
            firstName: 'TestName',
            lastName: 'LastName',
            email: 'testMail',
            age: 16,
            country: 'testCountry',
            timezone: 'GMT+5',
            sourceOfReferral: 'Instagram',
            eduQuestSelectedDateTime: new Date(),
            eduQuestDecision: null
        };

        it('Should delete contact', async () => {
            prismaMock.contact.delete.mockResolvedValue(mockedData);
            const result = await ContactService.deleteContactById(1);

            expect(result).toEqual(mockedData);
        });

        it('Should return error if contact dosen`t exist', async () => {
            const requestedId = 1;
            prismaMock.contact.delete.mockImplementation(() => {
                throw new PrismaClientKnownRequestError('Error', { code: 'P2025', clientVersion: 'some client version' });
            });

            await expect(ContactService.getContactById(requestedId)).rejects.toThrowError(new NotFoundError(`Contact with id ${requestedId} dosen't exist`));
        });
    });

    describe('Get list of contacts', () => {
        const mockedContactList = [
            {
                id: 1,
                firstName: 'TestName',
                lastName: 'LastName',
                email: 'testMail',
                age: 16,
                country: 'testCountry',
                timezone: 'GMT+5',
                sourceOfReferral: 'Instagram',
                eduQuestSelectedDateTime: new Date(),
                eduQuestDecision: null
            },
            {
                id: 1,
                firstName: 'TestName',
                lastName: 'LastName',
                email: 'testMail',
                age: 16,
                country: 'testCountry',
                timezone: 'GMT+5',
                sourceOfReferral: 'Instagram',
                eduQuestSelectedDateTime: new Date(),
                eduQuestDecision: null
            }
        ];

        it('Should retrun list of contacts', async () => {
            prismaMock.contact.findMany.mockResolvedValue(mockedContactList);
            const result = await ContactService.getContactsList();

            expect(result).toEqual(mockedContactList);
        });

        it('Should return empty array if contacts don`t exist', async () => {
            prismaMock.contact.findMany.mockResolvedValue([]);
            const result = await ContactService.getContactsList();

            expect(result).toEqual([]);
        });
    });

    describe('Bulk contacts creation', () => {
        it('Should create all contacts', async () => {
            const mockedData = {
                id: 1,
                firstName: 'TestName',
                lastName: 'LastName',
                email: 'testMail',
                age: 16,
                country: 'testCountry',
                timezone: 'GMT+5',
                sourceOfReferral: 'Instagram',
                eduQuestSelectedDateTime: new Date(),
                eduQuestDecision: null
            };

            const mockedContactsData = [
                {
                    firstName: 'TestName',
                    lastName: 'LastName',
                    email: 'testMail1',
                    age: 16,
                    country: 'testCountry',
                    timezone: 'GMT+5',
                    sourceOfReferral: 'Instagram',
                    eduQuestSelectedDateTime: new Date(),
                    eduQuestDecision: null
                },
                {
                    firstName: 'TestName',
                    lastName: 'LastName',
                    email: 'testMail2',
                    age: 16,
                    country: 'testCountry',
                    timezone: 'GMT+5',
                    sourceOfReferral: 'Instagram',
                    eduQuestSelectedDateTime: new Date(),
                    eduQuestDecision: null
                }
            ];

            const expectedResult = { createdContactsCount: 2 };
            prismaMock.contact.create.mockResolvedValue(mockedData);

            const result = await ContactService.bulkingCreation(mockedContactsData);

            expect(result).toEqual(expectedResult)
        });

        it('Should return error if one contacts already exist', async () => {
            const mockedContactsData = [
                {
                    firstName: 'TestName',
                    lastName: 'LastName',
                    email: 'testMail2',
                    age: 16,
                    country: 'testCountry',
                    timezone: 'GMT+5',
                    sourceOfReferral: 'Instagram',
                    eduQuestSelectedDateTime: new Date(),
                    eduQuestDecision: null
                }
            ];

            const expectedResult = {
                createdContactsCount: 0,
                errors: [{msg: `Contact with email testMail2 already exist`}],
            };

            prismaMock.contact.create.mockImplementation(() => {
                throw new PrismaClientKnownRequestError('Error', { code: 'P2002', clientVersion: 'some client version' });
            });

            const result = await ContactService.bulkingCreation(mockedContactsData);

            expect(result).toEqual(expectedResult);
        });
    });
});