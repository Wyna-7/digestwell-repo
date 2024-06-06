const express = require('express');
const Sequelize = require('sequelize');

const app = express();
const PORT = 3000;

const router = express.Router();

router.get('/entries', (req, res) => {
  res.send('hello from the router');
});

app.use(router);

app.get('/', (req, res) => {
  res.send('Hello, World by Brice');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
