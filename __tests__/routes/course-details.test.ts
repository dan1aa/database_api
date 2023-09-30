import request from 'supertest';
import { app } from '../../src/utils/app';
import { prismaMock } from '../setup-tests';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../../src/utils/exeptions/ApiErrors';

import * as CourseDetailsService from '../../src/services/course-details.service';


describe('Testing course-details route', () => {
    describe('Get details about one course', () => {
        it('Should return one course data in requst "/api/course-details/IWD336"', async () => {
            const mockData = {
                courseName: 'IWD336',
                startDate: '6/6/2023',
                endDate: '6/6/2023',
                schedule: [
                    {
                        meetNumber: 1,
                        eventDate: '6/6/2023',
                    },
                    {
                        meetNumber: 2,
                        eventDate: '7/7/2023',
                    },
                ],
                participantsInfo: [
                    {
                        id: 'id',
                        firstName: 'firstName',
                        lastName: 'lastName',
                        email: 'email',
                        cohort: 'cohort',
                        explorerId: 'explorerId',
                        discordId: 'discordId',
                    },
                ],
            };

            jest.spyOn(CourseDetailsService, 'getCourseDetailsByName').mockResolvedValue(mockData);

            const response = await request(app).get('api/course-details/IWD336');

            expect(response.body).toEqual(mockData);
            expect(response.status).toBe(StatusCodes.OK);
        });

        it('Should return error if course doesn`t exist', async () => {
            const requestedCourseName = 'IWD336';
            const response = await request(app).get(`/api/course-details/${requestedCourseName}`);

            prismaMock.course.findUnique.mockImplementation(() => {
                throw new NotFoundError(`Course with name ${requestedCourseName} doesn't exist`)
            });

            expect(response.status).toBe(StatusCodes.NOT_FOUND);
            expect(response.body).toEqual({ msg:  `Course with name ${requestedCourseName} doesn't exist`});
        });
    });
})