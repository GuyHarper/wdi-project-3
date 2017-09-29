const auth = require('../controllers/auth');

router.route('/register')
  .post(auth.register);
