import request from 'supertest';
import { prismaMock } from '../setup-tests';
import { app } from '../../src/utils/app';
import { StatusCodes } from 'http-status-codes';
import * as InternService from '../../src/services/intern.service';
import { NotFoundError } from '../../src/utils/exeptions/ApiErrors';
import { Prisma } from '@prisma/client';


describe('Testing "/api/interns"', () => {
    describe('GET "/api/interns:id"', () => {
        it('Should return intern by id', async () => {
            const mockData = { 
                id: 2,
                first_name: 'John',
                last_name: 'Doe',
                email: 'john@example.com',
                cohort: '2023A',
                explorer_id: '12345',
                discord_id: 'john_doe#123', 
            };

            prismaMock.intern.findUnique.mockResolvedValue(mockData);

            const response = await request(app).get('/api/interns/2');

            expect(response.status).toBe(StatusCodes.OK);
            expect(response.body).toEqual(mockData);
        });

        it('Should return error for invalid id', async () => {
            const response = await request(app).get('/api/interns/-3');

            expect(response.status).toBe(StatusCodes.BAD_REQUEST);
            expect(response.body).toEqual({ msg: 'Invalid id parametr' });
        });

        it('Should return error if intern by id doesn`t exist', async () => {
            const requestedInternId = 2;

            const response = await request(app).get(`/api/interns/${requestedInternId}`);
            jest.spyOn(InternService, 'getInternById').mockImplementation(() => {
                throw new NotFoundError(`Intern with id = ${requestedInternId} doesn't exist`);
            });

            expect(response.status).toBe(StatusCodes.NOT_FOUND);
            expect(response.body).toEqual({ msg: `Intern with id = 2 doesn't exist`});
        });
    });

    describe('POST "/api/interns"', () => {
        const requestData = { 
            first_name: 'John',
            last_name: 'Doe',
            email: 'john@example.com',
            cohort: '2023A',
            explorer_id: '12345',
            discord_id: 'john_doe#123', 
        };

        it('Should create intern', async () => {
            const expectedResult = {id: 1, ...requestData};

            jest.spyOn(InternService, 'createIntern').mockResolvedValue(expectedResult);

            const response = await request(app).post('/api/interns').send(requestData);

            expect(response.status).toBe(StatusCodes.CREATED);
            expect(response.body).toEqual(expectedResult);
        });

        it('Should handle unique constraint violation error', async () => {
            prismaMock.intern.create.mockRejectedValue(
              new Prisma.PrismaClientKnownRequestError('Unique constraint violation', {
                code: 'P2011',
                clientVersion: 'your-client-version-here'
              })
            );
          
            const response = await request(app).post('/api/interns').send(requestData);
            expect(response.status).toBe(StatusCodes.BAD_REQUEST);
          });

        it('Should handle handle other errors', async () => {
            jest.spyOn(InternService, 'createIntern').mockImplementation(() => {
                throw new Error('Custom error');
            });

            const response = await request(app).post('/api/interns').send(requestData);
            expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
            expect(response.body).toEqual({ msg: 'Internal server error' });
        });
    })
});