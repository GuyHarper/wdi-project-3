const port = process.env.PORT || 4000;
const env = process.env.NODE_ENV || 'development';
const dbURI = process.env.MONGODB_URI || `mongodb://localhost/lost&foundPets-${env}`;
const secret = process.env.SECRET || 'doublegandt';
const url = env === 'development' ? 'http://localhost:7000': 'herokupath'; //const created for nodemailer

module.exports = { port, env, dbURI, secret, url };
