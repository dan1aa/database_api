import app from '../../src/utils/app';
import request from 'supertest';

describe('/interns', () => {
    describe('GET /interns/:id', () => {
        it('Intern id is zero', async () => {
            const id = 0;
            await request(app).get(`/api/interns/${id}`).expect(400);
        });

        it('Intern id is less than zero', async () => {
            const id = -10;
            await request(app).get(`/api/interns/${id}`).expect(400);
        });
    });
});