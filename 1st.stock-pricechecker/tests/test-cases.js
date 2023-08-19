const STOCK_TICKER = 'goog';
const STOCK_TICKERS = ['amzn', 'msft'];
const SINGLE_TICKER_TEST_CASES = [
    {
        description: '1 stock',
        ticker: STOCK_TICKER,
        like: false,
        expectedLikeCount: 0
    },
    {
        description: '1 stock with like',
        ticker: STOCK_TICKER,
        like: true,
        expectedLikeCount: 1
    },
    {
        description: '1 stock with like again (ensure likes aren\'t double counted)',
        ticker: STOCK_TICKER,
        like: true,
        expectedLikeCount: 1
    }
];

const MULTIPLE_TICKERS_TEST_CASES = [
    {
        description: '2 stocks',
        tickers: STOCK_TICKERS,
        like: false
    },
    {
        description: '2 stocks with like',
        tickers: STOCK_TICKERS,
        like: true
    }
];

exports.SINGLE_TICKER_TEST_CASES = SINGLE_TICKER_TEST_CASES;
exports.MULTIPLE_TICKERS_TEST_CASES = MULTIPLE_TICKERS_TEST_CASES;