'use strict';

require('dotenv').config();

const PORT = process.env.PORT || 3000;
const cors        = require('cors');
const express     = require('express');
const helmet      = require('helmet');
const expect      = require('chai').expect;
const path        = require('path');

const apiRoutes         = require('./routes/api.js');
const fccTestingRoutes  = require('./routes/fcctesting.js');
const runner            = require('./test-runner');

const app = express();

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "code.jquery.com"],
    styleSrc: ["'self'"]
  }
}));

app.use(cors({origin: '*'}));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });

fccTestingRoutes(app);

apiRoutes(app);  

app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

app.use((err, req, res, next) => {
  let errCode, errMessage;

  if (err.errors) {
    errCode = 400;
    const keys = Object.keys(err.errors);

    errMessage = err.errors[keys[0]].message;
  } else {
    errCode = err.status || 500;
    errMessage = err.message || 'Internal Server Error';
  }

  res.status(errCode).type('txt').send(errMessage);
});

app.listen(PORT, function () {
  console.log(`Listening on port: ${PORT}`);
  if(process.env.NODE_ENV==='test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        runner.run();
      } catch(e) {
        var error = e;
          console.log('Tests are not valid:');
          console.log(error);
      }
    }, 3500);
  }
});

module.exports = app;
