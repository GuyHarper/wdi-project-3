const User = require('../models/user');
const nodemailer = require('nodemailer');
const path = require('path');
const async = require('async');

const EmailTemplate = require('email-templates').EmailTemplate;
const inviteTemplate = path.join(__dirname, '..', 'templates', 'found');

const { url } = require('../config/environment');
const locals = { url };

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'wdi29lost.found@gmail.com ',
    pass: process.env.GMAIL_PASSWORD
  }
});

function findUsers(newPet) {
  // make the newPet (just posted) object available inside the ejs template to print out details
  locals.newPet = newPet;
  // find all users - to be refactored to only find users within a certain distance from the pet location
  // or just users who are looking for pets
  User
    .find()
    .populate('posts')
    .exec()
    .then(users => {

      // create an array of users to email by looping through all the users
      const usersToEmail = users.filter((user) => {
        // loop through a user's pets and return true if one match is true
        return user.posts.find((pet) => {
          // return true if pet stauts is lost
          return pet.status === 'lost';
        });
      });

      sendInvites(usersToEmail);
    })
    .catch((err) => console.log(err));
}

function sendInvites(users) {
  console.log(users);
  // when you are ready, switch testPets for users
  async.each(users, sendInvite, handleError);
}

function sendInvite(user, next) {
  // the user we're about to email is the same as the user who created the new post, don't send an email
  if(user.id === locals.newPet.postedBy.id) return false;
  const foundEmail = new EmailTemplate(inviteTemplate);

  // pet is the single pet who is lost (including the info about who posted it (postedBy))
  locals.user = user;
  foundEmail.render(locals, (err, result) => {
    if (err) return next(err);

    transporter.sendMail({
      from: '"Lost & Found Pets 🐶" <wdi29lost.found@gmail.com>',
      to: user.email,
      subject: 'New pet found!',
      html: result.html,
      text: result.text
    }, (err) => {
      if (err) return handleError(err);
      console.log(`Email sent to ${user.name}`);
    });

  });
}

function handleError(err) {
  console.log('err:', err);
}

module.exports = {
  send: findUsers
};
