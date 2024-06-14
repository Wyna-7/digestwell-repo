const { Item, User, Symptom } = require('../models');
const { postModel, getModel, deleteModel, updateModel } = require('./util');


const controllerFunctions = {};
const functions = {'post': postModel, 'get': getModel, 'delete': deleteModel, 'update': updateModel};
const models = [Item, User, Symptom];

for (const model of models) {
  for (const [key, value] of Object.entries(functions)) {
    controllerFunctions[`${key}${model.name.charAt(0).toUpperCase() + model.name.slice(1)}`] = async function(req, res) {
      await value(model, req, res);
    }
  }
}

module.exports = controllerFunctions;