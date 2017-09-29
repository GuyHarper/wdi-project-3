const router = require('express').Router();
const pets = require('../controllers/pets');

router.route('/pets')
  .get(pets.index)
  .post(pets.create);

module.exports = router;
