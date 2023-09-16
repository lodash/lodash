import assert from 'node:assert';
import lodashStable from 'lodash';
import { stubString } from './utils';
import escapeRegExp from '../src/escapeRegExp';

describe('escapeRegExp', () => {
    const escaped = '\\^\\$\\.\\*\\+\\?\\(\\)\\[\\]\\{\\}\\|\\\\',
        unescaped = '^$.*+?()[]{}|\\';

    it('should escape values', () => {
        assert.strictEqual(escapeRegExp(unescaped + unescaped), escaped + escaped);
    });

    it('should handle strings with nothing to escape', () => {
        assert.strictEqual(escapeRegExp('abc'), 'abc');
    });

    it('should return an empty string for empty values', () => {
        const values = [, null, undefined, ''],
            expected = lodashStable.map(values, stubString);

        const actual = lodashStable.map(values, (value, index) =>
            index ? escapeRegExp(value) : escapeRegExp(),
        );

        assert.deepStrictEqual(actual, expected);
    });
});
