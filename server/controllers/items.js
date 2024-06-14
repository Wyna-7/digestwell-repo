const { Item } = require('../models');
const {postModel, getModel, deleteModel, updateModel} = require('./util');

async function postItem(req, res) {
  await postModel(Item, req, res);
}

async function getItem(req, res) {
  await getModel(Item, req, res);
}

async function deleteItem(req, res) {
  await deleteModel(Item, req, res);
}

async function updateItem(req, res) {
  await updateModel(Item, req, res);
}

module.exports = {
  postItem,
  getItem,
  deleteItem,
  updateItem
};