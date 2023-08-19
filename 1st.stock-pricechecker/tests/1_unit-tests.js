const chai = require('chai');
const assert = chai.assert;

const {mapToBoolean} = require('../utils/booleanUtils');

suite('Unit Tests', () => {
    suite('Boolean Utils', () => {
        const falsyValues = ['false', false, null, undefined, 0, ''];
        const truthyValues = ['true', true, 'value', 10, {}, []];

        falsyValues.forEach(value => {
            test('mapToBoolean should return false for falsy values', () => {
                assert.isFalse(mapToBoolean(value));
            });
        });

        truthyValues.forEach(value => {
            test('mapToBoolean should return true for truthy values', () => {
                assert.isTrue(mapToBoolean(value));
            });
        });
    });
});
