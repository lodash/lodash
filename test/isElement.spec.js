import lodashStable from 'lodash';
import { document, body, falsey, stubFalse, args, slice, symbol, realm } from './utils';
import isElement from '../src/isElement';

describe('isElement', () => {
    it('should return `true` for elements', () => {
        if (document) {
            expect(isElement(body)).toBe(true);
        }
    });

    it('should return `true` for non-plain objects', () => {
        function Foo() {
            this.nodeType = 1;
        }

        expect(isElement(new Foo())).toBe(true);
    });

    it('should return `false` for non DOM elements', () => {
        const expected = lodashStable.map(falsey, stubFalse);

        const actual = lodashStable.map(falsey, (value, index) =>
            index ? isElement(value) : isElement(),
        );

        expect(actual).toEqual(expected);

        expect(isElement(args)).toBe(false);
        expect(isElement([1, 2, 3])).toBe(false);
        expect(isElement(true)).toBe(false);
        expect(isElement(new Date())).toBe(false);
        expect(isElement(new Error())).toBe(false);
        expect(isElement(slice)).toBe(false);
        expect(isElement({ a: 1 })).toBe(false);
        expect(isElement(1)).toBe(false);
        expect(isElement(/x/)).toBe(false);
        expect(isElement('a')).toBe(false);
        expect(isElement(symbol)).toBe(false);
    });

    it('should return `false` for plain objects', () => {
        expect(isElement({ nodeType: 1 })).toBe(false);
        expect(isElement({ nodeType: Object(1) })).toBe(false);
        expect(isElement({ nodeType: true })).toBe(false);
        expect(isElement({ nodeType: [1] })).toBe(false);
        expect(isElement({ nodeType: '1' })).toBe(false);
        expect(isElement({ nodeType: '001' })).toBe(false);
    });

    it('should work with a DOM element from another realm', () => {
        if (realm.element) {
            expect(isElement(realm.element)).toBe(true);
        }
    });
});
