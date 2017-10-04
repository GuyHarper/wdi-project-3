const User = require('../models/user');

function showRoute(req, res) {
  console.log(req.params.userId);
  User
    .findById(req.params.userId)
    .populate({ path: 'messages', populate: { path: 'from pet' }})
    .exec()
    .then((user) => {
      if(!user) return res.notFound();

      res.json(user);
    })
    .catch(err => res.status(500).json(err));
}

module.exports = {
  show: showRoute
};
