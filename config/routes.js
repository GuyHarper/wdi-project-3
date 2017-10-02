const router = require('express').Router();
const pets = require('../controllers/pets');
const messages = require('../controllers/messages');
const auth = require('../controllers/auth');
const users = require('../controllers/users');
const secureRoute = require('../lib/secureRoute');

//************ Remember to put the secureRoute to all the routes *******************
router.route('/pets')
  .get(pets.index)
  .post(secureRoute, pets.create);
//************ Remember to put the secureRoute to all the routes *******************
router.route('/pets/:id')
  .get(pets.show)
  .put(secureRoute, pets.update)
  .delete(secureRoute, pets.delete);
//************ Remember to put the secureRoute to all the routes *******************
router.route('/register')
  .post(auth.register);
//************ Remember to put the secureRoute to all the routes *******************
router.route('/login')
  .post(auth.login);

router.route('/users/:userId')
  .get(secureRoute, users.show);

// ==========Messages router=============

router.route('/users/:userId/messages')
  .post(secureRoute, messages.create);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
