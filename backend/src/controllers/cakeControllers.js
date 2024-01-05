const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const cakes = await tables.cake.readAll();

    res.json(cakes);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const cake = await tables.cake.read(req.params.id);

    if (cake == null) {
      res.sendStatus(404);
    } else {
      res.json(cake);
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const cake = req.body;

  try {
    const insertId = await tables.cake.create(cake);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res, next) => {
  const cake = { ...req.body, id: req.params.id };

  try {
    const response = await tables.cake.update(cake);
    if (response.affectedRows) {
      res.sendStatus(204);
    } else res.sendStatus(404);
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const response = await tables.cake.delete(req.params.id);
    if (response.affectedRows) {
      res.sendStatus(204);
    } else res.sendStatus(404);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
