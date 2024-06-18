const router = require('express').Router();

const { postSymptom, getUserSymptom, deleteSymptom, updateSymptom,
  postItem, getUserItem, deleteItem, updateItem
} = require('./controllers');

const { register, login, logout, auth } = require('./controllers/auth');
const authenticate = require('./middleware/auth');

// auth
router.post('/register', register);
router.post('/login', login);
router.get('/logout', authenticate, logout);
router.get('/auth', auth);

// symptoms
router.post('/symptoms', authenticate, postSymptom);
router.get('/symptoms/:userId', authenticate, getUserSymptom);
router.delete('/symptoms/:id', authenticate, deleteSymptom);
router.patch('/symptoms/:id', authenticate, updateSymptom);

// items
router.post('/items', authenticate, postItem);
router.get('/items/:userId', authenticate, getUserItem);
router.delete('/items/:id', authenticate, deleteItem);
router.patch('/items/:id', authenticate, updateItem);


module.exports = router;
