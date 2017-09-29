const Pet = require('../models/pet');

function petsCreate(req, res) {
  Pet
    .create(req.body)
    .then(pets => res.status(201).json(pets))
    .catch(err => res.status(500).json(err));
}

function petsIndex(req, res) {
  Pet
    .find()
    .exec()
    .then(pets => res.json(pets))
    .catch(err => res.status(500).json(err));
}

module.exports = {
  create: petsCreate,
  index: petsIndex
};
