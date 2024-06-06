const express = require('express');
const sequelize = require('sequelize');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, World by Brice');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
