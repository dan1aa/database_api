import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { prismaMock } from '../../setup-tests';
import * as ClassEventService from '../../../src/services/class-event.service';
import { BadRequestError, NotFoundError } from '../../../src/utils/exeptions/ApiErrors';


describe('Class event service', () => {
    describe('Create class event', () => {
        const mockedRequestData = {
            meetNumber: 5,
            eventDate: new Date(),
            googleMeetLink: "https://somelink",
            courseId: 1,
            classEventTypeId: 1
        };

        it('Should create class event', async () => {
            const expectedResult = { id: 1, ...mockedRequestData };
            jest.spyOn(ClassEventService, 'createClassEvent').mockResolvedValue(expectedResult);
            const createdContact = await ClassEventService.createClassEvent(mockedRequestData);

            expect(createdContact).toEqual(expectedResult);
        });

        it('Should return error if meet already exist', async () => {
            prismaMock.classEvent.create.mockImplementation(() => {
                throw new PrismaClientKnownRequestError('Error', { code: 'P2002', clientVersion: 'some client version' });
            });

            await expect(ClassEventService.createClassEvent(mockedRequestData)).rejects.toThrowError(new BadRequestError(`This meet already exist`));
        });

        it('Should return eroor if try create course event with not existing courseId', async () => {
            prismaMock.classEvent.create.mockImplementation(() => {
                throw new PrismaClientKnownRequestError('Error', { code: 'P2003', clientVersion: 'some client version', meta: { field_name: 'courseId'}});
            });

            await expect(ClassEventService.createClassEvent(mockedRequestData)).rejects.toThrowError(new NotFoundError(`Course with id ${mockedRequestData.courseId} dosen't exist`));
        });

        it('Should return eroor if try create course event with not existing classEventTypeId', async () => {
            prismaMock.classEvent.create.mockImplementation(() => {
                throw new PrismaClientKnownRequestError('Error', { code: 'P2003', clientVersion: 'some client version', meta: { field_name: 'classEventTypeId'}});
            });

            await expect(ClassEventService.createClassEvent(mockedRequestData)).rejects.toThrowError(new BadRequestError(`Class event type with id ${mockedRequestData.classEventTypeId} dosen't exist`));
        });
    });

    describe('Get class event by id', () => {
        const mockedData = {
            id: 1,
            meetNumber: 5,
            eventDate: new Date(),
            googleMeetLink: "https://somelink",
            courseId: 1,
            classEventTypeId: 1
        };

        it('Should return class event', async () => {
            prismaMock.classEvent.findUnique.mockResolvedValue(mockedData);
            const result = await ClassEventService.getClassEventById(1);

            expect(result).toEqual(mockedData);
        });

        it('Should return error if class event dosen`t exist', async () => {
            const requestedId = 1;
            prismaMock.classEvent.findUnique.mockResolvedValue(null);

            await expect(ClassEventService.getClassEventById(1)).rejects.toThrowError(new NotFoundError(`Class event with id ${requestedId} dosen't exist`));
        });
    });

    describe('Update class event by id', () => {
        const mockedRequestData = {
            meetNumber: 5,
            eventDate: new Date(),
            googleMeetLink: "https://somelink",
            courseId: 1,
            classEventTypeId: 1
        };

        it('Should update class event', async () => {
            const expectedValue = {id: 1, ...mockedRequestData};
            prismaMock.classEvent.update.mockResolvedValue(expectedValue);
            const updatedIntern = await ClassEventService.updateClassEventById(1, mockedRequestData);

            expect(updatedIntern).toEqual(updatedIntern);
        });

        it('Should return error if course event dosen`t exist', async () => {
            const requestedId = 1;
            prismaMock.classEvent.update.mockImplementation(() => {
                throw new PrismaClientKnownRequestError('Error', { code: 'P2025', clientVersion: 'some client version' });
            });

            await expect(ClassEventService.updateClassEventById(requestedId, mockedRequestData)).rejects.toThrowError(new BadRequestError(`Class event with id ${requestedId} dosen't exist`));
        });

        it('Should return error if try update courseId that dosen`t exist', async () => {
            prismaMock.classEvent.create.mockImplementation(() => {
                throw new PrismaClientKnownRequestError('Error', { code: 'P2003', clientVersion: 'some client version', meta: { field_name: 'courseId'}});
            });

            await expect(ClassEventService.createClassEvent(mockedRequestData)).rejects.toThrowError(new NotFoundError(`Course with id ${mockedRequestData.courseId} dosen't exist`));
        });

        it('Should return error if try update classEventTypeId that dosen`t exist', async () => {
            prismaMock.classEvent.create.mockImplementation(() => {
                throw new PrismaClientKnownRequestError('Error', { code: 'P2003', clientVersion: 'some client version', meta: { field_name: 'classEventTypeId'}});
            });

            await expect(ClassEventService.createClassEvent(mockedRequestData)).rejects.toThrowError(new BadRequestError(`Class event type with id ${mockedRequestData.classEventTypeId} dosen't exist`));
        });
    });

    describe('Delete class event by id', () => {
        const mockedData = {
            id: 1,
            meetNumber: 5,
            eventDate: new Date(),
            googleMeetLink: "https://somelink",
            courseId: 1,
            classEventTypeId: 1
        };

        it('Should delete class event', async () => {
            prismaMock.classEvent.delete.mockResolvedValue(mockedData); 
            const result = await ClassEventService.deleteClassEventById(1);

            expect(result).toEqual(mockedData);
        });

        it('Should return error if class event dosen`t exist', async () => {
            const requestedId = 1;
            prismaMock.classEvent.delete.mockImplementation(() => {
                throw new PrismaClientKnownRequestError('Error', { code: 'P2025', clientVersion: 'some client version' });
            });

            await expect(ClassEventService.deleteClassEventById(requestedId)).rejects.toThrowError(new NotFoundError(`Class event with id ${requestedId} doesn't exist`));
        });
    });

    describe('Get list of class events', () => {
        const mockedData = [
            {
                id: 1,
                meetNumber: 5,
                eventDate: new Date(),
                googleMeetLink: "https://somelink",
                courseId: 1,
                classEventTypeId: 1
            }, 
            {
                id: 2,
                meetNumber: 6,
                eventDate: new Date(),
                googleMeetLink: "https://somelink",
                courseId: 2,
                classEventTypeId: 3
            }
        ];

        it('Should retrun list of class events', async () => {
            prismaMock.classEvent.findMany.mockResolvedValue(mockedData);
            const result = await ClassEventService.getListOfClassEvents();

            expect(result).toEqual(mockedData);
        });

        it('Should return empty array if nothing find', async () => {
            prismaMock.classEvent.findMany.mockResolvedValue([]);
            const result = await ClassEventService.getListOfClassEvents();

            expect(result).toEqual([]);
        });
    });
});