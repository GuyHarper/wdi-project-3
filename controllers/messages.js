const Message = require('../models/message');

function messagesCreate(req, res) {
  Message
    .create(req.body)
    .then(messages => res.status(201).json(messages))
    .catch(err => res.status(500).json(err));
}

function messagesShow(req, res) {
  Message
    .findById(req.params.id)
    .exec()
    .then((message) => {
      if(!message) return res.notFound();

      res.json(message);
    })
    .catch(err => res.status(500).json(err));
}


function messageDelete(req, res) {
  Message
    .findById(req.params.id)
    .exec()
    .then((message) => {
      if(!message) return res.notFound();

      return message.remove();
    })
    .then(() => res.status(204).end())
    .catch(err => res.render('error', { err }));
}


module.exports = {
  show: messagesShow,
  create: messagesCreate,
  delete: messageDelete
};



// =======================================
