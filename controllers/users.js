const User = require('../models/user');
const Message = require('../models/message');

function showRoute(req, res) {
  console.log(req.params.userId);
  User
    .findById(req.params.userId)
    .populate('messages')
    .exec()
    .then((user) => {
      if(!user) return res.notFound();

      res.json(user);
    })
    .catch(err => res.status(500).json(err));
}

// function usersShow(req, res) {
//
//   const data = {
//     selectedUser: req.query.userId,
//     user: User.findById(req.params.id).exec(),
//     userMessages: Message.find({
//       $or: [
//         { to: req.currentUser.id, from: req.query.userId },
//         { from: req.currentUser.id, to: req.query.userId }
//       ]
//     }).populate('to from').exec(),
//     users: User.find().exec()
//   };
//
//   Promise.props(data)
//     .then(data => res.render('users/show', data))
//     .catch(err => res.render('error', { err }));
// }

module.exports = {
  show: showRoute
};
