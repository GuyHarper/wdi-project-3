const express     = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI, port }    = require('./config/environment');


const app         = express();
mongoose.connect(dbURI, { useMongoClient: true });


// use morgan for logging
app.use(morgan('dev'));

// setup body-parser to read JSON
app.use(bodyParser.json());




app.use(express.static(`${__dirname}/public`));

app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.listen(port, () => console.log(`Express has started on port: ${port}`));
