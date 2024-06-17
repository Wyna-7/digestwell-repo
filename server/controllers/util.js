async function postModel (Model, req, res) {
  try {
    const model = await Model.create(req.body);
    res.status(201).send(model);
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }
}

async function getModel (Model, req, res) {
  try {
    const model = await Model.findByPk(req.params.id);
    res.status(200).send(model);
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  } 
}

async function getModelByUser (Model, req, res) {
  try {
    const model = await Model.findAll({ where: { userId: req.params.userId } });
    res.status(200).send(model);
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  } 
}

async function deleteModel (Model, req, res) {
  try {
    const model = await Model.destroy({ where: { id: req.params.id } });
    res.status(204).send('Deleted successfully');
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }
}

async function updateModel (Model, req, res) {
  try {
    const model = await Model.update(req.body, { where: { id: req.params.id } });
    res.status(204).send('Updated successfully');
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }
}

module.exports = {
  postModel,
  getModel,
  getModelByUser,
  deleteModel,
  updateModel
};
