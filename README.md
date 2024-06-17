## Project

DigestWell

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

## Run the client

`npm run dev`

## Project Description

A tracker for IBD patients. It tracks food, beverages, symptoms and bowel movements.

## Database

1. You will have to hard code a user ID in the table named 'users'.

## Issues

1. The app login section is fake (this explains the need for a hard-coded user ID)

2. The possibility to edit and delete the cards (in Entry.jsx) that only have symptoms or stool types (coming from the table 'symptoms') is not working yet. Maybe you will need to redesign the way the Entry component works with smaller components. That's what I wish to do after the bootcamp.

3. The backend needs to be updated to make point 3 work (the edit and delete).

4. The responsiveness of the project is not finished yet.

5. The use of MUI makes this project a mess at the moment.

## Missing features

1. A toggle for the form, which will separate entries 1 et 2 ('name' and 'select) with entries 3, 4 and 5 (other_symptoms, stool_type, is_bleeding).

2. Edit and delete entries 3, 4, and 5 when printed (see above Issues - 2).

3. A calendar instead of a form, where the user can click on a date to input his entries.

4. Create a new database for the items in client/src/components/pages/MyLists.jsx. That way, when the user deletes an entry in client/src/components/EntriesForm.jsx, it's still saved somewhere.

5. If point 4 is implemented, the possibility to delete an item from one of the 3 tables.

6. The possibility to share your data with your doctor thanks to a shareable link

## Additional info

1. The router.jsx is not used anymore. I initially built it before realizing that I needed context (used in App.jsx) to pass information to pages/MyLists. I have not removed router.jsx yet because I might need to use it in the future (not sure about that).
