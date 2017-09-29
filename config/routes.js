const router = require('express').Router();
const pets = require('../controllers/pets');

router.route('/pets')
  .get(pets.index)
  .post(pets.create);

router.route('/pets/:id')
  .get(pets.show)
  .put(pets.update)
  .delete(pets.delete);

module.exports = router;
