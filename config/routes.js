const router = require('express').Router();
const pets = require('../controllers/pets');
const messages = require('../controllers/messages');
const auth = require('../controllers/auth');
const users = require('../controllers/users');
// const secureRoute = require('../lib/secureRoute');

//************ Remember to put the secureRoute to all the routes *******************
router.route('/pets')
  .get(pets.index)
  .post(pets.create);
//************ Remember to put the secureRoute to all the routes *******************
router.route('/pets/:id')
  .get(pets.show)
  .put(pets.update)
  .delete(pets.delete);
//************ Remember to put the secureRoute to all the routes *******************
router.route('/register')
  .post(auth.register);
//************ Remember to put the secureRoute to all the routes *******************
router.route('/login')
  .post(auth.login);

router.route('/users/:userId')
  .get(users.show);

// ==========Messages router=============

// router.route('/user/:userId/messages')
//   .get(users.show)
//   .post(messages.create);
//
// router.route('/user/:userId/messages/new')
//   .get(messages.new)
//   .delete(messages.delete);
//
//
// router.route('/messages/:id')
//   .get(messages.show)
//   .delete(messages.delete);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
