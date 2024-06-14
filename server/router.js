const router = require('express').Router();

const {postUser, getUser, deleteUser, updateUser} = require('./controllers/users');
const {postSymptom, getSymptom, deleteSymptom, updateSymptom} = require('./controllers/symptoms');
const {postItem, getItem, deleteItem, updateItem} = require('./controllers/items');

// users
router.post('/users', postUser);
router.get('/users/:id', getUser);
router.delete('/users/:id', deleteUser);
router.patch('/users/:id', updateUser);

// symptoms
router.post('/symptoms', postSymptom);
router.get('/symptoms/:id', getSymptom);
router.delete('/symptoms/:id', deleteSymptom);
router.patch('/symptoms/:id', updateSymptom);


// // items
router.post('/items', postItem);
router.get('/items/:id', getItem);
router.delete('/items/:id', deleteItem);
router.patch('/items/:id', updateItem);


module.exports = router;
