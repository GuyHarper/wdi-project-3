const router = require('express').Router();
const pets = require('../controllers/pets');
const messages = require('../controllers/messages');
const auth = require('../controllers/auth');
const oauth = require('../controllers/oauth');
const users = require('../controllers/users');
const secureRoute = require('../lib/secureRoute');
const imageUpload = require('../lib/imageUpload');


router.route('/pets')
  .get(pets.index)
  .post(secureRoute, imageUpload, pets.create);

router.route('/pets/:id')
  .get(pets.show)
  .put(secureRoute, imageUpload, pets.update)
  .delete(secureRoute, pets.delete);

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.route('/oauth/facebook')
  .post(oauth.facebook);

router.route('/users/:userId')
  .get(secureRoute, users.show);


// ==========Messages router=============

router.route('/users/:userId/messages')
  .post(secureRoute, imageUpload, messages.create);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
