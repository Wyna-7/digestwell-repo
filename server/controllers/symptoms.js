const{ Symptom } = require('../models');
const {postModel, getModel, deleteModel, updateModel} = require('./util');

async function postSymptom(req, res) {
  await postModel(Symptom, req, res);
}

async function getSymptom(req, res) {
  await getModel(Symptom, req, res);
}

async function deleteSymptom(req, res) {
  await deleteModel(Symptom, req, res);
}

async function updateSymptom(req, res) {
  await updateModel(Symptom, req, res);
}

module.exports = {
  postSymptom,
  getSymptom,
  deleteSymptom,
  updateSymptom
};