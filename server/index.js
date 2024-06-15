require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./models');
const cookieParser = require('cookie-parser')

const app = express();
const router = require('./router');

const PORT = process.env.PORT || 3000;
const URL = process.env.URL || 'http://localhost:5173';

const corsOptions = {
  origin: URL,
  optionsSuccessStatus: 200
}

app.use(cookieParser())
app.use(cors(corsOptions));
app.use(express.json());
app.use(router);

(async () => {
  await db.sequelize.sync({ alter: true });
  app.listen(PORT, () => console.log(`Running on port ${PORT}`));
})();
