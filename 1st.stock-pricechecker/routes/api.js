'use strict';

const mongoose = require('mongoose');

const stockController = require('../controllers/stockController');

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB);

module.exports = function (app) {
  app.route('/api/stock-prices')
    .get(stockController.getStock);
};
