const { Items } = require('../models/entries');

exports.getEntries = async (req, res) => {
  try {
    const entries = await Items.findAll();
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json('Failed to fetch entries');
  }
};

exports.postEntry = async (req, res) => {
  try {
    const newEntry = await Items.create(req.body);
    res.status(201).json(newEntry);
  } catch (error) {
    console.log('ERROR', error);
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
