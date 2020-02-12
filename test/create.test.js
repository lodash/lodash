import assert from 'assert';
import lodashStable from 'lodash';
import { falsey, primitives, stubTrue } from './utils.js';
import create from '../create.js';
import keys from '../keys.js';

describe('create', function() {
  function Shape() {
    this.x = 0;
    this.y = 0;
  }

  function Circle() {
    Shape.call(this);
  }

  it('should create an object that inherits from the given `prototype` object', function() {
    Circle.prototype = create(Shape.prototype);
    Circle.prototype.constructor = Circle;

    var actual = new Circle;

    assert.ok(actual instanceof Circle);
    assert.ok(actual instanceof Shape);
    assert.notStrictEqual(Circle.prototype, Shape.prototype);
  });

  it('should assign `properties` to the created object', function() {
    var expected = { 'constructor': Circle, 'radius': 0 };
    var properties = Object.keys(expected);
    Circle.prototype = create(Shape.prototype, expected);

    var actual = new Circle;

    assert.ok(actual instanceof Circle);
    assert.ok(actual instanceof Shape);
    assert.deepStrictEqual(Object.keys(Circle.prototype), properties);
    properties.forEach((property) => {
      assert.strictEqual(Circle.prototype[property], expected[property]);
    });
  });

  it('should assign own properties', function() {
    function Foo() {
      this.a = 1;
      this.c = 3;
    }
    Foo.prototype.b = 2;

    var actual = create({}, new Foo);
    var expected = { 'a': 1, 'c': 3 };
    var properties = Object.keys(expected);

    assert.deepStrictEqual(Object.keys(actual), properties);
    properties.forEach((property) => {
      assert.strictEqual(actual[property], expected[property]);
    });    
  });

  it('should assign properties that shadow those of `prototype`', function() {
    function Foo() {
      this.a = 1;
    }
    var object = create(new Foo, { 'a': 1 });
    assert.deepStrictEqual(lodashStable.keys(object), ['a']);
  });

  it('should accept a falsey `prototype`', function() {
    var actual = lodashStable.map(falsey, function(prototype, index) {
      return index ? create(prototype) : create();
    });

    actual.forEach((value) => {
      assert.ok(lodashStable.isObject(value));
    });
  });

  it('should accept a primitive `prototype`', function() {
    var actual = lodashStable.map(primitives, function(value, index) {
      return index ? create(value) : create();
    });

    actual.forEach((value) => {
      assert.ok(lodashStable.isObject(value));
    });
  });

  it('should work as an iteratee for methods like `_.map`', function() {
    var array = [{ 'a': 1 }, { 'a': 1 }, { 'a': 1 }],
        expected = lodashStable.map(array, stubTrue),
        objects = lodashStable.map(array, create);

    var actual = lodashStable.map(objects, function(object) {
      return object.a === 1 && !keys(object).length;
    });

    assert.deepStrictEqual(actual, expected);
  });
});
