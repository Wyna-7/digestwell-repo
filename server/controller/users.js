const { User } = require('../models');

async function postUser(req, res) {
  try {
    const user = await User.create(req.body);
    res.status(201).send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
}

async function getUser(req, res) {
  try {
    const user = await User.findByPk(req.params.id);
    res.status(200).send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  } 
}

async function deleteUser(req, res) {
  try {
    await User.destroy({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
}

async function updateUser(req, res) {
  try {
    await User.update(req.body, { where: { id: req.params.id } });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
}

module.exports = {
  postUser,
  getUser,
  deleteUser,
  updateUser
};
