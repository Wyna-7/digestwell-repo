const router = require('express').Router();

const { postUser, getUser, deleteUser, updateUser,
        postSymptom, getUserSymptom, deleteSymptom, updateSymptom,
        postItem, getUserItem, deleteItem, updateItem
} = require('./controllers');

// users
router.post('/users', postUser);
router.get('/users/:id', getUser);
router.delete('/users/:id', deleteUser);
router.patch('/users/:id', updateUser);

// symptoms
router.post('/symptoms', postSymptom);
router.get('/symptoms/:userId', getUserSymptom);
router.delete('/symptoms/:id', deleteSymptom);
router.patch('/symptoms/:id', updateSymptom);


// items
router.post('/items', postItem);
router.get('/items/:userId', getUserItem);
router.delete('/items/:id', deleteItem);
router.patch('/items/:id', updateItem);


module.exports = router;
