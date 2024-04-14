import lodashStable from 'lodash';
import { stubString } from './utils';
import escapeRegExp from '../src/escapeRegExp';

describe('escapeRegExp', () => {
    const escaped = '\\^\\$\\.\\*\\+\\?\\(\\)\\[\\]\\{\\}\\|\\\\';
    const unescaped = '^$.*+?()[]{}|\\';

    it('should escape values', () => {
        expect(escapeRegExp(unescaped + unescaped)).toBe(escaped + escaped);
    });

    it('should handle strings with nothing to escape', () => {
        expect(escapeRegExp('abc')).toBe('abc');
    });

    it('should return an empty string for empty values', () => {
        const values = [, null, undefined, ''];
        const expected = lodashStable.map(values, stubString);

        const actual = lodashStable.map(values, (value, index) =>
            index ? escapeRegExp(value) : escapeRegExp(),
        );

        expect(actual).toEqual(expected);
    });
});
