const express = require('express');
const Sequelize = require('sequelize');

const app = express();
const PORT = 3000;

app.use(express.json());
const router = express.Router();

router.get('/entries', (req, res) => {
  res.send('hello from the router');
});

router.post('/entries', (req, res) => {
  res.send('Got a POST request');
});

// to modify an entry
router.put('/entries/:id', (req, res) => {
  res.send('Modified the entry');
});

router.delete('/entries/:id', (req, res) => {
  res.send('Deleted the entry');
});

app.use(router);

app.get('/', (req, res) => {
  res.send('Hello, World by Brice');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
