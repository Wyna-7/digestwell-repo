const request = require('supertest');
const { sequelize } = require('../models');
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const router = require('../router');
const { describe } = require('node:test');

app.use(express.json());
app.use(cookieParser());
app.use(router);

//Do these two beforeAll need to be separated?
beforeAll(async () => {
  await sequelize.authenticate();
});

beforeAll(async () => {
  await sequelize.sync({ force: true });
  const response = await request(app)
    .post('/register')
    .send({ email: 'test2@email.com', password: '123', firstName: 'John', lastName: 'Doe' });

  const loginResponse = await request(app).post('/login').send({ email: 'test2@email.com', password: '123' });

  authCookie = loginResponse.headers['set-cookie'].pop().split(';')[0];
});

afterAll(async () => {
  await sequelize.close();
});

describe('Register new user, login, auth and logout', () => {
  it('should save a new user and return the userId', async () => {
    const response = await request(app)
      .post('/register')
      .send({ email: 'test@email.com', password: '123', firstName: 'John', lastName: 'Doe' });
    expect(response.status).toBe(201);
    expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('userId', 2);
  });

  it('should login, set a cookie with the session and return the userId', async () => {
    const response = await request(app).post('/login').send({ email: 'test@email.com', password: '123' });
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    expect(response.body).toBeInstanceOf(Object);
    expect(response.headers['set-cookie'][0].includes('sessionId')).toBe(true);
    expect(response.body).toHaveProperty('userId', 2);
  });
});

describe('Auth and logout tests', () => {
  beforeEach(async () => {
    await request(app).post('/login').send({ email: 'test@email.com', password: '123' });
  });
  // login should fail for users that are not registered
  it('should auth, validate the cookie and return the userId', async () => {
    expect(response.headers['set-cookie'][0].includes('sessionId')).toBe(true);
    const authResponse = await request(app).get('/auth');
    console.log('--------', response);
    expect(response.headers['set-cookie'][0].includes('sessionId')).toBe(true);
    expect(response.body).toHaveProperty('userId', 2);
  });
  // auth should fail for users that are not logged in
  it('should logout, clear the cookie and return a message', async () => {});
});

describe('Symptoms CRUD', () => {
  // need to login before saving a new symptom
  it('should save a new symptom', async () => {
    const response = await request(app)
      .post('/symptoms')
      .set('Cookie', authCookie)
      .send({ userId: 1, stool_type: 'Type 1', is_bleeding: true, other_symptoms: '' });
    expect(response.status).toBe(201);
  });
  it('should get all symptoms for a user', async () => {});
  it('should delete a symptom', async () => {});
  it('should update a symptom', async () => {});
});

describe('Items CRUD', () => {
  it('should save a new item', async () => {});
  it('should get all items for a user', async () => {});
  it('should delete an item', async () => {});
  it('should update an item', async () => {});
});
