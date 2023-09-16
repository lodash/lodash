import assert from 'node:assert';
import lodashStable from 'lodash';
import { _, slice, getUnwrappedValue, noop } from './utils';
import has from '../src/has';
import mixin from '../src/mixin';
import prototype from '../src/prototype';
import countBy from '../src/countBy';
import filter from '../src/filter';

describe('mixin', () => {
    function reset(wrapper) {
        delete wrapper.a;
        delete wrapper.prototype.a;
        delete wrapper.b;
        delete wrapper.prototype.b;
    }

    function Wrapper(value) {
        if (!(this instanceof Wrapper)) {
            return new Wrapper(value);
        }
        if (has(value, '__wrapped__')) {
            var actions = slice.call(value.__actions__),
                chain = value.__chain__;

            value = value.__wrapped__;
        }
        this.__wrapped__ = value;
        this.__actions__ = actions || [];
        this.__chain__ = chain || false;
    }

    Wrapper.prototype.value = function () {
        return getUnwrappedValue(this);
    };

    const array = ['a'],
        source = {
            a: function (array) {
                return array[0];
            },
            b: 'B',
        };

    it('should mixin `source` methods into lodash', () => {
        mixin(source);

        assert.strictEqual(_.a(array), 'a');
        assert.strictEqual(_(array).a().value(), 'a');
        assert.notOk('b' in _);
        assert.notOk('b' in prototype);

        reset(_);
    });

    it('should mixin chaining methods by reference', () => {
        mixin(source);
        _.a = stubB;

        assert.strictEqual(_.a(array), 'b');
        assert.strictEqual(_(array).a().value(), 'a');

        reset(_);
    });

    it('should use a default `object` of `this`', () => {
        const object = lodashStable.create(_);
        object.mixin(source);

        assert.strictEqual(object.a(array), 'a');
        assert.ok(!('a' in _));
        assert.ok(!('a' in prototype));

        reset(_);
    });

    it('should accept an `object`', () => {
        const object = {};
        mixin(object, source);
        assert.strictEqual(object.a(array), 'a');
    });

    it('should accept a function `object`', () => {
        mixin(Wrapper, source);

        const wrapped = Wrapper(array),
            actual = wrapped.a();

        assert.strictEqual(actual.value(), 'a');
        assert.ok(actual instanceof Wrapper);

        reset(Wrapper);
    });

    it('should return `object`', () => {
        const object = {};
        assert.strictEqual(mixin(object, source), object);
        assert.strictEqual(mixin(Wrapper, source), Wrapper);
        assert.strictEqual(mixin(), _);

        reset(Wrapper);
    });

    it('should not assign inherited `source` methods', () => {
        function Foo() {}
        Foo.prototype.a = noop;

        const object = {};
        assert.strictEqual(mixin(object, new Foo()), object);
    });

    it('should accept an `options`', () => {
        function message(func, chain) {
            return `${func === _ ? 'lodash' : 'given'} function should ${chain ? '' : 'not '}chain`;
        }

        lodashStable.each([_, Wrapper], (func) => {
            lodashStable.each([{ chain: false }, { chain: true }], (options) => {
                if (func === _) {
                    mixin(source, options);
                } else {
                    mixin(func, source, options);
                }
                const wrapped = func(array),
                    actual = wrapped.a();

                if (options.chain) {
                    assert.strictEqual(actual.value(), 'a', message(func, true));
                    assert.ok(actual instanceof func, message(func, true));
                } else {
                    assert.strictEqual(actual, 'a', message(func, false));
                    assert.notOk(actual instanceof func, message(func, false));
                }
                reset(func);
            });
        });
    });

    it('should not extend lodash when an `object` is given with an empty `options` object', () => {
        mixin({ a: noop }, {});
        assert.ok(!('a' in _));
        reset(_);
    });

    it('should not error for non-object `options` values', () => {
        let pass = true;

        try {
            mixin({}, source, 1);
        } catch (e) {
            pass = false;
        }
        assert.ok(pass);

        pass = true;

        try {
            mixin(source, 1);
        } catch (e) {
            pass = false;
        }
        assert.ok(pass);

        reset(_);
    });

    it('should not return the existing wrapped value when chaining', () => {
        lodashStable.each([_, Wrapper], (func) => {
            if (func === _) {
                var wrapped = _(source),
                    actual = wrapped.mixin();

                assert.strictEqual(actual.value(), _);
            } else {
                wrapped = _(func);
                actual = wrapped.mixin(source);
                assert.notStrictEqual(actual, wrapped);
            }
            reset(func);
        });
    });

    it('should produce methods that work in a lazy sequence', () => {
        mixin({ a: countBy, b: filter });

        const array = lodashStable.range(LARGE_ARRAY_SIZE),
            actual = _(array).a().map(square).b(isEven).take().value();

        assert.deepEqual(actual, _.take(_.b(_.map(_.a(array), square), isEven)));

        reset(_);
    });
});
