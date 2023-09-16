import assert from 'node:assert';
import lodashStable from 'lodash';
import { document, body, falsey, stubFalse, args, slice, symbol, realm } from './utils';
import isElement from '../src/isElement';

describe('isElement', () => {
    it('should return `true` for elements', () => {
        if (document) {
            assert.strictEqual(isElement(body), true);
        }
    });

    it('should return `true` for non-plain objects', () => {
        function Foo() {
            this.nodeType = 1;
        }

        assert.strictEqual(isElement(new Foo()), true);
    });

    it('should return `false` for non DOM elements', () => {
        const expected = lodashStable.map(falsey, stubFalse);

        const actual = lodashStable.map(falsey, (value, index) =>
            index ? isElement(value) : isElement(),
        );

        assert.deepStrictEqual(actual, expected);

        assert.strictEqual(isElement(args), false);
        assert.strictEqual(isElement([1, 2, 3]), false);
        assert.strictEqual(isElement(true), false);
        assert.strictEqual(isElement(new Date()), false);
        assert.strictEqual(isElement(new Error()), false);
        assert.strictEqual(isElement(slice), false);
        assert.strictEqual(isElement({ a: 1 }), false);
        assert.strictEqual(isElement(1), false);
        assert.strictEqual(isElement(/x/), false);
        assert.strictEqual(isElement('a'), false);
        assert.strictEqual(isElement(symbol), false);
    });

    it('should return `false` for plain objects', () => {
        assert.strictEqual(isElement({ nodeType: 1 }), false);
        assert.strictEqual(isElement({ nodeType: Object(1) }), false);
        assert.strictEqual(isElement({ nodeType: true }), false);
        assert.strictEqual(isElement({ nodeType: [1] }), false);
        assert.strictEqual(isElement({ nodeType: '1' }), false);
        assert.strictEqual(isElement({ nodeType: '001' }), false);
    });

    it('should work with a DOM element from another realm', () => {
        if (realm.element) {
            assert.strictEqual(isElement(realm.element), true);
        }
    });
});
