const Pet = require('../models/pet');

///************************** -------> remember to put **next** inside all the functions <----------******************************
function createRoute(req, res) {
  req.body.postedBy = req.currentUser;

  Pet
    .create(req.body)
    .then(pets => res.status(201).json(pets))
    .catch(err => res.status(500).json(err));
}

function indexRoute(req, res) {
  Pet
    .find()
    .exec()
    .then(pets => res.json(pets))
    .catch(err => res.status(500).json(err));
}

function showRoute(req, res) {
  Pet
    .findById(req.params.id)
    .exec()
    .then((pet) => {
      if(!pet) return res.notFound();

      res.json(pet);
    })
    .catch(err => res.status(500).json(err));
}

function updateRoute(req, res) {

  if(req.file) req.body.image = req.file.filename;

  Pet
    .findById(req.params.id)
    .exec()
    .then((pet) => {
      if(!pet) return res.notFound();

      pet = Object.assign(pet, req.body);
      return pet.save();
    })
    .then((pet) => res.json(pet))
    .catch(err => res.status(500).json(err));
}

function deleteRoute(req, res) {
  Pet
    .findById(req.params.id)
    .exec()
    .then((pet) => {
      if(!pet) return res.notFound();

      return pet.remove();
    })
    .then(() => res.status(204).end())
    .catch(err => res.status(500).json(err));
}

module.exports = {
  create: createRoute,
  index: indexRoute,
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute
};
