const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const PORT = 3000;

const sequelize = new Sequelize('digestwell', 'brice', 'null', {
  host: 'localhost',
  dialect: 'postgres',
});

const User = sequelize.define('user', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

const Items = sequelize.define('items', {
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  select: {
    type: DataTypes.ENUM('Food', 'Beverage', 'Medication', 'Supplement'),
    allowNull: false,
  },
  health_impact: {
    type: DataTypes.ENUM('Beneficial', 'Neutral', 'Avoid'),
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'user_id',
    },
  },
});

const Symptoms = sequelize.define('symptoms', {
  stool_type: {
    type: DataTypes.ENUM(
      'Type 1',
      'Type 2',
      'Type 3',
      'Type 4',
      'Type 5',
      'Type 6',
      'Type 7'
    ),
    allowNull: true,
  },
  is_bleeding: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  other_symptoms: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'user_id',
    },
  },
  itemId: {
    type: DataTypes.INTEGER,
    references: {
      model: Items,
      key: 'id',
    },
  },
});

// table relationships
User.hasMany(Items, { foreignKey: 'userId' });
Items.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Symptoms, { foreignKey: 'userId' });
Symptoms.belongsTo(User, { foreignKey: 'userId' });

Items.hasMany(Symptoms, { foreignKey: 'itemId' });
Symptoms.belongsTo(Items, { foreignKey: 'itemId' });

app.use(express.json());
const router = express.Router();

router.get('/entries', async (req, res) => {
  try {
    const entries = await entry.getAll();
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json('Failed to fetch entries');
  }
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
