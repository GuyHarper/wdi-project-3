const Message = require('../models/message');

function messagesCreate(req, res) {
  req.body.from = req.currentUser.id;
  // req.body includes .to and .pet

  if(req.file) req.body.image = req.file.filename;

  Message
    .create(req.body)
    .then(message => res.status(201).json(message))
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
    .catch(err => res.status(204).json(err));
}


module.exports = {
  show: messagesShow,
  create: messagesCreate,
  delete: messageDelete
};



// =======================================
