import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app.js';

const testUser = {
    name: 'Test User',
    email: `test${Date.now()}@test.com`,
    password: 'password123'
};

let token = '';

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Auth Routes', () => {

    test('POST /api/auth/register → should create user and return token', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send(testUser);

        expect(res.status).toBe(201);
        expect(res.body.token).toBeDefined();
        expect(res.body.User.email).toBe(testUser.email);
        token = res.body.token;
    });

    test('POST /api/auth/register → should fail if email already exists', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send(testUser);

        expect(res.status).toBe(400);
        expect(res.body.message).toBe('user already exist');
    });

    test('POST /api/auth/login → should login and return token', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({ email: testUser.email, password: testUser.password });

        expect(res.status).toBe(200);
        expect(res.body.token).toBeDefined();
    });

    test('POST /api/auth/login → should fail with wrong password', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({ email: testUser.email, password: 'wrongpassword' });

        expect(res.status).toBe(400);
    });

    test('GET / → should return API running message', async () => {
        const res = await request(app).get('/');
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('SOP API running');
    });

});