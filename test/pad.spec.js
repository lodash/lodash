import lodashStable from 'lodash';
import { stubTrue } from './utils';
import pad from '../src/pad';

describe('pad', () => {
    const string = 'abc';

    it('should pad a string to a given length', () => {
        const values = [, undefined];
        const expected = lodashStable.map(values, lodashStable.constant(' abc  '));

        const actual = lodashStable.map(values, (value, index) =>
            index ? pad(string, 6, value) : pad(string, 6),
        );

        expect(actual).toEqual(expected);
    });

    it('should truncate pad characters to fit the pad length', () => {
        expect(pad(string, 8)).toBe('  abc   ');
        expect(pad(string, 8, '_-')).toBe('_-abc_-_');
    });

    it('should coerce `string` to a string', () => {
        const values = [Object(string), { toString: lodashStable.constant(string) }];
        const expected = lodashStable.map(values, stubTrue);

        const actual = lodashStable.map(values, (value) => pad(value, 6) === ' abc  ');

        expect(actual).toEqual(expected);
    });
});
