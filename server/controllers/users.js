const { User } = require('../models');
const {postModel, getModel, deleteModel, updateModel} = require('./util');

async function postUser(req, res) {
  await postModel(User, req, res);
}

async function getUser(req, res) {
  await getModel(User, req, res);
}

async function deleteUser(req, res) {
  await deleteModel(User, req, res);
}

async function updateUser(req, res) {
  await updateModel(User, req, res);
}

module.exports = {
  postUser,
  getUser,
  deleteUser,
  updateUser
};
