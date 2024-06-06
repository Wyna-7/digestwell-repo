const express = require('express');
const sequelize = require('./models');

const app = express();

const router = require('./router');
const PORT = 3000;

app.use(express.json());
app.use(router);

(async () => {
  await sequelize.sync({ alter: true });
  app.listen(PORT, () => console.log(`Running on port ${PORT}`));
})();
