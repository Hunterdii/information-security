'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const tickerSchema = new Schema({
    symbol: {
        type: String,
        required: true
    },
    likes: {
        type: [String],
        default: []
    }
});
const Ticker = mongoose.model('Ticker', tickerSchema);

module.exports = Ticker;