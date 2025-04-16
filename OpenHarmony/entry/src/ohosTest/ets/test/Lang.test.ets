/**
 *  MIT License
 *
 *  Copyright (c) 2023 Huawei Device Co., Ltd.
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 */

import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium'
import {
  assign,
  castArray, clone, cloneDeep, conformsTo, eq, gt, gte,
  isArguments,
  isArray,
  isArrayBuffer,
  isArrayLike,
  isArrayLikeObject,
  isBoolean,
  isBuffer,
  isDate,
  isEmpty,
  isEqual,
  isEqualWith,
  isError,
  isFunction,
  isInteger,
  isLength,
  isMap,
  isMatch,
  isMatchWith,
  isNative,
  isNil,
  isNull,
  isNumber,
  isObject,
  isObjectLike,
  isPlainObject,
  isRegExp,
  isSafeInteger,
  isSet,
  isString,
  isSymbol,
  isTypedArray,
  isUndefined,
  isWeakMap,
  isWeakSet,
  lt,
  lte,
  noop,
  toArray,
  toFinite,
  toInteger,
  toLength,
  toNumber,
  toPlainObject,
  toSafeInteger,
  toString,
  isNaN,
  isFinite
} from 'lodash';

const BASE_COUNT: number = 2000;

export default function langTest() {
  describe('LangTest', () => {
    // Defines a test suite. Two parameters are supported: test suite name and test suite function.
    beforeAll(() => {
      // Presets an action, which is performed only once before all test cases of the test suite start.
      // This API supports only one parameter: preset action function.
    })
    beforeEach(() => {
      // Presets an action, which is performed before each unit test case starts.
      // The number of execution times is the same as the number of test cases defined by **it**.
      // This API supports only one parameter: preset action function.
    })
    afterEach(() => {
      // Presets a clear action, which is performed after each unit test case ends.
      // The number of execution times is the same as the number of test cases defined by **it**.
      // This API supports only one parameter: clear action function.
    })
    afterAll(() => {
      // Presets a clear action, which is performed after all test cases of the test suite end.
      // This API supports only one parameter: clear action function.
    })

    class B {
      b: number = 0
    }

    class A {
      a: number = 0
    }

    class X {
      x: number = 0
    }

    class Y {
      y: number = 0
    }

    class AB {
      a: number = 0;
      b: number = 0
    }

    class Greet {
      greeting: string = ''
    }
    it('castArrayTest01', 0, () => {
      let startTime0 = new Date().getTime()
      console.info('appInfoTest xts castArrayTest01 startTime:' + startTime0 + "us")
      let castArrays: object = castArray({
        'a': 1
      })

      let endTime0 = new Date().getTime()
      console.info('appInfoTest xts castArrayTest01 endTime:' + endTime0 + "us")
      let averageTime0 = endTime0 - startTime0
      console.info('appInfoTest xts castArrayTest01 averageTime:' + averageTime0 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        castArray({
          'a': 1
        })
      }
      endTime(startTime, 'castArrayTest01');
      expect(JSON.stringify(castArrays)).assertEqual('[{"a":1}]');
    })


    it('castArrayTest02', 0, () => {
      let startTime1 = new Date().getTime()
      console.info('appInfoTest xts castArrayTest02 startTime:' + startTime1 + "us")
      let castArrays: string[] = castArray('abc');

      let endTime1 = new Date().getTime()
      console.info('appInfoTest xts castArrayTest02 endTime:' + endTime1 + "us")
      let averageTime1 = endTime1 - startTime1
      console.info('appInfoTest xts castArrayTest02 averageTime:' + averageTime1 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        castArray('abc');
      }
      endTime(startTime, 'castArrayTest02');
      expect(JSON.stringify(castArrays)).assertEqual('["abc"]');
    })


    it('cloneTest01', 0, () => {
      let startTime2 = new Date().getTime()
      console.info('appInfoTest xts cloneTest01 startTime:' + startTime2 + "us")
      let objects = [{
        a: 1
      } as A, {
        b: 2
      } as B];

      let shallow: object = clone(objects);

      let endTime2 = new Date().getTime()
      console.info('appInfoTest xts cloneTest01 endTime:' + endTime2 + "us")
      let averageTime2 = endTime2 - startTime2
      console.info('appInfoTest xts cloneTest01 averageTime:' + averageTime2 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        clone(objects);
      }
      endTime(startTime, 'cloneTest01');
      expect(JSON.stringify(shallow)).assertEqual('[{"a":1},{"b":2}]');
    })


    it('cloneTest02', 0, () => {
      let startTime3 = new Date().getTime()
      console.info('appInfoTest xts cloneTest02 startTime:' + startTime3 + "us")
      let obj = [{
        x: 1
      } as X, {
        y: 2
      } as Y];

      let shallowCopy: object = clone(obj);

      let endTime3 = new Date().getTime()
      console.info('appInfoTest xts cloneTest02 endTime:' + endTime3 + "us")
      let averageTime3 = endTime3 - startTime3
      console.info('appInfoTest xts cloneTest02 averageTime:' + averageTime3 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        clone(obj);
      }
      endTime(startTime, 'cloneTest02');
      expect(JSON.stringify(shallowCopy)).assertEqual('[{"x":1},{"y":2}]');
    })


    it('cloneDeepTest01', 0, () => {
      let startTime4 = new Date().getTime()
      console.info('appInfoTest xts cloneDeepTest01 startTime:' + startTime4 + "us")
      let objects = [{
        a: 1
      } as A, {
        b: 2
      } as B];

      let shallow: object = cloneDeep(objects);

      let endTime4 = new Date().getTime()
      console.info('appInfoTest xts cloneDeepTest01 endTime:' + endTime4 + "us")
      let averageTime4 = endTime4 - startTime4
      console.info('appInfoTest xts cloneDeepTest01 averageTime:' + averageTime4 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        cloneDeep(objects);
      }
      endTime(startTime, 'cloneDeepTest01');
      expect(JSON.stringify(shallow)).assertEqual('[{"a":1},{"b":2}]');
    })


    it('cloneDeepTest02', 0, () => {
      let startTime5 = new Date().getTime()
      console.info('appInfoTest xts cloneDeepTest02 startTime:' + startTime5 + "us")
      let obj = [{
        x: 1
      } as X, {
        y: 2
      } as Y];

      let shallowCopy: object = cloneDeep(obj);

      let endTime5 = new Date().getTime()
      console.info('appInfoTest xts cloneDeepTest02 endTime:' + endTime5 + "us")
      let averageTime5 = endTime5 - startTime5
      console.info('appInfoTest xts cloneDeepTest02 averageTime:' + averageTime5 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        cloneDeep(obj);
      }
      endTime(startTime, 'cloneDeepTest02');
      expect(JSON.stringify(shallowCopy)).assertEqual('[{"x":1},{"y":2}]');
    })


    it('conformsToTest01', 0, () => {
      let startTime6 = new Date().getTime()
      console.info('appInfoTest xts conformsToTest01 startTime:' + startTime6 + "us")
      let object = {
        a: 1, b: 2
      } as AB;

      let isConformsTo: boolean = conformsTo(object, {
        'b': (n: number) => {
          return n > 1;
        }
      });

      let endTime6 = new Date().getTime()
      console.info('appInfoTest xts conformsToTest01 endTime:' + endTime6 + "us")
      let averageTime6 = endTime6 - startTime6
      console.info('appInfoTest xts conformsToTest01 averageTime:' + averageTime6 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        conformsTo(object, {
          'b': (n: number) => {
            return n > 1;
          }
        });
      }
      endTime(startTime, 'conformsToTest01');
      expect(isConformsTo).assertTrue();
    })


    it('conformsToTest02', 0, () => {
      let startTime7 = new Date().getTime()
      console.info('appInfoTest xts conformsToTest02 startTime:' + startTime7 + "us")
      let object = {
        a: 1, b: 2
      } as AB;

      let isConformsTo: boolean = conformsTo(object, {
        'b': (n: number) => {
          return n > 2;
        }
      });

      let endTime7 = new Date().getTime()
      console.info('appInfoTest xts conformsToTest02 endTime:' + endTime7 + "us")
      let averageTime7 = endTime7 - startTime7
      console.info('appInfoTest xts conformsToTest02 averageTime:' + averageTime7 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        conformsTo(object, {
          'b': (n: number) => {
            return n > 2;
          }
        });
      }
      endTime(startTime, 'conformsToTest02');
      expect(isConformsTo).assertFalse();
    })


    it('eqTest01', 0, () => {
      let startTime8 = new Date().getTime()
      console.info('appInfoTest xts eqTest01 startTime:' + startTime8 + "us")
      let object = {
        a: 1
      } as A;

      let isEq: boolean = eq(object, object);

      let endTime8 = new Date().getTime()
      console.info('appInfoTest xts eqTest01 endTime:' + endTime8 + "us")
      let averageTime8 = endTime8 - startTime8
      console.info('appInfoTest xts eqTest01 averageTime:' + averageTime8 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        eq(object, object);
      }
      endTime(startTime, 'eqTest01');
      expect(isEq).assertTrue();
    })


    it('eqTest02', 0, () => {
      let startTime9 = new Date().getTime()
      console.info('appInfoTest xts eqTest02 startTime:' + startTime9 + "us")
      let object = {
        a: 1
      } as A;

      let other = {
        a: 1
      } as A;

      let isEq: boolean = eq(object, other);

      let endTime9 = new Date().getTime()
      console.info('appInfoTest xts eqTest02 endTime:' + endTime9 + "us")
      let averageTime9 = endTime9 - startTime9
      console.info('appInfoTest xts eqTest02 averageTime:' + averageTime9 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        eq(object, other);
      }
      endTime(startTime, 'eqTest02');
      expect(isEq).assertFalse();
    })


    it('gtTest01', 0, () => {
      let startTime10 = new Date().getTime()
      console.info('appInfoTest xts gtTest01 startTime:' + startTime10 + "us")
      let isGt: boolean = gt(3, 1);

      let endTime10 = new Date().getTime()
      console.info('appInfoTest xts gtTest01 endTime:' + endTime10 + "us")
      let averageTime10 = endTime10 - startTime10
      console.info('appInfoTest xts gtTest01 averageTime:' + averageTime10 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        gt(3, 1);
      }
      endTime(startTime, 'gtTest01');
      expect(isGt).assertTrue();
    })


    it('gtTest02', 0, () => {
      let startTime11 = new Date().getTime()
      console.info('appInfoTest xts gtTest02 startTime:' + startTime11 + "us")
      let isGt: boolean = gt(3, 3);

      let endTime11 = new Date().getTime()
      console.info('appInfoTest xts gtTest02 endTime:' + endTime11 + "us")
      let averageTime11 = endTime11 - startTime11
      console.info('appInfoTest xts gtTest02 averageTime:' + averageTime11 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        gt(3, 3);
      }
      endTime(startTime, 'gtTest02');
      expect(isGt).assertFalse();
    })


    it('gteTest01', 0, () => {
      let startTime12 = new Date().getTime()
      console.info('appInfoTest xts gteTest01 startTime:' + startTime12 + "us")
      let isGte: boolean = gte(3, 1);

      let endTime12 = new Date().getTime()
      console.info('appInfoTest xts gteTest01 endTime:' + endTime12 + "us")
      let averageTime12 = endTime12 - startTime12
      console.info('appInfoTest xts gteTest01 averageTime:' + averageTime12 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        gte(3, 1);
      }
      endTime(startTime, 'gteTest01');
      expect(isGte).assertTrue();
    })


    it('gteTest02', 0, () => {
      let startTime13 = new Date().getTime()
      console.info('appInfoTest xts gteTest02 startTime:' + startTime13 + "us")
      let isGte: boolean = gte(3, 3);

      let endTime13 = new Date().getTime()
      console.info('appInfoTest xts gteTest02 endTime:' + endTime13 + "us")
      let averageTime13 = endTime13 - startTime13
      console.info('appInfoTest xts gteTest02 averageTime:' + averageTime13 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        gte(3, 3);
      }
      endTime(startTime, 'gteTest02');
      expect(isGte).assertTrue()
    })


    it('isArgumentsTest01', 0, () => {
      let startTime14 = new Date().getTime()
      console.info('appInfoTest xts isArgumentsTest01 startTime:' + startTime14 + "us")
      let isArgument: boolean = isArguments(() => {
        return arguments;
      });
      let endTime14 = new Date().getTime()
      console.info('appInfoTest xts gteTest02 endTime:' + endTime14 + "us")
      let averageTime14 = endTime14 - startTime14
      console.info('appInfoTest xts gteTest02 averageTime:' + averageTime14 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isArguments(() => {
          return arguments;
        });
      }
      endTime(startTime, 'isArgumentsTest01');
      expect(isArgument).assertFalse();
    })


    it('isArgumentsTest02', 0, () => {
      let startTime15 = new Date().getTime()
      console.info('appInfoTest xts isArgumentsTest02 startTime:' + startTime15 + "us")
      let isArgument: boolean = isArguments([1, 2, 3]);

      let endTime15 = new Date().getTime()
      console.info('appInfoTest xts isArgumentsTest02 endTime:' + endTime15 + "us")
      let averageTime15 = endTime15 - startTime15
      console.info('appInfoTest xts isArgumentsTest02 averageTime:' + averageTime15 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isArguments([1, 2, 3]);
      }
      endTime(startTime, 'isArgumentsTest02');
      expect(isArgument).assertFalse();
    })


    it('isArrayTest01', 0, () => {
      let startTime16 = new Date().getTime()
      console.info('appInfoTest xts isArrayTest01 startTime:' + startTime16 + "us")
      let isTrue: boolean = isArray([1, 2, 3]);

      let endTime16 = new Date().getTime()
      console.info('appInfoTest xts isArrayTest01 endTime:' + endTime16 + "us")
      let averageTime16 = endTime16 - startTime16
      console.info('appInfoTest xts isArrayTest01 averageTime:' + averageTime16 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isArray([1, 2, 3]);
      }
      endTime(startTime, 'isArrayTest01');
      expect(isTrue).assertTrue();
    })


    it('isArrayTest02', 0, () => {
      let startTime17 = new Date().getTime()
      console.info('appInfoTest xts isArrayTest02 startTime:' + startTime17 + "us")
      let isTrue: boolean = isArray(noop);

      let endTime17 = new Date().getTime()
      console.info('appInfoTest xts isArrayTest02 endTime:' + endTime17 + "us")
      let averageTime17 = endTime17 - startTime17
      console.info('appInfoTest xts isArrayTest02 averageTime:' + averageTime17 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isArray(noop);
      }
      endTime(startTime, 'isArrayTest02');
      expect(isTrue).assertFalse();
    })


    it('isArrayBufferTest01', 0, () => {
      let startTime18 = new Date().getTime()
      console.info('appInfoTest xts isArrayBufferTest01 startTime:' + startTime18 + "us")
      let isTrue: boolean = isArrayBuffer(new ArrayBuffer(2));

      let endTime18 = new Date().getTime()
      console.info('appInfoTest xts isArrayBufferTest01 endTime:' + endTime18 + "us")
      let averageTime18 = endTime18 - startTime18
      console.info('appInfoTest xts isArrayBufferTest01 averageTime:' + averageTime18 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isArrayBuffer(new ArrayBuffer(2));
      }
      endTime(startTime, 'isArrayBufferTest01');
      expect(isTrue).assertTrue();
    })


    it('isArrayBufferTest02', 0, () => {
      let startTime19 = new Date().getTime()
      console.info('appInfoTest xts isArrayBufferTest02 startTime:' + startTime19 + "us")
      let isTrue: boolean = isArrayBuffer(new Array(2));

      let endTime19 = new Date().getTime()
      console.info('appInfoTest xts isArrayBufferTest02 endTime:' + endTime19 + "us")
      let averageTime19 = endTime19 - startTime19
      console.info('appInfoTest xts isArrayBufferTest02 averageTime:' + averageTime19 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isArrayBuffer(new Array(2));
      }
      endTime(startTime, 'isArrayBufferTest02');
      expect(isTrue).assertFalse();
    })


    it('isArrayLikeTest01', 0, () => {
      let startTime20 = new Date().getTime()
      console.info('appInfoTest xts isArrayLikeTest01 startTime:' + startTime20 + "us")
      let isTrue: boolean = isArrayLike([1, 2, 3]);

      let endTime20 = new Date().getTime()
      console.info('appInfoTest xts isArrayLikeTest01 endTime:' + endTime20 + "us")
      let averageTime20 = endTime20 - startTime20
      console.info('appInfoTest xts isArrayLikeTest01 averageTime:' + averageTime20 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isArrayLike([1, 2, 3]);
      }
      endTime(startTime, 'isArrayLikeTest01');
      expect(isTrue).assertTrue();
    })


    it('isArrayLikeTest02', 0, () => {
      let startTime21 = new Date().getTime()
      console.info('appInfoTest xts isArrayLikeTest02 startTime:' + startTime21 + "us")
      let isTrue: boolean = isArrayLike(noop);

      let endTime21 = new Date().getTime()
      console.info('appInfoTest xts isArrayLikeTest02 endTime:' + endTime21 + "us")
      let averageTime21 = endTime21 - startTime21
      console.info('appInfoTest xts isArrayLikeTest02 averageTime:' + averageTime21 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isArrayLike(noop);
      }
      endTime(startTime, 'isArrayLikeTest02');
      expect(isTrue).assertFalse();
    })


    it('isArrayLikeObjectTest01', 0, () => {
      let startTime22 = new Date().getTime()
      console.info('appInfoTest xts isArrayLikeObjectTest01 startTime:' + startTime22 + "us")
      let isTrue: boolean = isArrayLikeObject([1, 2, 3]);

      let endTime22 = new Date().getTime()
      console.info('appInfoTest xts isArrayLikeObjectTest01 endTime:' + endTime22 + "us")
      let averageTime22 = endTime22 - startTime22
      console.info('appInfoTest xts isArrayLikeObjectTest01 averageTime:' + averageTime22 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isArrayLikeObject([1, 2, 3]);
      }
      endTime(startTime, 'isArrayLikeObjectTest01');
      expect(isTrue).assertTrue();
    })


    it('isArrayLikeObjectTest02', 0, () => {
      let startTime23 = new Date().getTime()
      console.info('appInfoTest xts isArrayLikeObjectTest02 startTime:' + startTime23 + "us")
      let isTrue: boolean = isArrayLikeObject(noop);

      let endTime23 = new Date().getTime()
      console.info('appInfoTest xts isArrayLikeObjectTest02 endTime:' + endTime23 + "us")
      let averageTime23 = endTime23 - startTime23
      console.info('appInfoTest xts isArrayLikeObjectTest02 averageTime:' + averageTime23 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isArrayLikeObject(noop);
      }
      endTime(startTime, 'isArrayLikeObjectTest02');
      expect(isTrue).assertFalse();
    })


    it('isBooleanTest01', 0, () => {
      let startTime24 = new Date().getTime()
      console.info('appInfoTest xts isBooleanTest01 startTime:' + startTime24 + "us")
      let isTrue: boolean = isBoolean(false);

      let endTime24 = new Date().getTime()
      console.info('appInfoTest xts isBooleanTest01 endTime:' + endTime24 + "us")
      let averageTime24 = endTime24 - startTime24
      console.info('appInfoTest xts isBooleanTest01 averageTime:' + averageTime24 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isBoolean(false);
      }
      endTime(startTime, 'isBooleanTest01');
      expect(isTrue).assertTrue();
    })


    it('isBooleanTest02', 0, () => {
      let startTime25 = new Date().getTime()
      console.info('appInfoTest xts isBooleanTest02 startTime:' + startTime25 + "us")
      let isTrue: boolean = isBoolean(null);

      let endTime25 = new Date().getTime()
      console.info('appInfoTest xts isBooleanTest02 endTime:' + endTime25 + "us")
      let averageTime25 = endTime25 - startTime25
      console.info('appInfoTest xts isBooleanTest02 averageTime:' + averageTime25 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isBoolean(null);
      }
      endTime(startTime, 'isBooleanTest02');
      expect(isTrue).assertFalse();
    })


    it('isBufferTest', 0, () => {
      let startTime26 = new Date().getTime()
      console.info('appInfoTest xts isBufferTest startTime:' + startTime26 + "us")
      let isTrue: boolean = isBuffer(new Uint8Array(2));

      let endTime26 = new Date().getTime()
      console.info('appInfoTest xts isBufferTest endTime:' + endTime26 + "us")
      let averageTime26 = endTime26 - startTime26
      console.info('appInfoTest xts isBufferTest averageTime:' + averageTime26 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isBuffer(new Uint8Array(2));
      }
      endTime(startTime, 'isBufferTest');
      expect(isTrue).assertFalse();
    })


    it('isDateTest01', 0, () => {
      let startTime27 = new Date().getTime()
      console.info('appInfoTest xts isDateTest01 startTime:' + startTime27 + "us")
      let isTrue: boolean = isDate(new Date);

      let endTime27 = new Date().getTime()
      console.info('appInfoTest xts isDateTest01 endTime:' + endTime27 + "us")
      let averageTime27 = endTime27 - startTime27
      console.info('appInfoTest xts isDateTest01 averageTime:' + averageTime27 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isDate(new Date);
      }
      endTime(startTime, 'isDateTest01');
      expect(isTrue).assertTrue();
    })


    it('isDateTest02', 0, () => {
      let startTime28 = new Date().getTime()
      console.info('appInfoTest xts isDateTest02 startTime:' + startTime28 + "us")
      let isTrue: boolean = isDate('Mon April 23 2012');

      let endTime28 = new Date().getTime()
      console.info('appInfoTest xts isDateTest02 endTime:' + endTime28 + "us")
      let averageTime28 = endTime28 - startTime28
      console.info('appInfoTest xts isDateTest02 averageTime:' + averageTime28 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isDate('Mon April 23 2012');
      }
      endTime(startTime, 'isDateTest02');
      expect(isTrue).assertFalse();
    })


    it('isEmptyTest01', 0, () => {
      let startTime29 = new Date().getTime()
      console.info('appInfoTest xts isEmptyTest01 startTime:' + startTime29 + "us")
      let isTrue: boolean = isEmpty(null);

      let endTime29 = new Date().getTime()
      console.info('appInfoTest xts isEmptyTest01 endTime:' + endTime29 + "us")
      let averageTime29 = endTime29 - startTime29
      console.info('appInfoTest xts isEmptyTest01 averageTime:' + averageTime29 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isEmpty(null);
      }
      endTime(startTime, 'isEmptyTest01');
      expect(isTrue).assertTrue();
    })


    it('isEmptyTest02', 0, () => {
      let startTime30 = new Date().getTime()
      console.info('appInfoTest xts isEmptyTest02 startTime:' + startTime30 + "us")
      let isTrue: boolean = isEmpty([1, 2, 3]);

      let endTime30 = new Date().getTime()
      console.info('appInfoTest xts isEmptyTest02 endTime:' + endTime30 + "us")
      let averageTime30 = endTime30 - startTime30
      console.info('appInfoTest xts isEmptyTest02 averageTime:' + averageTime30 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isEmpty([1, 2, 3]);
      }
      endTime(startTime, 'isEmptyTest02');
      expect(isTrue).assertFalse();
    })


    it('isEqualTest', 0, () => {
      let startTime31 = new Date().getTime()
      console.info('appInfoTest xts isEqualTest startTime:' + startTime31 + "us")
      let object = {
        a: 1
      } as A;

      let other = {
        a: 1
      } as A;

      let isTrue: boolean = isEqual(object, other);

      let endTime31 = new Date().getTime()
      console.info('appInfoTest xts isEqualTest endTime:' + endTime31 + "us")
      let averageTime31 = endTime31 - startTime31
      console.info('appInfoTest xts isEqualTest averageTime:' + averageTime31 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isEqual(object, other);
      }
      endTime(startTime, 'isEqualTest');
      expect(isTrue).assertTrue();
    })


    it('isEqualWithTest01', 0, () => {
      let startTime103 = new Date().getTime()
      console.info('appInfoTest xts isEqualWithTest01 startTime:' + startTime103 + "us")
      let isGreeting: (value: string) => boolean = (value: string): boolean => {
        let regex: RegExp = new RegExp('^h(?:i|ello)$')
        return regex.test(value);
      }
      let customizer: (objValue: string, othValue: string) => void = (objValue: string, othValue: string): ESObject => {
        if (isGreeting(objValue) && isGreeting(othValue)) {
          return true;
        }
      }
      let array = ['hello', 'goodbye'];
      let other = ['hi', 'goodbye'];
      let isTrue: boolean = isEqualWith(array, other, customizer);
      let endTime103 = new Date().getTime()
      console.info('appInfoTest xts isEqualWithTest01 endTime:' + endTime103 + "us")
      let averageTime103 = endTime103 - startTime103
      console.info('appInfoTest xts isEqualWithTest01 averageTime:' + averageTime103 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isEqualWith(array, other, customizer);
      }
      endTime(startTime, 'isEqualWithTest01');
      expect(isTrue).assertTrue();
    })


    it('isEqualWithTest02', 0, () => {
      let startTime32 = new Date().getTime()
      console.info('appInfoTest xts isEqualWithTest02 startTime:' + startTime32 + "us")
      let customizer = (value: string) => {

        return isString(value) ? false : undefined;

      };

      customizer('str')
      expect(isEqualWith('a', 'a', customizer)).assertFalse();
      let endTime32 = new Date().getTime()
      console.info('appInfoTest xts isEqualWithTest02 endTime:' + endTime32 + "us")
      let averageTime32 = endTime32 - startTime32
      console.info('appInfoTest xts isEqualWithTest02 averageTime:' + averageTime32 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isString('str') ? false : undefined;
      }
      endTime(startTime, 'isEqualWithTest02');
    })


    it('isErrorTest01', 0, () => {
      let startTime33 = new Date().getTime()
      console.info('appInfoTest xts isErrorTest01 startTime:' + startTime33 + "us")
      let isTrue: boolean = isError(new Error);

      let endTime33 = new Date().getTime()
      console.info('appInfoTest xts isErrorTest01 endTime:' + endTime33 + "us")
      let averageTime33 = endTime33 - startTime33
      console.info('appInfoTest xts isErrorTest01 averageTime:' + averageTime33 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isError(new Error);
      }
      endTime(startTime, 'isErrorTest01');
      expect(isTrue).assertTrue();
    })


    it('isErrorTest02', 0, () => {
      let startTime34 = new Date().getTime()
      console.info('appInfoTest xts isErrorTest02 startTime:' + startTime34 + "us")
      let isTrue: boolean = isError(Error);

      let endTime34 = new Date().getTime()
      console.info('appInfoTest xts isErrorTest02 endTime:' + endTime34 + "us")
      let averageTime34 = endTime34 - startTime34
      console.info('appInfoTest xts isErrorTest02 averageTime:' + averageTime34 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isError(Error);
      }
      endTime(startTime, 'isErrorTest02');
      expect(isTrue).assertFalse();
    })


    it('isFiniteTest01', 0, () => {
      let startTime35 = new Date().getTime()
      console.info('appInfoTest xts isFiniteTest01 startTime:' + startTime35 + "us")
      expect(isFinite(3)).assertTrue();
      let endTime35 = new Date().getTime()
      console.info('appInfoTest xts isFiniteTest01 endTime:' + endTime35 + "us")
      let averageTime35 = endTime35 - startTime35
      console.info('appInfoTest xts isFiniteTest01 averageTime:' + averageTime35 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isFinite(3)
      }
      endTime(startTime, 'isFiniteTest01');
    })


    it('isFiniteTest02', 0, () => {
      let startTime36 = new Date().getTime()
      console.info('appInfoTest xts isFiniteTest02 startTime:' + startTime36 + "us")
      expect(isFinite('22')).assertFalse();
      let endTime36 = new Date().getTime()
      console.info('appInfoTest xts isFiniteTest02 endTime:' + endTime36 + "us")
      let averageTime36 = endTime36 - startTime36
      console.info('appInfoTest xts isFiniteTest02 averageTime:' + averageTime36 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isFinite('22')
      }
      endTime(startTime, 'isFiniteTest02');
    })


    it('isFunctionTest01', 0, () => {
      let startTime37 = new Date().getTime()
      console.info('appInfoTest xts isFunctionTest01 startTime:' + startTime37 + "us")
      expect(isFunction(() => {
      })).assertTrue();
      let endTime37 = new Date().getTime()
      console.info('appInfoTest xts isFunctionTest01 endTime:' + endTime37 + "us")
      let averageTime37 = endTime37 - startTime37
      console.info('appInfoTest xts isFunctionTest01 averageTime:' + averageTime37 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isFunction(() => {
        })
      }
      endTime(startTime, 'isFunctionTest01');
    })


    it('isFunctionTest02', 0, () => {
      let startTime38 = new Date().getTime()
      console.info('appInfoTest xts isFunctionTest02 startTime:' + startTime38 + "us")
      let regex: RegExp = new RegExp('/abc/')
      expect(isFunction(regex)).assertFalse();
      let endTime38 = new Date().getTime()
      console.info('appInfoTest xts isFunctionTest02 endTime:' + endTime38 + "us")
      let averageTime38 = endTime38 - startTime38
      console.info('appInfoTest xts isFunctionTest02 averageTime:' + averageTime38 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isFunction(new RegExp('/abc/'))
      }
      endTime(startTime, 'isFunctionTest02');
    })


    it('isIntegerTest01', 0, () => {
      let startTime39 = new Date().getTime()
      console.info('appInfoTest xts isIntegerTest01 startTime:' + startTime39 + "us")
      expect(isInteger(3)).assertTrue();
      let endTime39 = new Date().getTime()
      console.info('appInfoTest xts isIntegerTest01 endTime:' + endTime39 + "us")
      let averageTime39 = endTime39 - startTime39
      console.info('appInfoTest xts isIntegerTest01 averageTime:' + averageTime39 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isInteger(3)
      }
      endTime(startTime, 'isIntegerTest01');
    })


    it('isIntegerTest02', 0, () => {
      let startTime40 = new Date().getTime()
      console.info('appInfoTest xts isIntegerTest02 startTime:' + startTime40 + "us")
      expect(isInteger(Number.MIN_VALUE)).assertFalse();
      let endTime40 = new Date().getTime()
      console.info('appInfoTest xts isIntegerTest02 endTime:' + endTime40 + "us")
      let averageTime40 = endTime40 - startTime40
      console.info('appInfoTest xts isIntegerTest02 averageTime:' + averageTime40 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isInteger(Number.MIN_VALUE)
      }
      endTime(startTime, 'isIntegerTest02');
    })


    it('isLengthTest01', 0, () => {
      let startTime41 = new Date().getTime()
      console.info('appInfoTest xts isLengthTest01 startTime:' + startTime41 + "us")
      expect(isLength(3)).assertTrue();
      let endTime41 = new Date().getTime()
      console.info('appInfoTest xts isLengthTest01 endTime:' + endTime41 + "us")
      let averageTime41 = endTime41 - startTime41
      console.info('appInfoTest xts isLengthTest01 averageTime:' + averageTime41 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isLength(3)
      }
      endTime(startTime, 'isLengthTest01');
    })


    it('isLengthTest02', 0, () => {
      let startTime42 = new Date().getTime()
      console.info('appInfoTest xts isLengthTest02 startTime:' + startTime42 + "us")
      expect(isLength(Number.MIN_VALUE)).assertFalse();
      let endTime42 = new Date().getTime()
      console.info('appInfoTest xts isLengthTest02 endTime:' + endTime42 + "us")
      let averageTime42 = endTime42 - startTime42
      console.info('appInfoTest xts isLengthTest02 averageTime:' + averageTime42 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isLength(Number.MIN_VALUE)
      }
      endTime(startTime, 'isLengthTest02');
    })


    it('isMapTest01', 0, () => {
      let startTime43 = new Date().getTime()
      console.info('appInfoTest xts isMapTest01 startTime:' + startTime43 + "us")
      expect(isMap(new Map)).assertTrue();
      let endTime43 = new Date().getTime()
      console.info('appInfoTest xts isMapTest01 endTime:' + endTime43 + "us")
      let averageTime43 = endTime43 - startTime43
      console.info('appInfoTest xts isMapTest01 averageTime:' + averageTime43 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isMap(new Map)
      }
      endTime(startTime, 'isMapTest01');
    })


    it('isMapTest02', 0, () => {
      let startTime44 = new Date().getTime()
      console.info('appInfoTest xts isMapTest02 startTime:' + startTime44 + "us")
      expect(isMap({})).assertFalse();
      let endTime44 = new Date().getTime()
      console.info('appInfoTest xts isMapTest02 endTime:' + endTime44 + "us")
      let averageTime44 = endTime44 - startTime44
      console.info('appInfoTest xts isMapTest02 averageTime:' + averageTime44 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isMap({})
      }
      endTime(startTime, 'isMapTest02');
    })


    it('isMatchTest01', 0, () => {
      let startTime45 = new Date().getTime()
      console.info('appInfoTest xts isMatchTest01 startTime:' + startTime45 + "us")
      let object = {
        a: 1, b: 2
      } as AB;

      let match: boolean = isMatch(object, {
        b: 2
      } as B);

      let endTime45 = new Date().getTime()
      console.info('appInfoTest xts isMatchTest01 endTime:' + endTime45 + "us")
      let averageTime45 = endTime45 - startTime45
      console.info('appInfoTest xts isMatchTest01 averageTime:' + averageTime45 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isMatch(object, {
          b: 2
        } as B);
      }
      endTime(startTime, 'isMatchTest01');
      expect(match).assertTrue();
    })


    it('isMatchTest02', 0, () => {
      let startTime46 = new Date().getTime()
      console.info('appInfoTest xts isMatchTest02 startTime:' + startTime46 + "us")
      let object = {
        a: 1, b: 2
      } as AB;

      let match: boolean = isMatch(object, {
        b: 1
      } as B);

      let endTime46 = new Date().getTime()
      console.info('appInfoTest xts isMatchTest02 endTime:' + endTime46 + "us")
      let averageTime46 = endTime46 - startTime46
      console.info('appInfoTest xts isMatchTest02 averageTime:' + averageTime46 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isMatch(object, {
          b: 1
        } as B);
      }
      endTime(startTime, 'isMatchTest02');
      expect(match).assertFalse();
    })


    it('isMatchWithTest01', 0, () => {
      let startTime47 = new Date().getTime()
      console.info('appInfoTest xts isMatchWithTest01 startTime:' + startTime47 + "us")
      let isGreeting: (value: string) => boolean = (value: string): boolean => {

        let regex: RegExp = new RegExp('^h(?:i|ello)$')

        return regex.test(value);

      }

      let customizer: (objValue: string, othValue: string) => void = (objValue: string, othValue: string): boolean => {

        if (isGreeting(objValue) && isGreeting(othValue)) {

          return true;

        } else {

          return false;

        }

      }

      let object: Greet = {
        greeting: 'hello'
      };

      let source: Greet = {
        greeting: 'hi'
      };

      let matchWith: boolean = isMatchWith(object, source, customizer);

      let endTime47 = new Date().getTime()
      console.info('appInfoTest xts isMatchWithTest01 endTime:' + endTime47 + "us")
      let averageTime47 = endTime47 - startTime47
      console.info('appInfoTest xts isMatchWithTest01 averageTime:' + averageTime47 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isMatchWith(object, source, customizer);
      }
      endTime(startTime, 'isMatchWithTest01');
      expect(matchWith).assertTrue();
    })


    it('isMatchWithTest02', 0, () => {
      let startTime48 = new Date().getTime()
      console.info('appInfoTest xts isMatchWithTest02 startTime:' + startTime48 + "us")
      let customizer = (value: string): boolean | undefined => {

        return isString(value) || undefined;

      };
      expect(isMatchWith(['a'], ['b'], customizer)).assertTrue();
      let endTime48 = new Date().getTime()
      console.info('appInfoTest xts isMatchWithTest02 endTime:' + endTime48 + "us")
      let averageTime48 = endTime48 - startTime48
      console.info('appInfoTest xts isMatchWithTest02 averageTime:' + averageTime48 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isMatchWith(['a'], ['b'], customizer);
      }
      endTime(startTime, 'isMatchWithTest02');
    })

    it('isNaNTest02', 0, () => {
      let startTime50 = new Date().getTime()
      console.info('appInfoTest xts isNaNTest02 startTime:' + startTime50 + "us")
      expect(isNaN(undefined)).assertFalse();
      let endTime50 = new Date().getTime()
      console.info('appInfoTest xts isNaNTest02 endTime:' + endTime50 + "us")
      let averageTime50 = endTime50 - startTime50
      console.info('appInfoTest xts isNaNTest02 averageTime:' + averageTime50 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isNaN(undefined)
      }
      endTime(startTime, 'isNaNTest02');
    })


    it('isNativeTest01', 0, () => {
      let startTime51 = new Date().getTime()
      console.info('appInfoTest xts isNativeTest01 startTime:' + startTime51 + "us")
      expect(isNative(String.toString)).assertTrue();
      let endTime51 = new Date().getTime()
      console.info('appInfoTest xts isNativeTest01 endTime:' + endTime51 + "us")
      let averageTime51 = endTime51 - startTime51
      console.info('appInfoTest xts isNativeTest01 averageTime:' + averageTime51 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isNative(String.toString)
      }
      endTime(startTime, 'isNativeTest01');
    })


    it('isNativeTest02', 0, () => {
      let startTime52 = new Date().getTime()
      console.info('appInfoTest xts isNativeTest02 startTime:' + startTime52 + "us")
      expect(isNative(undefined)).assertFalse();
      let endTime52 = new Date().getTime()
      console.info('appInfoTest xts isNativeTest02 endTime:' + endTime52 + "us")
      let averageTime52 = endTime52 - startTime52
      console.info('appInfoTest xts isNativeTest02 averageTime:' + averageTime52 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isNative(undefined)
      }
      endTime(startTime, 'isNativeTest02');
    })


    it('isNilTest01', 0, () => {
      let startTime53 = new Date().getTime()
      console.info('appInfoTest xts isNilTest01 startTime:' + startTime53 + "us")
      expect(isNil(null)).assertTrue();
      let endTime53 = new Date().getTime()
      console.info('appInfoTest xts isNilTest01 endTime:' + endTime53 + "us")
      let averageTime53 = endTime53 - startTime53
      console.info('appInfoTest xts isNilTest01 averageTime:' + averageTime53 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isNil(null)
      }
      endTime(startTime, 'isNilTest01');
    })


    it('isNilTest02', 0, () => {
      let startTime54 = new Date().getTime()
      console.info('appInfoTest xts isNilTest02 startTime:' + startTime54 + "us")
      expect(isNil(1)).assertFalse();
      let endTime54 = new Date().getTime()
      console.info('appInfoTest xts isNilTest02 endTime:' + endTime54 + "us")
      let averageTime54 = endTime54 - startTime54
      console.info('appInfoTest xts isNilTest02 averageTime:' + averageTime54 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isNil(1)
      }
      endTime(startTime, 'isNilTest02');
    })


    it('isNullTest01', 0, () => {
      let startTime55 = new Date().getTime()
      console.info('appInfoTest xts isNullTest01 startTime:' + startTime55 + "us")
      expect(isNull(null)).assertTrue();
      let endTime55 = new Date().getTime()
      console.info('appInfoTest xts isNullTest01 endTime:' + endTime55 + "us")
      let averageTime55 = endTime55 - startTime55
      console.info('appInfoTest xts isNullTest01 averageTime:' + averageTime55 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isNull(null)
      }
      endTime(startTime, 'isNullTest01');
    })


    it('isNullTest02', 0, () => {
      let startTime56 = new Date().getTime()
      console.info('appInfoTest xts isNullTest02 startTime:' + startTime56 + "us")
      expect(isNull(void 0)).assertFalse();
      let endTime56 = new Date().getTime()
      console.info('appInfoTest xts isNullTest02 endTime:' + endTime56 + "us")
      let averageTime56 = endTime56 - startTime56
      console.info('appInfoTest xts isNullTest02 averageTime:' + averageTime56 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isNull(void 0)
      }
      endTime(startTime, 'isNullTest02');
    })


    it('isNumberTest01', 0, () => {
      let startTime57 = new Date().getTime()
      console.info('appInfoTest xts isNumberTest01 startTime:' + startTime57 + "us")
      expect(isNumber(3)).assertTrue();
      let endTime57 = new Date().getTime()
      console.info('appInfoTest xts isNumberTest01 endTime:' + endTime57 + "us")
      let averageTime57 = endTime57 - startTime57
      console.info('appInfoTest xts isNumberTest01 averageTime:' + averageTime57 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isNumber(3)
      }
      endTime(startTime, 'isNumberTest01');
    })


    it('isNumberTest02', 0, () => {
      let startTime58 = new Date().getTime()
      console.info('appInfoTest xts isNumberTest02 startTime:' + startTime58 + "us")
      expect(isNumber('3')).assertFalse();
      let endTime58 = new Date().getTime()
      console.info('appInfoTest xts isNumberTest02 endTime:' + endTime58 + "us")
      let averageTime58 = endTime58 - startTime58
      console.info('appInfoTest xts isNumberTest02 averageTime:' + averageTime58 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isNumber('3')
      }
      endTime(startTime, 'isNumberTest02');
    })


    it('isObjectTest01', 0, () => {
      let startTime59 = new Date().getTime()
      console.info('appInfoTest xts isObjectTest01 startTime:' + startTime59 + "us")
      expect(isObject({})).assertTrue();
      let endTime59 = new Date().getTime()
      console.info('appInfoTest xts isObjectTest01 endTime:' + endTime59 + "us")
      let averageTime59 = endTime59 - startTime59
      console.info('appInfoTest xts isObjectTest01 averageTime:' + averageTime59 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isObject({})
      }
      endTime(startTime, 'isObjectTest01');
    })


    it('isObjectTest02', 0, () => {
      let startTime60 = new Date().getTime()
      console.info('appInfoTest xts isObjectTest02 startTime:' + startTime60 + "us")
      expect(isObject(null)).assertFalse();
      let endTime60 = new Date().getTime()
      console.info('appInfoTest xts isObjectTest02 endTime:' + endTime60 + "us")
      let averageTime60 = endTime60 - startTime60
      console.info('appInfoTest xts isObjectTest02 averageTime:' + averageTime60 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isObject(null)
      }
      endTime(startTime, 'isObjectTest02');
    })


    it('isObjectLikeTest01', 0, () => {
      let startTime61 = new Date().getTime()
      console.info('appInfoTest xts isObjectLikeTest01 startTime:' + startTime61 + "us")
      expect(isObjectLike([1, 2, 3])).assertTrue();
      let endTime61 = new Date().getTime()
      console.info('appInfoTest xts isObjectLikeTest01 endTime:' + endTime61 + "us")
      let averageTime61 = endTime61 - startTime61
      console.info('appInfoTest xts isObjectLikeTest01 averageTime:' + averageTime61 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isObjectLike([1, 2, 3])
      }
      endTime(startTime, 'isObjectLikeTest01');
    })


    it('isObjectLikeTest02', 0, () => {
      let startTime62 = new Date().getTime()
      console.info('appInfoTest xts isObjectLikeTest02 startTime:' + startTime62 + "us")
      expect(isObjectLike(null)).assertFalse();
      let endTime62 = new Date().getTime()
      console.info('appInfoTest xts isObjectLikeTest02 endTime:' + endTime62 + "us")
      let averageTime62 = endTime62 - startTime62
      console.info('appInfoTest xts isObjectLikeTest02 averageTime:' + averageTime62 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isObjectLike(null)
      }
      endTime(startTime, 'isObjectLikeTest02');
    })


    it('isPlainObjectTest01', 0, () => {
      let startTime63 = new Date().getTime()
      console.info('appInfoTest xts isPlainObjectTest01 startTime:' + startTime63 + "us")
      expect(isPlainObject([1, 2, 3])).assertFalse();
      let endTime63 = new Date().getTime()
      console.info('appInfoTest xts isPlainObjectTest01 endTime:' + endTime63 + "us")
      let averageTime63 = endTime63 - startTime63
      console.info('appInfoTest xts isPlainObjectTest01 averageTime:' + averageTime63 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isPlainObject([1, 2, 3])
      }
      endTime(startTime, 'isPlainObjectTest01');
    })


    it('isPlainObjectTest02', 0, () => {
      let startTime64 = new Date().getTime()
      console.info('appInfoTest xts isPlainObjectTest02 startTime:' + startTime64 + "us")
      expect(isPlainObject({
        'x': 0, 'y': 0
      })).assertTrue();
      let endTime64 = new Date().getTime()
      console.info('appInfoTest xts isPlainObjectTest02 endTime:' + endTime64 + "us")
      let averageTime64 = endTime64 - startTime64
      console.info('appInfoTest xts isPlainObjectTest02 averageTime:' + averageTime64 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isPlainObject({
          'x': 0, 'y': 0
        })
      }
      endTime(startTime, 'isPlainObjectTest02');
    })


    it('isRegExpTest01', 0, () => {
      let startTime65 = new Date().getTime()
      console.info('appInfoTest xts isRegExpTest01 startTime:' + startTime65 + "us")
      let regex: ESObject = new RegExp('abc');
      expect(isRegExp(regex)).assertTrue();
      let endTime65 = new Date().getTime()
      console.info('appInfoTest xts isRegExpTest01 endTime:' + endTime65 + "us")
      let averageTime65 = endTime65 - startTime65
      console.info('appInfoTest xts isRegExpTest01 averageTime:' + averageTime65 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isRegExp(regex)
      }
      endTime(startTime, 'isRegExpTest01');
    })


    it('isRegExpTest02', 0, () => {
      let startTime66 = new Date().getTime()
      console.info('appInfoTest xts isRegExpTest02 startTime:' + startTime66 + "us")
      expect(isRegExp('/abc/')).assertFalse();
      let endTime66 = new Date().getTime()
      console.info('appInfoTest xts isRegExpTest02 endTime:' + endTime66 + "us")
      let averageTime66 = endTime66 - startTime66
      console.info('appInfoTest xts isRegExpTest02 averageTime:' + averageTime66 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isRegExp('/abc/')
      }
      endTime(startTime, 'isRegExpTest02');
    })


    it('isSafeIntegerTest01', 0, () => {
      let startTime67 = new Date().getTime()
      console.info('appInfoTest xts isSafeIntegerTest01 startTime:' + startTime67 + "us")
      expect(isSafeInteger(Number.MIN_VALUE)).assertFalse();
      let endTime67 = new Date().getTime()
      console.info('appInfoTest xts isSafeIntegerTest01 endTime:' + endTime67 + "us")
      let averageTime67 = endTime67 - startTime67
      console.info('appInfoTest xts isSafeIntegerTest01 averageTime:' + averageTime67 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isSafeInteger(Number.MIN_VALUE)
      }
      endTime(startTime, 'isSafeIntegerTest01');
    })


    it('isSafeIntegerTest02', 0, () => {
      let startTime68 = new Date().getTime()
      console.info('appInfoTest xts isSafeIntegerTest02 startTime:' + startTime68 + "us")
      expect(isSafeInteger(3)).assertTrue();
      let endTime68 = new Date().getTime()
      console.info('appInfoTest xts isSafeIntegerTest02 endTime:' + endTime68 + "us")
      let averageTime68 = endTime68 - startTime68
      console.info('appInfoTest xts isSafeIntegerTest02 averageTime:' + averageTime68 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isSafeInteger(3)
      }
      endTime(startTime, 'isSafeIntegerTest02');
    })


    it('isSetTest01', 0, () => {
      let startTime69 = new Date().getTime()
      console.info('appInfoTest xts isSetTest01 startTime:' + startTime69 + "us")
      expect(isSet(new Set([1, 2, 3, 4, 5]))).assertTrue();
      let endTime69 = new Date().getTime()
      console.info('appInfoTest xts isSetTest01 endTime:' + endTime69 + "us")
      let averageTime69 = endTime69 - startTime69
      console.info('appInfoTest xts isSetTest01 averageTime:' + averageTime69 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isSet(new Set([1, 2, 3, 4, 5]))
      }
      endTime(startTime, 'isSetTest01');
    })


    it('isSetTest02', 0, () => {
      let startTime70 = new Date().getTime()
      console.info('appInfoTest xts isSetTest02 startTime:' + startTime70 + "us")
      expect(isSet(new WeakSet)).assertFalse();
      let endTime70 = new Date().getTime()
      console.info('appInfoTest xts isSetTest02 endTime:' + endTime70 + "us")
      let averageTime70 = endTime70 - startTime70
      console.info('appInfoTest xts isSetTest02 averageTime:' + averageTime70 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isSet(new WeakSet)
      }
      endTime(startTime, 'isSetTest02');
    })


    it('isStringTest01', 0, () => {
      let startTime71 = new Date().getTime()
      console.info('appInfoTest xts isStringTest01 startTime:' + startTime71 + "us")
      expect(isString('abc')).assertTrue();
      let endTime71 = new Date().getTime()
      console.info('appInfoTest xts isStringTest01 endTime:' + endTime71 + "us")
      let averageTime71 = endTime71 - startTime71
      console.info('appInfoTest xts isStringTest01 averageTime:' + averageTime71 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isString('abc')
      }
      endTime(startTime, 'isStringTest01');
    })


    it('isStringTest02', 0, () => {
      let startTime72 = new Date().getTime()
      console.info('appInfoTest xts isStringTest02 startTime:' + startTime72 + "us")
      expect(isString(1)).assertFalse();
      let endTime72 = new Date().getTime()
      console.info('appInfoTest xts isStringTest02 endTime:' + endTime72 + "us")
      let averageTime72 = endTime72 - startTime72
      console.info('appInfoTest xts isStringTest02 averageTime:' + averageTime72 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isString(1)
      }
      endTime(startTime, 'isStringTest02');
    })


    it('isSymbolTest01', 0, () => {
      let startTime73 = new Date().getTime()
      console.info('appInfoTest xts isSymbolTest01 startTime:' + startTime73 + "us")
      expect(isSymbol(Symbol.iterator)).assertTrue();
      let endTime73 = new Date().getTime()
      console.info('appInfoTest xts isSymbolTest01 endTime:' + endTime73 + "us")
      let averageTime73 = endTime73 - startTime73
      console.info('appInfoTest xts isSymbolTest01 averageTime:' + averageTime73 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isSymbol(Symbol.iterator)
      }
      endTime(startTime, 'isSymbolTest01');
    })


    it('isSymbolTest02', 0, () => {
      let startTime74 = new Date().getTime()
      console.info('appInfoTest xts isSymbolTest02 startTime:' + startTime74 + "us")
      expect(isSymbol('abc')).assertFalse();
      let endTime74 = new Date().getTime()
      console.info('appInfoTest xts isSymbolTest02 endTime:' + endTime74 + "us")
      let averageTime74 = endTime74 - startTime74
      console.info('appInfoTest xts isSymbolTest02 averageTime:' + averageTime74 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isSymbol('abc')
      }
      endTime(startTime, 'isSymbolTest02');
    })


    it('isTypedArrayTest01', 0, () => {
      let startTime75 = new Date().getTime()
      console.info('appInfoTest xts isTypedArrayTest01 startTime:' + startTime75 + "us")
      expect(isTypedArray(new Uint8Array)).assertTrue();
      let endTime75 = new Date().getTime()
      console.info('appInfoTest xts isTypedArrayTest01 endTime:' + endTime75 + "us")
      let averageTime75 = endTime75 - startTime75
      console.info('appInfoTest xts isTypedArrayTest01 averageTime:' + averageTime75 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isTypedArray(new Uint8Array)
      }
      endTime(startTime, 'isTypedArrayTest01');
    })


    it('isTypedArrayTest02', 0, () => {
      let startTime76 = new Date().getTime()
      console.info('appInfoTest xts isTypedArrayTest02 startTime:' + startTime76 + "us")
      expect(isTypedArray([])).assertFalse();
      let endTime76 = new Date().getTime()
      console.info('appInfoTest xts isTypedArrayTest02 endTime:' + endTime76 + "us")
      let averageTime76 = endTime76 - startTime76
      console.info('appInfoTest xts isTypedArrayTest02 averageTime:' + averageTime76 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isTypedArray([])
      }
      endTime(startTime, 'isTypedArrayTest02');
    })


    it('isUndefinedTest01', 0, () => {
      let startTime77 = new Date().getTime()
      console.info('appInfoTest xts isUndefinedTest01 startTime:' + startTime77 + "us")
      expect(isUndefined(void 0)).assertTrue();
      let endTime77 = new Date().getTime()
      console.info('appInfoTest xts isUndefinedTest01 endTime:' + endTime77 + "us")
      let averageTime77 = endTime77 - startTime77
      console.info('appInfoTest xts isUndefinedTest01 averageTime:' + averageTime77 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isUndefined(void 0)
      }
      endTime(startTime, 'isUndefinedTest01');
    })


    it('isUndefinedTest02', 0, () => {
      let startTime78 = new Date().getTime()
      console.info('appInfoTest xts isUndefinedTest02 startTime:' + startTime78 + "us")
      expect(isUndefined(null)).assertFalse();
      let endTime78 = new Date().getTime()
      console.info('appInfoTest xts isUndefinedTest02 endTime:' + endTime78 + "us")
      let averageTime78 = endTime78 - startTime78
      console.info('appInfoTest xts isUndefinedTest02 averageTime:' + averageTime78 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isUndefined(null)
      }
      endTime(startTime, 'isUndefinedTest02');
    })


    it('isWeakMapTest01', 0, () => {
      let startTime79 = new Date().getTime()
      console.info('appInfoTest xts isWeakMapTest01 startTime:' + startTime79 + "us")
      let obj: ESObject = new Array(2);

      obj.fill(5);

      expect(isWeakMap(obj)).assertFalse();
      let endTime79 = new Date().getTime()
      console.info('appInfoTest xts isWeakMapTest01 endTime:' + endTime79 + "us")
      let averageTime79 = endTime79 - startTime79
      console.info('appInfoTest xts isWeakMapTest01 averageTime:' + averageTime79 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isWeakMap(obj)
      }
      endTime(startTime, 'isWeakMapTest01');
    })


    it('isWeakMapTest02', 0, () => {
      let startTime80 = new Date().getTime()
      console.info('appInfoTest xts isWeakMapTest02 startTime:' + startTime80 + "us")
      expect(isWeakMap(new Map)).assertFalse();
      let endTime80 = new Date().getTime()
      console.info('appInfoTest xts isWeakMapTest02 endTime:' + endTime80 + "us")
      let averageTime80 = endTime80 - startTime80
      console.info('appInfoTest xts isWeakMapTest02 averageTime:' + averageTime80 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isWeakMap(new Map)
      }
      endTime(startTime, 'isWeakMapTest02');
    })


    it('isWeakSetTest01', 0, () => {
      let startTime81 = new Date().getTime()
      console.info('appInfoTest xts isWeakSetTest01 startTime:' + startTime81 + "us")
      expect(isWeakSet(new WeakSet)).assertTrue();
      let endTime81 = new Date().getTime()
      console.info('appInfoTest xts isWeakSetTest01 endTime:' + endTime81 + "us")
      let averageTime81 = endTime81 - startTime81
      console.info('appInfoTest xts isWeakSetTest01 averageTime:' + averageTime81 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isWeakSet(new WeakSet)
      }
      endTime(startTime, 'isWeakSetTest01');
    })


    it('isWeakSetTest02', 0, () => {
      let startTime82 = new Date().getTime()
      console.info('appInfoTest xts isWeakSetTest02 startTime:' + startTime82 + "us")
      expect(isWeakSet(new Set([1, 2, 3]))).assertFalse();
      let endTime82 = new Date().getTime()
      console.info('appInfoTest xts isWeakSetTest02 endTime:' + endTime82 + "us")
      let averageTime82 = endTime82 - startTime82
      console.info('appInfoTest xts isWeakSetTest02 averageTime:' + averageTime82 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        isWeakSet(new Set([1, 2, 3]))
      }
      endTime(startTime, 'isWeakSetTest02');
    })


    it('ltTest01', 0, () => {
      let startTime83 = new Date().getTime()
      console.info('appInfoTest xts ltTest01 startTime:' + startTime83 + "us")
      expect(lt(1, 3)).assertTrue();
      let endTime83 = new Date().getTime()
      console.info('appInfoTest xts ltTest01 endTime:' + endTime83 + "us")
      let averageTime83 = endTime83 - startTime83
      console.info('appInfoTest xts ltTest01 averageTime:' + averageTime83 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        lt(1, 3)
      }
      endTime(startTime, 'ltTest01');
    })


    it('ltTest02', 0, () => {
      let startTime84 = new Date().getTime()
      console.info('appInfoTest xts ltTest02 startTime:' + startTime84 + "us")
      expect(lt(3, 1)).assertFalse();
      let endTime84 = new Date().getTime()
      console.info('appInfoTest xts ltTest02 endTime:' + endTime84 + "us")
      let averageTime84 = endTime84 - startTime84
      console.info('appInfoTest xts ltTest02 averageTime:' + averageTime84 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        lt(3, 1)
      }
      endTime(startTime, 'ltTest02');
    })


    it('lteTest01', 0, () => {
      let startTime85 = new Date().getTime()
      console.info('appInfoTest xts lteTest01 startTime:' + startTime85 + "us")
      expect(lte(1, 3)).assertTrue();
      let endTime85 = new Date().getTime()
      console.info('appInfoTest xts lteTest01 endTime:' + endTime85 + "us")
      let averageTime85 = endTime85 - startTime85
      console.info('appInfoTest xts lteTest01 averageTime:' + averageTime85 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        lte(1, 3)
      }
      endTime(startTime, 'lteTest01');
    })


    it('lteTest02', 0, () => {
      let startTime86 = new Date().getTime()
      console.info('appInfoTest xts lteTest02 startTime:' + startTime86 + "us")
      expect(lte(3, 1)).assertFalse();
      let endTime86 = new Date().getTime()
      console.info('appInfoTest xts lteTest02 endTime:' + endTime86 + "us")
      let averageTime86 = endTime86 - startTime86
      console.info('appInfoTest xts lteTest02 averageTime:' + averageTime86 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        lte(3, 1)
      }
      endTime(startTime, 'lteTest02');
    })


    it('toArrayTest01', 0, () => {
      let startTime87 = new Date().getTime()
      console.info('appInfoTest xts toArrayTest01 startTime:' + startTime87 + "us")
      expect(JSON.stringify(toArray({
        'a': 1, 'b': 2
      }))).assertEqual('[1,2]');
      let endTime87 = new Date().getTime()
      console.info('appInfoTest xts toArrayTest01 endTime:' + endTime87 + "us")
      let averageTime87 = endTime87 - startTime87
      console.info('appInfoTest xts toArrayTest01 averageTime:' + averageTime87 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        toArray({
          'a': 1, 'b': 2
        })
      }
      endTime(startTime, 'toArrayTest01');
    })


    it('toArrayTest02', 0, () => {
      let startTime88 = new Date().getTime()
      console.info('appInfoTest xts toArrayTest02 startTime:' + startTime88 + "us")
      expect(JSON.stringify(toArray('abc'))).assertEqual('["a","b","c"]');
      let endTime88 = new Date().getTime()
      console.info('appInfoTest xts toArrayTest02 endTime:' + endTime88 + "us")
      let averageTime88 = endTime88 - startTime88
      console.info('appInfoTest xts toArrayTest02 averageTime:' + averageTime88 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        toArray('abc')
      }
      endTime(startTime, 'toArrayTest02');
    })


    it('toFiniteTest01', 0, () => {
      let startTime89 = new Date().getTime()
      console.info('appInfoTest xts toFiniteTest01 startTime:' + startTime89 + "us")
      expect(toFinite(Number.MIN_VALUE)).assertEqual(5e-324);
      let endTime89 = new Date().getTime()
      console.info('appInfoTest xts toFiniteTest01 endTime:' + endTime89 + "us")
      let averageTime89 = endTime89 - startTime89
      console.info('appInfoTest xts toFiniteTest01 averageTime:' + averageTime89 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        toFinite(Number.MIN_VALUE)
      }
      endTime(startTime, 'toFiniteTest01');
    })


    it('toFiniteTest02', 0, () => {
      let startTime90 = new Date().getTime()
      console.info('appInfoTest xts toFiniteTest02 startTime:' + startTime90 + "us")
      expect(toFinite(Math.PI)).assertEqual(3.141592653589793);
      let endTime90 = new Date().getTime()
      console.info('appInfoTest xts toFiniteTest02 endTime:' + endTime90 + "us")
      let averageTime90 = endTime90 - startTime90
      console.info('appInfoTest xts toFiniteTest02 averageTime:' + averageTime90 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        toFinite(Math.PI)
      }
      endTime(startTime, 'toFiniteTest02');
    })


    it('toIntegerTest01', 0, () => {
      let startTime91 = new Date().getTime()
      console.info('appInfoTest xts toIntegerTest01 startTime:' + startTime91 + "us")
      expect(toInteger(Number.MIN_VALUE)).assertEqual(0);
      let endTime91 = new Date().getTime()
      console.info('appInfoTest xts toIntegerTest01 endTime:' + endTime91 + "us")
      let averageTime91 = endTime91 - startTime91
      console.info('appInfoTest xts toIntegerTest01 averageTime:' + averageTime91 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        toInteger(Number.MIN_VALUE)
      }
      endTime(startTime, 'toIntegerTest01');
    })


    it('toIntegerTest02', 0, () => {
      let startTime92 = new Date().getTime()
      console.info('appInfoTest xts toIntegerTest02 startTime:' + startTime92 + "us")
      expect(toInteger(Math.PI)).assertEqual(3);
      let endTime92 = new Date().getTime()
      console.info('appInfoTest xts toIntegerTest02 endTime:' + endTime92 + "us")
      let averageTime92 = endTime92 - startTime92
      console.info('appInfoTest xts toIntegerTest02 averageTime:' + averageTime92 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        toInteger(Math.PI)
      }
      endTime(startTime, 'toIntegerTest02');
    })


    it('toLengthTest01', 0, () => {
      let startTime93 = new Date().getTime()
      console.info('appInfoTest xts toLengthTest01 startTime:' + startTime93 + "us")
      expect(toLength(Number.MIN_VALUE)).assertEqual(0);
      let endTime93 = new Date().getTime()
      console.info('appInfoTest xts toLengthTest01 endTime:' + endTime93 + "us")
      let averageTime93 = endTime93 - startTime93
      console.info('appInfoTest xts toLengthTest01 averageTime:' + averageTime93 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        toLength(Number.MIN_VALUE)
      }
      endTime(startTime, 'toLengthTest01');
    })


    it('toLengthTest02', 0, () => {
      let startTime94 = new Date().getTime()
      console.info('appInfoTest xts toLengthTest02 startTime:' + startTime94 + "us")
      expect(toLength(Math.PI)).assertEqual(3);
      let endTime94 = new Date().getTime()
      console.info('appInfoTest xts toLengthTest02 endTime:' + endTime94 + "us")
      let averageTime94 = endTime94 - startTime94
      console.info('appInfoTest xts toLengthTest02 averageTime:' + averageTime94 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        toLength(Math.PI)
      }
      endTime(startTime, 'toLengthTest02');
    })


    it('toNumberTest01', 0, () => {
      let startTime95 = new Date().getTime()
      console.info('appInfoTest xts toNumberTest01 startTime:' + startTime95 + "us")
      expect(toNumber(Number.MIN_VALUE)).assertEqual(5e-324);
      let endTime95 = new Date().getTime()
      console.info('appInfoTest xts toNumberTest01 endTime:' + endTime95 + "us")
      let averageTime95 = endTime95 - startTime95
      console.info('appInfoTest xts toNumberTest01 averageTime:' + averageTime95 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        toNumber(Number.MIN_VALUE)
      }
      endTime(startTime, 'toNumberTest01');
    })


    it('toNumberTest02', 0, () => {
      let startTime96 = new Date().getTime()
      console.info('appInfoTest xts toNumberTest02 startTime:' + startTime96 + "us")
      expect(toNumber(Math.PI)).assertEqual(Math.PI);
      let endTime96 = new Date().getTime()
      console.info('appInfoTest xts toNumberTest02 endTime:' + endTime96 + "us")
      let averageTime96 = endTime96 - startTime96
      console.info('appInfoTest xts toNumberTest02 averageTime:' + averageTime96 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        toNumber(Math.PI)
      }
      endTime(startTime, 'toNumberTest02');
    })


    it('toPlainObjectTest01', 0, () => {
      let startTime97 = new Date().getTime()
      console.info('appInfoTest xts toPlainObjectTest01 startTime:' + startTime97 + "us")
      let plainObject: object = assign({
        'b': 2
      }, toPlainObject(['c', 'd']))

      let endTime97 = new Date().getTime()
      console.info('appInfoTest xts toPlainObjectTest01 endTime:' + endTime97 + "us")
      let averageTime97 = endTime97 - startTime97
      console.info('appInfoTest xts toPlainObjectTest01 averageTime:' + averageTime97 + "us")
      expect(JSON.stringify(plainObject)).assertEqual('{"0":"c","1":"d","b":2}');
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        toPlainObject(['c', 'd'])
      }
      endTime(startTime, 'toPlainObjectTest01');
    })


    it('toPlainObjectTest02', 0, () => {
      let startTime98 = new Date().getTime()
      console.info('appInfoTest xts toPlainObjectTest02 startTime:' + startTime98 + "us")
      let actual: object = toPlainObject(['a', 'b', 'c'])

      let endTime98 = new Date().getTime()
      console.info('appInfoTest xts toPlainObjectTest02 endTime:' + endTime98 + "us")
      let averageTime98 = endTime98 - startTime98
      console.info('appInfoTest xts toPlainObjectTest02 averageTime:' + averageTime98 + "us")
      expect(JSON.stringify(actual)).assertEqual('{"0":"a","1":"b","2":"c"}');
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        toPlainObject(['a', 'b', 'c'])
      }
      endTime(startTime, 'toPlainObjectTest02');
    })


    it('toSafeIntegerTest01', 0, () => {
      let startTime99 = new Date().getTime()
      console.info('appInfoTest xts toSafeIntegerTest01 startTime:' + startTime99 + "us")
      expect(toSafeInteger(3.2)).assertEqual(3);
      let endTime99 = new Date().getTime()
      console.info('appInfoTest xts toSafeIntegerTest01 endTime:' + endTime99 + "us")
      let averageTime99 = endTime99 - startTime99
      console.info('appInfoTest xts toSafeIntegerTest01 averageTime:' + averageTime99 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        toSafeInteger(3.2)
      }
      endTime(startTime, 'toSafeIntegerTest01');
    })


    it('toSafeIntegerTest02', 0, () => {
      let startTime100 = new Date().getTime()
      console.info('appInfoTest xts toSafeIntegerTest02 startTime:' + startTime100 + "us")
      expect(toSafeInteger(Math.PI)).assertEqual(3);
      let endTime100 = new Date().getTime()
      console.info('appInfoTest xts toSafeIntegerTest02 endTime:' + endTime100 + "us")
      let averageTime100 = endTime100 - startTime100
      console.info('appInfoTest xts toSafeIntegerTest02 averageTime:' + averageTime100 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        toSafeInteger(Math.PI)
      }
      endTime(startTime, 'toSafeIntegerTest02');
    })


    it('toStringTest01', 0, () => {
      let startTime101 = new Date().getTime()
      console.info('appInfoTest xts toStringTest01 startTime:' + startTime101 + "us")
      expect(toString(null)).assertEqual('');
      let endTime101 = new Date().getTime()
      console.info('appInfoTest xts toStringTest01 endTime:' + endTime101 + "us")
      let averageTime101 = endTime101 - startTime101
      console.info('appInfoTest xts toStringTest01 averageTime:' + averageTime101 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        toString(null)
      }
      endTime(startTime, 'toStringTest01');
    })


    it('toStringTest02', 0, () => {
      let startTime102 = new Date().getTime()
      console.info('appInfoTest xts toStringTest02 startTime:' + startTime102 + "us")
      expect(toString([1, 2, 3])).assertEqual('1,2,3');
      let endTime102 = new Date().getTime()
      console.info('appInfoTest xts toStringTest02 endTime:' + endTime102 + "us")
      let averageTime102 = endTime102 - startTime102
      console.info('appInfoTest xts toStringTest02 averageTime:' + averageTime102 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        toString([1, 2, 3])
      }
      endTime(startTime, 'toStringTest02');
    })
  })
}

function endTime(startTime: number, tag: string) {
  let endTime: number = new Date().getTime();
  let averageTime = ((endTime - startTime) * 1000 / BASE_COUNT)
  console.info(tag + " startTime: " + endTime)
  console.info(tag + " endTime: " + endTime)
  console.log(tag + " averageTime: " + averageTime + "μs");
}