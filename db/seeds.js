const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');
const Pet = require('../models/pet');

const petData = [{
  name: 'Gio',
  type: 'dog',
  image: 'https://imgur.com/a/gwMrg',
  location: 'London',
  active: true,
  lost: true
},{
  name: 'Guy',
  type: 'cat',
  image: 'https://i.pinimg.com/736x/9c/97/f0/9c97f0ffb1854456df99ef2270363871--cool-cats-crazy-cats.jpg',
  location: 'London',
  active: true,
  lost: true
},{
  name: 'Tito',
  type: 'dog',
  image: 'http://cdn.ebaumsworld.com/mediaFiles/picture/2362229/85304191.jpg',
  location: 'London',
  active: true,
  lost: true
}];

mongoose.connect(dbURI, { useMongoClient: true })
  .then(db => db.dropDatabase())
  .then(() => Pet.create(petData))
  .then(pets => console.log(`${pets.length} pets created`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
