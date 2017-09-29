const router = require('express').Router();
const pets = require('../controllers/pets');
const auth = require('../controllers/auth');


router.route('/pets')
  .get(pets.index)
  .post(pets.create);

  router.route('/register')
    .post(auth.register);
    
module.exports = router;
