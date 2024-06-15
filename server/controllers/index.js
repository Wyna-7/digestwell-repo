const { Item, User, Symptom } = require('../models');
const { postModel, getModel, getModelByUser, deleteModel, updateModel } = require('./util');


const controllerFunctions = {};
const functions = {
  'post': postModel, 
  'get': getModel, 
  'getUser': getModelByUser,
  'delete': deleteModel,
  'update': updateModel
};
const models = [User, Item, Symptom];

for (const model of models) {
  for (const [key, value] of Object.entries(functions)) {
    if (model.name === 'user' && key === 'getUser') continue;
    controllerFunctions[`${key}${model.name.charAt(0).toUpperCase() + model.name.slice(1)}`] = async function(req, res) {
      await value(model, req, res);
    }
  }
}

module.exports = controllerFunctions;
