const router = require('express').Router();
const pets = require('../controllers/pets');
const messages = require('../controllers/messages');


router.route('/pets')
  .get(pets.index)
  .post(pets.create);

router.route('/pets/:id')
  .get(pets.show)
  .put(pets.update)
  .delete(pets.delete);

// ==========Messages router=============

router.route('/messages')
  // .get(messages.index)
  .post(messages.create);


router.route('/messages/:id')
  .get(messages.show)
  .delete(messages.delete);




module.exports = router;
