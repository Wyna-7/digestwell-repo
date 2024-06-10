const { Items, Symptoms, User } = require('../models/entries');

exports.getEntries = async (req, res) => {
  try {
    const entries = await Items.findAll({
      include: [
        {
          model: Symptoms,
          as: 'symptoms',
        },
        {
          model: User,
          as: 'user',
        },
      ],
    });
    res.status(200).json(entries);
  } catch (error) {
    console.error('Failed to fetch entries:', error);
    res.status(500).json('Failed to fetch entries');
  }
};

exports.postEntry = async (req, res) => {
  try {
    const { name, select, other_symptoms, stool_type, is_bleeding, user_id } =
      req.body;

    const newItem = await Items.create({ name, select, user_id });

    await Symptoms.create({
      stool_type,
      is_bleeding,
      other_symptoms,
      user_id,
      // creates a link between the item and the symptom
      itemId: newItem.id,
    });

    const createdItemWithSymptoms = await Items.findByPk(newItem.id, {
      include: Symptoms,
    });

    res.status(201).json(createdItemWithSymptoms);
  } catch (error) {
    res.status(500).json('Failed to post the new entry');
  }
};

// to modify an entry
exports.modifyEntry = async (req, res) => {
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
};

exports.deleteEntry = async (req, res) => {
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
};
