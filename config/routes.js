const router = require('express').Router();
const pets = require('../controllers/pets');
const messages = require('../controllers/messages');
const auth = require('../controllers/auth');
const users = require('../controllers/users');
const secureRoute = require('../lib/secureRoute');
const imageUpload = require('../lib/imageUpload');


//************ Remember to put the secureRoute to all the routes *******************
router.route('/pets')
  .get(pets.index)
  .post(secureRoute, imageUpload, pets.create);
//************ Remember to put the secureRoute to all the routes *******************
router.route('/pets/:id')
  .get(pets.show)
  .put(secureRoute, imageUpload, pets.update)
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
  .post(secureRoute, imageUpload, messages.create);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
