const router = require('express').Router();

const { postSymptom, getUserSymptom, deleteSymptom, updateSymptom,
        postItem, getUserItem, deleteItem, updateItem
} = require('./controllers');

const { register, login, auth } = require('./controllers/auth');

// auth
router.post('/register', register);
router.post('/login', login);
router.get('/auth', auth);

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
