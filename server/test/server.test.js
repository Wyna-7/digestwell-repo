const request = require('supertest');
const { sequelize } = require('../models');
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const router = require('../router');

app.use(express.json());
app.use(cookieParser());
app.use(router);

beforeAll(async () => {
  await sequelize.authenticate();
});

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.sync({ force: true });
  await sequelize.close();
});


describe('Register new user, login, auth and logout', () => {
  it('should save a new user and return the userId', async () => {
    const response = await request(app)
      .post('/register')
      .send({'email': 'test@email.com', 'password': '123', 'firstName': 'John', 'lastName': 'Doe'});
    expect(response.status).toBe(201);
    expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('userId', 1);
  });
  it('should login, set a cookie with the session and return the userId', async () => {
    const response = await request(app)
      .post('/login')
      .send({'email': 'test@email.com', 'password': '123'});
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('userId', 1);
  });
  // login should fail for users that are not registered
  it('should auth, validate the cookie and return the userId', async () => {});
  // auth should fail for users that are not logged in
  it('should logout, clear the cookie and return a message', async () => {});
});

describe('Symptoms CRUD', () => {
  // need to login before saving a new symptom
  it('should save a new symptom', async () => {
    const response = await request(app)
      .post('/symptoms')
      .send({'userId': 1, 'name': 'Headache', 'description': 'Pain in the head', 'severity': 5});
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