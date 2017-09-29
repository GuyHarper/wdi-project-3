const Message = require('../models/message');
const User = require('../models/user');

function messagesNew(req, res) {
  User
    .find()
    .exec()
    .then((users) => {
      res.render('messages/new', { users });
    })
    .catch(err => res.render('error', { err }));
}

function messagesCreate(req, res) {
  Message
    .create(req.body)
    .then(() => res.redirect(req.path))
    .catch(err => res.render('error', { err }));
}

module.exports = {
  new: messagesNew,
  create: messagesCreate
};
