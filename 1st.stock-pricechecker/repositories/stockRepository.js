'use strict';

const Ticker = require('../models/ticker');

const UPDATING_TICKER_DATA_ERROR_MESSAGE = 'Error while updating ticker data';

async function getStockTicker(symbol, ip) {
    try {
        return _getTickerData(symbol, ip);
    } catch(err) {
        return Promise.reject({msg: UPDATING_TICKER_DATA_ERROR_MESSAGE});
    }
}

async function _getTickerData(symbol, ip) {
    const conditions = {symbol};
    const tickerExists = await Ticker.exists(conditions);

    return !tickerExists || ip
        ? _updateTickerData(symbol, ip)
        : Ticker.findOne(conditions);
}

function _updateTickerData(symbol, ip) {
    const options = {new: true, setDefaultsOnInsert: true, upsert: true};
    const update = ip ? {symbol, $addToSet: {likes: ip}} : {symbol};

    return Ticker.findOneAndUpdate({symbol}, update, options);
}

exports.getStockTicker = getStockTicker;