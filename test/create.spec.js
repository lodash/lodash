import lodashStable from 'lodash';
import { falsey, primitives, stubTrue } from './utils';
import create from '../src/create';
import keys from '../src/keys';

describe('create', () => {
    function Shape() {
        this.x = 0;
        this.y = 0;
    }

    function Circle() {
        Shape.call(this);
    }

    it('should create an object that inherits from the given `prototype` object', () => {
        Circle.prototype = create(Shape.prototype);
        Circle.prototype.constructor = Circle;

        const actual = new Circle();

        expect(actual instanceof Circle);
        expect(actual instanceof Shape);
        assert.notStrictEqual(Circle.prototype, Shape.prototype);
    });

    it('should assign `properties` to the created object', () => {
        const expected = { constructor: Circle, radius: 0 };
        const properties = Object.keys(expected);
        Circle.prototype = create(Shape.prototype, expected);

        const actual = new Circle();

        expect(actual instanceof Circle);
        expect(actual instanceof Shape);
        expect(Object.keys(Circle.prototype)).toEqual(properties);
        properties.forEach((property) => {
            expect(Circle.prototype[property]).toBe(expected[property]);
        });
    });

    it('should assign own properties', () => {
        function Foo() {
            this.a = 1;
            this.c = 3;
        }
        Foo.prototype.b = 2;

        const actual = create({}, new Foo());
        const expected = { a: 1, c: 3 };
        const properties = Object.keys(expected);

        expect(Object.keys(actual)).toEqual(properties);
        properties.forEach((property) => {
            expect(actual[property]).toBe(expected[property]);
        });
    });

    it('should assign properties that shadow those of `prototype`', () => {
        function Foo() {
            this.a = 1;
        }
        const object = create(new Foo(), { a: 1 });
        expect(lodashStable.keys(object)).toEqual(['a']);
    });

    it('should accept a falsey `prototype`', () => {
        const actual = lodashStable.map(falsey, (prototype, index) =>
            index ? create(prototype) : create(),
        );

        actual.forEach((value) => {
            expect(lodashStable.isObject(value));
        });
    });

    it('should accept a primitive `prototype`', () => {
        const actual = lodashStable.map(primitives, (value, index) =>
            index ? create(value) : create(),
        );

        actual.forEach((value) => {
            expect(lodashStable.isObject(value));
        });
    });

    it('should work as an iteratee for methods like `_.map`', () => {
        const array = [{ a: 1 }, { a: 1 }, { a: 1 }];
        const expected = lodashStable.map(array, stubTrue);
        const objects = lodashStable.map(array, create);

        const actual = lodashStable.map(
            objects,
            (object) => object.a === 1 && !keys(object).length,
        );

        expect(actual).toEqual(expected);
    });
});
