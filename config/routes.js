const router = require('express').Router();
const pets = require('../controllers/pets');
const messages = require('../controllers/messages');
const user = require('../controllers/users');
const auth = require('../controllers/auth');
const secureRoute = require('../lib/secureRoute');


router.route('/pets')
  .get(secureRoute, pets.index)
  .post(secureRoute, pets.create);

router.route('/pets/:id')
  .get(pets.show)
  .put(secureRoute, pets.update)
  .delete(secureRoute, pets.delete);

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

// ==========Messages router=============

router.route('/user/:userId/messages')
  .get(secureRoute, user.show)
  .post(secureRoute, messages.create);

router.route('/user/:userId/messages/new')
  .get(secureRoute, messages.new)
  .delete(secureRoute, messages.delete);



module.exports = router;
