const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

const Ticker = require('../models/ticker');
const { SINGLE_TICKER_TEST_CASES, MULTIPLE_TICKERS_TEST_CASES } = require('./test-cases');

chai.use(chaiHttp);

suite('Functional Tests', () => {
    suite('GET /api/stock-prices => stockData object', () => {
        const clearTestCollection = (done) => Ticker.deleteMany({}).then(() => done());

        before((done) => {
            clearTestCollection(done);
        });

        after((done) => {
            clearTestCollection(done);
        });

        SINGLE_TICKER_TEST_CASES.forEach(({ description, ticker, like, expectedLikeCount }) => {
            test(description, (done) => {
                chai.request(server)
                    .get('/api/stock-prices')
                    .query({ stock: ticker, like })
                    .end((err, { body, status }) => {
                        if (err) return done(err);

                        const { stockData: { stock, price, likes } } = body;

                        assert.equal(status, 200);
                        assert.equal(stock, ticker.toUpperCase());
                        assert.isNumber(price);
                        assert.isNumber(likes);
                        assert.equal(likes, expectedLikeCount);

                        done();
                    });
            });
        });

        MULTIPLE_TICKERS_TEST_CASES.forEach(({ description, tickers, like }) => {
            test(description, (done) => {
                chai.request(server)
                    .get('/api/stock-prices')
                    .query({ stock: tickers, like })
                    .end((err, { body, status }) => {
                        if (err) return done(err);

                        const { stockData } = body;
                        const [tickerA, tickerB] = stockData;

                        assert.equal(status, 200);
                        assert.isArray(stockData);
                        assert.equal(stockData.length, 2);
                        assert.equal(tickerA.stock, tickers[0].toUpperCase());
                        assert.isNumber(tickerA.price);
                        assert.isNumber(tickerA.rel_likes);
                        assert.equal(tickerA.rel_likes, 0);
                        assert.equal(tickerB.stock, tickers[1].toUpperCase());
                        assert.isNumber(tickerB.price);
                        assert.isNumber(tickerB.rel_likes);
                        assert.equal(tickerB.rel_likes, 0);

                        done();
                    });
            });
        });
    });
});
