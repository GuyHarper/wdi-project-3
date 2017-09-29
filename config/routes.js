const router = require('express').Router();
const pets = require('../controllers/pets');
const messages = require('../controllers/messages');
const user = require('../controllers/users');
const auth = require('../controllers/auth');
const secureRoute = require('../lib/secureRoute');


router.route('/pets')
  .get(pets.index)
  .post(pets.create);

router.route('/pets/:id')
  .get(pets.show)
  .put(pets.update)
  .delete(pets.delete);

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

// ==========Messages router=============

router.route('/user/messages')
  .get(user.show)
  .post(messages.create);

router.route('/user/messages/new')
  .get(messages.new)
  .delete(messages.delete);



module.exports = router;
