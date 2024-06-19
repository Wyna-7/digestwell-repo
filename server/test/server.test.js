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

beforeEach(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
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
});