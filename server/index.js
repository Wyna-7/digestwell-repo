require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./models');

const app = express();
const router = require('./router');

const PORT = process.env.PORT || 3000;
const URL = process.env.URL || 'localhost';

var corsOptions = {
  origin: URL,
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(router);

(async () => {
  await db.sequelize.sync({ alter: true });
  app.listen(PORT, () => console.log(`Running on port ${PORT}`));
})();
