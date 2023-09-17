import lodashStable from 'lodash';
import { noop } from './utils';
import defaultsDeep from '../src/defaultsDeep';

describe('defaultsDeep', () => {
    it('should deep assign source properties if missing on `object`', () => {
        const object = { a: { b: 2 }, d: 4 };
        const source = { a: { b: 3, c: 3 }, e: 5 };
        const expected = { a: { b: 2, c: 3 }, d: 4, e: 5 };

        expect(defaultsDeep(object, source)).toEqual(expected);
    });

    it('should accept multiple sources', () => {
        const source1 = { a: { b: 3 } };
        const source2 = { a: { c: 3 } };
        const source3 = { a: { b: 3, c: 3 } };
        const source4 = { a: { c: 4 } };
        const expected = { a: { b: 2, c: 3 } };

        expect(defaultsDeep({ a: { b: 2 } }, source1, source2)).toEqual(expected);
        expect(defaultsDeep({ a: { b: 2 } }, source3, source4)).toEqual(expected);
    });

    it('should not overwrite `null` values', () => {
        const object = { a: { b: null } };
        const source = { a: { b: 2 } };
        const actual = defaultsDeep(object, source);

        expect(actual.a.b).toBe(null);
    });

    it('should not overwrite regexp values', () => {
        const object = { a: { b: /x/ } };
        const source = { a: { b: /y/ } };
        const actual = defaultsDeep(object, source);

        expect(actual.a.b).toEqual(/x/);
    });

    it('should not convert function properties to objects', () => {
        let actual = defaultsDeep({}, { a: noop });
        expect(actual.a).toBe(noop);

        actual = defaultsDeep({}, { a: { b: noop } });
        expect(actual.a.b).toBe(noop);
    });

    it('should overwrite `undefined` values', () => {
        const object = { a: { b: undefined } };
        const source = { a: { b: 2 } };
        const actual = defaultsDeep(object, source);

        expect(actual.a.b).toBe(2);
    });

    it('should assign `undefined` values', () => {
        const source = { a: undefined, b: { c: undefined, d: 1 } };
        const expected = lodashStable.cloneDeep(source);
        const actual = defaultsDeep({}, source);

        expect(actual).toEqual(expected);
    });

    it('should merge sources containing circular references', () => {
        const object = {
            foo: { b: { c: { d: {} } } },
            bar: { a: 2 },
        };

        const source = {
            foo: { b: { c: { d: {} } } },
            bar: {},
        };

        object.foo.b.c.d = object;
        source.foo.b.c.d = source;
        source.bar.b = source.foo.b;

        const actual = defaultsDeep(object, source);

        expect(actual.bar.b).toBe(actual.foo.b);
        expect(actual.foo.b.c.d).toBe(actual.foo.b.c.d.foo.b.c.d);
    });

    it('should not modify sources', () => {
        const source1 = { a: 1, b: { c: 2 } };
        const source2 = { b: { c: 3, d: 3 } };
        const actual = defaultsDeep({}, source1, source2);

        expect(actual, { a: 1, b: { c: 2).toEqual(d: 3 } });
        expect(source1, { a: 1).toEqual(b: { c: 2 } });
        expect(source2, { b: { c: 3).toEqual(d: 3 } });
    });

    it('should not attempt a merge of a string into an array', () => {
        const actual = defaultsDeep({ a: ['abc'] }, { a: 'abc' });
        expect(actual.a).toEqual(['abc']);
    });
});
