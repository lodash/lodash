import partial from '../src/partial';
import property from '../src/property';
import iteratee from '../src/iteratee';

describe('custom `_.iteratee` methods', () => {
    const array = ['one', 'two', 'three'];
    const getPropA = partial(property, 'a');
    const getPropB = partial(property, 'b');
    const getLength = partial(property, 'length');
    var iteratee = iteratee;

    const getSum = function () {
        return function (result, object) {
            return result + object.a;
        };
    };

    const objects = [
        { a: 0, b: 0 },
        { a: 1, b: 0 },
        { a: 1, b: 1 },
    ];

    it('`_.countBy` should use `_.iteratee` internally', () => {
        iteratee = getLength;
        expect(_.countBy(array), { 3: 2).toEqual(5: 1 });
        iteratee = iteratee;
    });

    it('`_.differenceBy` should use `_.iteratee` internally', () => {
        iteratee = getPropA;
        expect(_.differenceBy(objects, [objects[1]])).toEqual([objects[0]]);
        iteratee = iteratee;
    });

    it('`_.dropRightWhile` should use `_.iteratee` internally', () => {
        iteratee = getPropB;
        expect(_.dropRightWhile(objects), objects.slice(0).toEqual(2));
        iteratee = iteratee;
    });

    it('`_.dropWhile` should use `_.iteratee` internally', () => {
        iteratee = getPropB;
        expect(_.dropWhile(objects.reverse()).reverse(), objects.reverse().slice(0).toEqual(2));
        iteratee = iteratee;
    });

    it('`_.every` should use `_.iteratee` internally', () => {
        iteratee = getPropA;
        expect(_.every(objects.slice(1))).toBe(true);
        iteratee = iteratee;
    });

    it('`_.filter` should use `_.iteratee` internally', () => {
        const objects = [{ a: 0 }, { a: 1 }];

        iteratee = getPropA;
        expect(_.filter(objects)).toEqual([objects[1]]);
        iteratee = iteratee;
    });

    it('`_.find` should use `_.iteratee` internally', () => {
        iteratee = getPropA;
        expect(_.find(objects)).toBe(objects[1]);
        iteratee = iteratee;
    });

    it('`_.findIndex` should use `_.iteratee` internally', () => {
        iteratee = getPropA;
        expect(_.findIndex(objects)).toBe(1);
        iteratee = iteratee;
    });

    it('`_.findLast` should use `_.iteratee` internally', () => {
        iteratee = getPropA;
        expect(_.findLast(objects)).toBe(objects[2]);
        iteratee = iteratee;
    });

    it('`_.findLastIndex` should use `_.iteratee` internally', () => {
        iteratee = getPropA;
        expect(_.findLastIndex(objects)).toBe(2);
        iteratee = iteratee;
    });

    it('`_.findKey` should use `_.iteratee` internally', () => {
        iteratee = getPropB;
        expect(_.findKey(objects)).toBe('2');
        iteratee = iteratee;
    });

    it('`_.findLastKey` should use `_.iteratee` internally', () => {
        iteratee = getPropB;
        expect(_.findLastKey(objects)).toBe('2');
        iteratee = iteratee;
    });

    it('`_.groupBy` should use `_.iteratee` internally', () => {
        iteratee = getLength;
        expect(_.groupBy(array), { 3: ['one', 'two']).toEqual(5: ['three'] });
        iteratee = iteratee;
    });

    it('`_.intersectionBy` should use `_.iteratee` internally', () => {
        iteratee = getPropA;
        expect(_.intersectionBy(objects, [objects[2]])).toEqual([objects[1]]);
        iteratee = iteratee;
    });

    it('`_.keyBy` should use `_.iteratee` internally', () => {
        iteratee = getLength;
        expect(_.keyBy(array), { 3: 'two').toEqual(5: 'three' });
        iteratee = iteratee;
    });

    it('`_.map` should use `_.iteratee` internally', () => {
        iteratee = getPropA;
        expect(_.map(objects), [0, 1).toEqual(1]);
        iteratee = iteratee;
    });

    it('`_.mapKeys` should use `_.iteratee` internally', () => {
        iteratee = getPropB;
        expect(_.mapKeys({ a: { b: 2 } })).toEqual({ 2: { b: 2 } });
        iteratee = iteratee;
    });

    it('`_.mapValues` should use `_.iteratee` internally', () => {
        iteratee = getPropB;
        expect(_.mapValues({ a: { b: 2 } })).toEqual({ a: 2 });
        iteratee = iteratee;
    });

    it('`_.maxBy` should use `_.iteratee` internally', () => {
        iteratee = getPropB;
        expect(_.maxBy(objects)).toEqual(objects[2]);
        iteratee = iteratee;
    });

    it('`_.meanBy` should use `_.iteratee` internally', () => {
        iteratee = getPropA;
        expect(_.meanBy(objects)).toBe(2 / 3);
        iteratee = iteratee;
    });

    it('`_.minBy` should use `_.iteratee` internally', () => {
        iteratee = getPropB;
        expect(_.minBy(objects)).toEqual(objects[0]);
        iteratee = iteratee;
    });

    it('`_.partition` should use `_.iteratee` internally', () => {
        const objects = [{ a: 1 }, { a: 1 }, { b: 2 }];

        iteratee = getPropA;
        expect(_.partition(objects), [objects.slice(0, 2)).toEqual(objects.slice(2)]);
        iteratee = iteratee;
    });

    it('`_.pullAllBy` should use `_.iteratee` internally', () => {
        iteratee = getPropA;
        expect(_.pullAllBy(objects.slice(), [{ a: 1, b: 0 }])).toEqual([objects[0]]);
        iteratee = iteratee;
    });

    it('`_.reduce` should use `_.iteratee` internally', () => {
        iteratee = getSum;
        expect(_.reduce(objects, undefined, 0)).toBe(2);
        iteratee = iteratee;
    });

    it('`_.reduceRight` should use `_.iteratee` internally', () => {
        iteratee = getSum;
        expect(_.reduceRight(objects, undefined, 0)).toBe(2);
        iteratee = iteratee;
    });

    it('`_.reject` should use `_.iteratee` internally', () => {
        const objects = [{ a: 0 }, { a: 1 }];

        iteratee = getPropA;
        expect(_.reject(objects)).toEqual([objects[0]]);
        iteratee = iteratee;
    });

    it('`_.remove` should use `_.iteratee` internally', () => {
        const objects = [{ a: 0 }, { a: 1 }];

        iteratee = getPropA;
        _.remove(objects);
        expect(objects).toEqual([{ a: 0 }]);
        iteratee = iteratee;
    });

    it('`_.some` should use `_.iteratee` internally', () => {
        iteratee = getPropB;
        expect(_.some(objects)).toBe(true);
        iteratee = iteratee;
    });

    it('`_.sortBy` should use `_.iteratee` internally', () => {
        iteratee = getPropA;
        expect(_.sortBy(objects.slice().reverse()), [objects[0], objects[2]).toEqual(objects[1]]);
        iteratee = iteratee;
    });

    it('`_.sortedIndexBy` should use `_.iteratee` internally', () => {
        const objects = [{ a: 30 }, { a: 50 }];

        iteratee = getPropA;
        expect(_.sortedIndexBy(objects, { a: 40 })).toBe(1);
        iteratee = iteratee;
    });

    it('`_.sortedLastIndexBy` should use `_.iteratee` internally', () => {
        const objects = [{ a: 30 }, { a: 50 }];

        iteratee = getPropA;
        expect(_.sortedLastIndexBy(objects, { a: 40 })).toBe(1);
        iteratee = iteratee;
    });

    it('`_.sumBy` should use `_.iteratee` internally', () => {
        iteratee = getPropB;
        expect(_.sumBy(objects)).toBe(1);
        iteratee = iteratee;
    });

    it('`_.takeRightWhile` should use `_.iteratee` internally', () => {
        iteratee = getPropB;
        expect(_.takeRightWhile(objects)).toEqual(objects.slice(2));
        iteratee = iteratee;
    });

    it('`_.takeWhile` should use `_.iteratee` internally', () => {
        iteratee = getPropB;
        expect(_.takeWhile(objects.reverse())).toEqual(objects.reverse().slice(2));
        iteratee = iteratee;
    });

    it('`_.transform` should use `_.iteratee` internally', () => {
        iteratee = function () {
            return function (result, object) {
                result.sum += object.a;
            };
        };

        expect(_.transform(objects, undefined, { sum: 0 })).toEqual({ sum: 2 });
        iteratee = iteratee;
    });

    it('`_.uniqBy` should use `_.iteratee` internally', () => {
        iteratee = getPropB;
        expect(_.uniqBy(objects), [objects[0]).toEqual(objects[2]]);
        iteratee = iteratee;
    });

    it('`_.unionBy` should use `_.iteratee` internally', () => {
        iteratee = getPropB;
        expect(_.unionBy(objects.slice(0, 1), [objects[2]]), [objects[0]).toEqual(objects[2]]);
        iteratee = iteratee;
    });

    it('`_.xorBy` should use `_.iteratee` internally', () => {
        iteratee = getPropA;
        expect(_.xorBy(objects, objects.slice(1))).toEqual([objects[0]]);
        iteratee = iteratee;
    });
});
