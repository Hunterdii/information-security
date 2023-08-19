const STOCK_INVALID_SYMBOL_ERROR = 'Invalid symbol';
const STOCK_SYMBOL_ERROR_REGEX = /(Invalid|Unknown) symbol/;

function validateStockRecords(records, tickers) {
    const errorIndex = records.findIndex(record => STOCK_SYMBOL_ERROR_REGEX.test(record));

    return errorIndex !== -1
        ? `${STOCK_INVALID_SYMBOL_ERROR}: ${tickers[errorIndex]}`
        : null;
}

exports.validateStockRecords = validateStockRecords;