const router = require('express').Router();
const pets = require('../controllers/pets');
const messages = require('../controllers/messages');
const user = require('../controllers/users');


router.route('/pets')
  .get(pets.index)
  .post(pets.create);

// ==========Messages router=============

router.route('/user/messages')
  .get(user.show)
  .post(messages.create);

router.route('/user/messages/new')
  .get(messages.new);




module.exports = router;
