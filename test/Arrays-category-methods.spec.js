import { args, toArgs, identity } from './utils';
import difference from '../src/difference';
import union from '../src/union';
import compact from '../src/compact';
import drop from '../src/drop';
import dropRight from '../src/dropRight';
import dropRightWhile from '../src/dropRightWhile';
import dropWhile from '../src/dropWhile';
import findIndex from '../src/findIndex';
import findLastIndex from '../src/findLastIndex';
import flatten from '../src/flatten';
import head from '../src/head';
import indexOf from '../src/indexOf';
import initial from '../src/initial';
import intersection from '../src/intersection';
import last from '../src/last';
import lastIndexOf from '../src/lastIndexOf';
import sortedIndex from '../src/sortedIndex';
import sortedIndexOf from '../src/sortedIndexOf';
import sortedLastIndex from '../src/sortedLastIndex';
import sortedLastIndexOf from '../src/sortedLastIndexOf';
import tail from '../src/tail';
import take from '../src/take';
import takeRight from '../src/takeRight';
import takeRightWhile from '../src/takeRightWhile';
import takeWhile from '../src/takeWhile';
import uniq from '../src/uniq';
import without from '../src/without';
import zip from '../src/zip';
import xor from '../src/xor';

describe('"Arrays" category methods', () => {
    const args = toArgs([1, null, [3], null, 5]);
    const sortedArgs = toArgs([1, [3], 5, null, null]);
    const array = [1, 2, 3, 4, 5, 6];

    it('should work with `arguments` objects', () => {
        function message(methodName) {
            return `\`_.${methodName}\` should work with \`arguments\` objects`;
        }

        expect(difference(args, [null]), [1, [3], 5]).toEqual(message('difference'));
        assert.deepStrictEqual(
            difference(array, args),
            [2, 3, 4, 6],
            '_.difference should work with `arguments` objects as secondary arguments',
        );

        expect(union(args, [null, 6]), [1, null, [3], 5, 6]).toEqual(message('union'));
        assert.deepStrictEqual(
            union(array, args),
            array.concat([null, [3]]),
            '_.union should work with `arguments` objects as secondary arguments',
        );

        expect(compact(args), [1, [3], 5]).toEqual(message('compact'));
        expect(drop(args, 3), [null, 5]).toEqual(message('drop'));
        expect(dropRight(args, 3), [1, null]).toEqual(message('dropRight'));
        assert.deepStrictEqual(
            dropRightWhile(args, identity),
            [1, null, [3], null],
            message('dropRightWhile'),
        );
        assert.deepStrictEqual(
            dropWhile(args, identity),
            [null, [3], null, 5],
            message('dropWhile'),
        );
        expect(findIndex(args, identity), 0).toEqual(message('findIndex'));
        expect(findLastIndex(args, identity), 4).toEqual(message('findLastIndex'));
        expect(flatten(args), [1, null, 3, null, 5]).toEqual(message('flatten'));
        expect(head(args), 1).toEqual(message('head'));
        expect(indexOf(args, 5), 4).toEqual(message('indexOf'));
        expect(initial(args), [1, null, [3], null]).toEqual(message('initial'));
        expect(intersection(args, [1]), [1]).toEqual(message('intersection'));
        expect(last(args), 5).toEqual(message('last'));
        expect(lastIndexOf(args, 1), 0).toEqual(message('lastIndexOf'));
        expect(sortedIndex(sortedArgs, 6), 3).toEqual(message('sortedIndex'));
        expect(sortedIndexOf(sortedArgs, 5), 2).toEqual(message('sortedIndexOf'));
        expect(sortedLastIndex(sortedArgs, 5), 3).toEqual(message('sortedLastIndex'));
        expect(sortedLastIndexOf(sortedArgs, 1), 0).toEqual(message('sortedLastIndexOf'));
        expect(tail(args, 4), [null, [3], null, 5]).toEqual(message('tail'));
        expect(take(args, 2), [1, null]).toEqual(message('take'));
        expect(takeRight(args, 1), [5]).toEqual(message('takeRight'));
        expect(takeRightWhile(args, identity), [5]).toEqual(message('takeRightWhile'));
        expect(takeWhile(args, identity), [1]).toEqual(message('takeWhile'));
        expect(uniq(args), [1, null, [3], 5]).toEqual(message('uniq'));
        expect(without(args, null), [1, [3], 5]).toEqual(message('without'));
        assert.deepStrictEqual(
            zip(args, args),
            [
                [1, 1],
                [null, null],
                [[3], [3]],
                [null, null],
                [5, 5],
            ],
            message('zip'),
        );
    });

    it('should accept falsey primary arguments', () => {
        function message(methodName) {
            return `\`_.${methodName}\` should accept falsey primary arguments`;
        }

        expect(difference(null, array), []).toEqual(message('difference'));
        expect(intersection(null, array), []).toEqual(message('intersection'));
        expect(union(null, array), array).toEqual(message('union'));
        expect(xor(null, array), array).toEqual(message('xor'));
    });

    it('should accept falsey secondary arguments', () => {
        function message(methodName) {
            return `\`_.${methodName}\` should accept falsey secondary arguments`;
        }

        expect(difference(array, null), array).toEqual(message('difference'));
        expect(intersection(array, null), []).toEqual(message('intersection'));
        expect(union(array, null), array).toEqual(message('union'));
    });
});
