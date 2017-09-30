const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');
const Pet = require('../models/pet');
const User = require('../models/user');

const petData = [{
  name: 'Gio',
  type: 'dog',
  image: 'https://i.imgur.com/1xKy9CS.png',
  description: 'It was a good pet! I really miss it. I hope it will come back soon.',
  address: '',
  location: '',
  active: true,
  status: 'lost'
},{
  name: 'Guy',
  type: 'cat',
  image: 'https://i.pinimg.com/736x/9c/97/f0/9c97f0ffb1854456df99ef2270363871--cool-cats-crazy-cats.jpg',
  description: 'It was a good pet! I really miss it. I hope it will come back soon.',
  address: '',
  location: '',
  active: true,
  status: 'lost'
},{
  name: 'Tito',
  type: 'dog',
  image: 'http://cdn.ebaumsworld.com/mediaFiles/picture/2362229/85304191.jpg',
  description: 'It was a good pet! I really miss it. I hope it will come back soon.',
  address: '',
  location: '',
  active: true,
  status: 'lost'
}];

const userData = [{
  firstname: 'Tito',
  secondname: 'Zwane',
  email: 'tito@ga.co',
  password: 'password',
  passwordConfirmation: 'password'
},{
  firstname: 'Gio',
  secondname: 'Galiero',
  email: 'gio@ga.co',
  password: 'password',
  passwordConfirmation: 'password'
},{
  firstname: 'Guy',
  secondname: 'Harper',
  email: 'guy@ga.co',
  password: 'password',
  passwordConfirmation: 'password'
}];

mongoose.connect(dbURI, { useMongoClient: true })
  .then(db => db.dropDatabase())
  .then(() => Pet.create(petData))
  .then(pets => console.log(`${pets.length} pets created`))
  .then(() => User.create(userData))
  .then(user => console.log(`${user.length} users created`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
