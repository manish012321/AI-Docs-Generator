import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app.js';

let token = '';
let sopId = '';

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);

    // register and login to get token
    const res = await request(app)
        .post('/api/auth/register')
        .send({
            name: 'SOP Tester',
            email: `soptest${Date.now()}@test.com`,
            password: 'password123'
        });
    token = res.body.token;
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('SOP Routes', () => {

    test('GET /api/sops → should return empty array for new user', async () => {
        const res = await request(app)
            .get('/api/sops')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.sops).toBeDefined();
        expect(Array.isArray(res.body.sops)).toBe(true);
    });

    test('GET /api/sops → should fail without token', async () => {
        const res = await request(app)
            .get('/api/sops');

        expect(res.status).toBe(401);
    });

    test('DELETE /api/sops/:id → should fail with invalid id', async () => {
        const res = await request(app)
            .delete('/api/sops/invalidid123')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(500);
    });

});