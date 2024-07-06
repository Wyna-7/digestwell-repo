# Disgestwell

A tracker for IBD patients. It allows users to create an account and track their food, beverage and supplement intakes, as well as their symptoms and bowel movements.
The collected data can then be presented to the user's doctor to help modfiy courses of treatment.

![image](https://github.com/Wyna-7/digestwell-repo/assets/155622909/5c33d288-cd14-46af-987a-e4e5094bceb2)

![image](https://github.com/Wyna-7/digestwell-repo/assets/155622909/c8df3044-624c-4795-826b-e02351d58f8a)



## Getting started

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

3. Navigate to the client folder and run it:
   
```
cd client
```
```
npm run dev
````

4. Navigate to the server folder and run it:

```
cd server
```
```
npm start
````
You are now running digest-well!

### Testing

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
   
3. Run the follwoing command:

```
npm test
````

## Tech stack
- Front End: [React](https://react.dev/) & [Vite](https://vitejs.dev/), fully refactored to [TypeScript](https://www.typescriptlang.org/)
- Back End: [Node.js](https://nodejs.org/en) & [Express](https://expressjs.com/) 
- Databases: [PostgreSQL](https://www.postgresql.org/) with [Sequelize](https://sequelize.org/)
- Styling: [Material UI](https://mui.com/)

## Contributors
- Tetiana Bortnyk
- Sebastian Delgado Von Euw
- Queralt Guillen Lafuente
