async function postModel(Model, req, res) {
  try {
    const model = await Model.create(req.body);
    res.status(201).send(model);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
}

async function getModel(Model, req, res) {
  try {
    const model = await Model.findByPk(req.params.id);
    res.status(200).send(model);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  } 
}

async function deleteModel(Model, req, res) {
  try {
    await Model.destroy({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
}

async function updateModel(Model, req, res) {
  try {
    await Model.update(req.body, { where: { id: req.params.id } });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
}

module.exports = {
  postModel,
  getModel,
  deleteModel,
  updateModel
};