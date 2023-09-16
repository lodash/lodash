import assert from 'node:assert';
import lodashStable from 'lodash';
import { stubTrue } from './utils';
import padStart from '../src/padStart';

describe('padStart', () => {
    const string = 'abc';

    it('should pad a string to a given length', () => {
        const values = [, undefined],
            expected = lodashStable.map(values, lodashStable.constant('   abc'));

        const actual = lodashStable.map(values, (value, index) =>
            index ? padStart(string, 6, value) : padStart(string, 6),
        );

        assert.deepStrictEqual(actual, expected);
    });

    it('should truncate pad characters to fit the pad length', () => {
        assert.strictEqual(padStart(string, 6, '_-'), '_-_abc');
    });

    it('should coerce `string` to a string', () => {
        const values = [Object(string), { toString: lodashStable.constant(string) }],
            expected = lodashStable.map(values, stubTrue);

        const actual = lodashStable.map(values, (value) => padStart(value, 6) === '   abc');

        assert.deepStrictEqual(actual, expected);
    });
});
