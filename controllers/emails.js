const Pet = require('../models/pet');
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

function findPets(newPet) {
  // make the newPet (just posted) object available inside the ejs template to print out details
  locals.newPet = newPet;
  // find all users - to be refactored to only find users within a certain distance from the pet location
  // or just users who are looking for pets
  Pet
    .find({ status: 'lost'})
    .populate('postedBy')
    .exec()
    .then(pets => {

      sendInvites(pets);
    })
    .catch((err) => console.log(err));
}

function sendInvites(pets) {
  console.log(pets);
  // const petsUser = [{ name: 'Pet name', status: 'lost', postedBy: { name: pets.postedBy.name, email: pets.postedBy.email }}];
  // console.lo
  // when you are ready, switch testPets for pets
  async.each(pets, sendInvite, handleError);
}

function sendInvite(pet, next) {
  const foundEmail = new EmailTemplate(inviteTemplate);

  // pet is the single pet who is lost (including the info about who posted it (postedBy))
  locals.pet = pet;
  foundEmail.render(locals, (err, result) => {
    if (err) return next(err);

    transporter.sendMail({
      from: '"Lost & Found Pets 🐶" <wdi29lost.found@gmail.com>',
      to: pet.postedBy.email,
      subject: 'New pet found!',
      html: result.html,
      text: result.text
    }, (err) => {
      if (err) return handleError(err);
      console.log(`Email sent to ${pet.postedBy.name}`);
    });

  });
}

function handleError(err) {
  console.log('err:', err);
}

module.exports = {
  send: findPets
};
