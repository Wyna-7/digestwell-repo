## Project

Disgestwell

## Project Description

A tracker for IBD patients. It tracks food, beverages, symptoms and bowel movements.

## Setup

1. Create a `server/.env` file and add the following:

```
DB_URL = 'localhost'
DB_USER = 'your db username'
DB_PASSWORD = null or 'your db password'
PORT = 3000
JWT_SECRET = 'your secret'
URL = 'client domain' or 'http://localhost:5173'
```

2. Create a database named `digestwell` in your PostgreSQL instance.
3. You'll need to create a user manually in the database. Do a `POST` request to `http://localhost:3000/register` with the
   following body: `{"email": "test@email.com", "password": "123", "firstName": "John", "lastName": "Doe"}`

## Run the client

`cd client`
`npm run dev`

## Run the server

`cd server`
`npm start`

## Testing

You will need to use a separate database for testing, so your original database is not cleared.

1. Create a `server/.env.test` file. Copy the configurations from your `.env` file and add `DB_NAME = digestwell-test`. Your .`env.test` should have these properties:

```
DB_NAME = digestwell-test
DB_URL = localhost
DB_USER = 'your db username'
DB_PASSWORD = null or 'your db password'
PORT = 3000
JWT_SECRET = 'your secret'
URL = 'client domain' or 'http://localhost:5173'
```

2. Create a database named `digestwell-test` in your PostgreSQL instance.
3. `npm test`
