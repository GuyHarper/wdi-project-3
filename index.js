const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
mongoose.Promise = require('bluebird');
mongoose.plugin(require('./lib/globalToJSON'));
const { dbURI, port } = require('./config/environment');
const routes = require('./config/routes');
const customResponses = require('./lib/customResponses');
const errorHandler = require('./lib/errorHandler');


const app         = express();
mongoose.connect(dbURI, { useMongoClient: true });


// use morgan for logging
app.use(morgan('dev'));
app.use(cors());

// setup body-parser to read JSON
app.use(bodyParser.json());

app.use(express.static(`${__dirname}/public`));

app.use(customResponses);
app.use('/api', routes);
app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.use(errorHandler);

app.listen(port, () => console.log(`Express has started on port: ${port}`));
