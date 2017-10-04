const port = process.env.PORT || 4000;
const env = process.env.NODE_ENV || 'development';
const dbURI = process.env.MONGODB_URI || `mongodb://localhost/lost&foundPets-${env}`;
const secret = process.env.SECRET || 'doublegandt';

module.exports = { port, env, dbURI, secret };
