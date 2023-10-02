import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { prismaMock } from '../../setup-tests';
import * as InternService from '../../../src/services/intern.service';
import { BadRequestError, NotFoundError } from '../../../src/utils/exeptions/ApiErrors';

describe('Intern service', () => {
    describe('Create intern', () => {
        const mockedRequestData = {
            explorerId: 'explorerId',
            explorerMail: 'explorerId@gmail.com',    
            explorerPassword: 'password123', 
            discordId: 'someDiscordId',       
            cohort: 'SEP 2023',
            contactId: 34
        };

        it('Should return created intern', async () => {
            const expectedResult = {id: 2, ...mockedRequestData};
            jest.spyOn(InternService, 'createIntern').mockResolvedValue(expectedResult);
            const creationResult = await InternService.createIntern(mockedRequestData);

            expect(creationResult).toEqual(expectedResult);
        });

        it('Should return error if try create intern with existing explorerId', async () => {
            prismaMock.intern.create.mockImplementation(() => {
                throw new PrismaClientKnownRequestError('Error', { code: 'P2002', clientVersion: 'some client version' });
            });

            await expect(InternService.createIntern(mockedRequestData)).rejects.toThrowError(new BadRequestError(`Intern with explorerId ${mockedRequestData.explorerId} already exist`));
        });

        it('Should return error if try create intern with contact that dosen`t exist', async () => {
            const { contactId } = mockedRequestData;

            prismaMock.intern.create.mockImplementation(() => {
                throw new PrismaClientKnownRequestError('Error', { code: 'P2003', clientVersion: 'some client version' });
            });

            await expect(InternService.createIntern(mockedRequestData)).rejects.toThrowError(new NotFoundError(`Contact with id ${contactId} dosen't exist`));
        });
    });

    describe('Get intern by id', () => {
        const mockedData = {
            id: 1,
            explorerId: 'explorerId',
            explorerMail: 'explorerId@gmail.com',    
            explorerPassword: 'password123', 
            discordId: 'someDiscordId',       
            cohort: 'SEP 2023',
            contactId: 34
        };

        it('Should retrun contact', async () => {
            prismaMock.intern.findUnique.mockResolvedValue(mockedData);
            const result = await InternService.getInternById(1);

            expect(result).toEqual(mockedData);
        });

        it('Should return error if intern dosen`t exist', async () => {
            prismaMock.intern.findUnique.mockResolvedValue(null);
            await expect(InternService.getInternById(1)).rejects.toThrowError(new NotFoundError(`Intern with id ${mockedData.id} dosen't exist`));
        });
    });

    describe('Delete intern by id', () => {
        const mockedData = {
            id: 1,
            explorerId: 'explorerId',
            explorerMail: 'explorerId@gmail.com',    
            explorerPassword: 'password123', 
            discordId: 'someDiscordId',       
            cohort: 'SEP 2023',
            contactId: 34
        };

        it('Should delete intern', async () => {
            prismaMock.intern.delete.mockResolvedValue(mockedData); 
            const result = await InternService.deleteInternById(1);

            expect(result).toEqual(mockedData);
        });

        it('Should handle error if intern with given id dosen`t exist', async () => {
            prismaMock.intern.delete.mockImplementation(() => {
                throw new PrismaClientKnownRequestError('Error', { code: 'P2025', clientVersion: 'some client version' });
            });

            await expect(InternService.getInternById(1)).rejects.toThrowError(new NotFoundError(`Intern with id ${mockedData.id} dosen't exist`));
        });
    });

    describe('Updete intern by id', () => {
        const mockedData = {
            explorerId: 'explorerId',
            explorerMail: 'explorerId@gmail.com',    
            explorerPassword: 'password123', 
            discordId: 'someDiscordId',       
            cohort: 'SEP 2023',
            contactId: 34
        };

        it('Should update intern', async () => {
            const expectedValue = {id: 1, ...mockedData};
            prismaMock.intern.update.mockResolvedValue(expectedValue);
            const updatedIntern = await InternService.updateInternById(1, mockedData);

            expect(updatedIntern).toEqual(updatedIntern);
        });

        it('Should return error if contact with id dosen`t exist', async () => {
            const requestedId = 1;
            prismaMock.intern.update.mockImplementation(() => {
                throw new PrismaClientKnownRequestError('Error', { code: 'P2025', clientVersion: 'some client version' });
            });

            await expect(InternService.updateInternById(requestedId, mockedData)).rejects.toThrowError(new NotFoundError(`Intern with id ${requestedId} dosen't exist`));
        });

        it('Should return error if try update contactId that dosen`t exist', async () => {
            const requestedId = 1;
            prismaMock.intern.update.mockImplementation(() => {
                throw new PrismaClientKnownRequestError('Error', { code: 'P2003', clientVersion: 'some client version' });
            });

            await expect(InternService.updateInternById(requestedId, mockedData)).rejects.toThrowError(new NotFoundError(`Contact with id ${mockedData.contactId} dosen't exist`));
        });
    });

    describe('Get interns list', () => {
        const mockedData = [
            {
                id: 1,
                explorerId: 'explorerId',
                explorerMail: 'explorerId@gmail.com',    
                explorerPassword: 'password123', 
                discordId: 'someDiscordId',       
                cohort: 'SEP 2023',
                contactId: 34
            }, 
            {
                id: 2,
                explorerId: 'explorerId',
                explorerMail: 'explorerId@gmail.com',    
                explorerPassword: 'password123', 
                discordId: 'someDiscordId',       
                cohort: 'SEP 2023',
                contactId: 35
            }
        ];

        it('Should retrun list of interns', async () => {
            prismaMock.intern.findMany.mockResolvedValue(mockedData);
            const result = await InternService.getInternsList({ cohort: undefined, courseCipher: undefined  });

            expect(result).toEqual(mockedData);
        });

        it('Should return empty array if nothing find', async () => {
            prismaMock.intern.findMany.mockResolvedValue([]);
            const result = await InternService.getInternsList({ cohort: undefined, courseCipher: undefined  });

            expect(result).toEqual([]);
        });
    });
});