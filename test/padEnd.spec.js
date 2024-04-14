import lodashStable from 'lodash';
import { stubTrue } from './utils';
import padEnd from '../src/padEnd';

describe('padEnd', () => {
    const string = 'abc';

    it('should pad a string to a given length', () => {
        const values = [, undefined];
        const expected = lodashStable.map(values, lodashStable.constant('abc   '));

        const actual = lodashStable.map(values, (value, index) =>
            index ? padEnd(string, 6, value) : padEnd(string, 6),
        );

        expect(actual).toEqual(expected);
    });

    it('should truncate pad characters to fit the pad length', () => {
        expect(padEnd(string, 6, '_-')).toBe('abc_-_');
    });

    it('should coerce `string` to a string', () => {
        const values = [Object(string), { toString: lodashStable.constant(string) }];
        const expected = lodashStable.map(values, stubTrue);

        const actual = lodashStable.map(values, (value) => padEnd(value, 6) === 'abc   ');

        expect(actual).toEqual(expected);
    });
});
