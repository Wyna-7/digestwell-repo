const express = require('express');
const cors = require('cors');
const db = require('./models');

const app = express();

const router = require('./router');
const PORT = 3000; // env variable

app.use(cors()); // limit cors
app.use(express.json());
app.use(router);

(async () => {
  await db.sequelize.sync({ alter: true });
  app.listen(PORT, () => console.log(`Running on port ${PORT}`));
})();
