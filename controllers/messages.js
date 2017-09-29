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

function messageDelete(req, res) {
  Message
    .findById(req.params.id.userId)
    .exec()
    .then((message) => {
      if(!message) return res.notFound();

      return message.remove();
    })
    .then(() => res.status(204).end())
    .catch(err => res.render('error', { err }));
}


module.exports = {
  new: messagesNew,
  create: messagesCreate,
  delete: messageDelete
};
