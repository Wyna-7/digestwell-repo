const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const PORT = 3000;

const sequelize = new Sequelize('digestwell', 'brice', 'null', {
  host: 'localhost',
  dialect: 'postgres',
});

const User = sequelize.define(
  'user',
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

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
    const entries = await Items.findAll();
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json('Failed to fetch entries');
  }
});

router.post('/entries', async (req, res) => {
  try {
    const newEntry = await Items.create(req.body);
    res.status(201).json(newEntry);
  } catch (error) {
    console.log('ERROR', error);
    res.status(500).json('Failed to post the new entry');
  }
});

// to modify an entry
router.put('/entries/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const entry = await Items.findByPk(id);

    if (!entry) {
      return res.status(404).json('Entry not found');
    }

    const updatedEntry = await entry.update(req.body, { returning: true });
    res.json(updatedEntry);
  } catch (error) {
    res.status(500).json('Failed to update the entry');
  }
});

router.delete('/entries/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const entry = await Items.findByPk(id);

    if (!entry) {
      return res.status(404).json('Entry not found');
    }

    await entry.destroy();
    res.status(200).json('Delete was successful');
  } catch (error) {
    res.status(500).json('Failed to delete the entry');
  }
});

app.use(router);

app.get('/', (req, res) => {
  res.send('Hello, World by Brice');
});

(async () => {
  await sequelize.sync({ alter: true });
  app.listen(PORT, () => console.log(`Running on port ${PORT}`));
})();
