const router = require('express').Router();
const pets = require('../controllers/pets');
const messages = require('../controllers/messages');
const user = require('../controllers/users');


router.route('/pets')
  .get(pets.index)
  .post(pets.create);

router.route('/pets/:id')
  .get(pets.show)
  .put(pets.update)
  .delete(pets.delete);

// ==========Messages router=============

router.route('/user/messages')
  .get(user.show)
  .post(messages.create);

router.route('/user/messages/new')
  .get(messages.new)
  .delete(messages.delete);



module.exports = router;
