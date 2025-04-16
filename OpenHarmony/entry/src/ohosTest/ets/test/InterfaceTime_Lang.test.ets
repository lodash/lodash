/**
 *  MIT License
 *
 *  Copyright (c) 2024 Huawei Device Co., Ltd.
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

import { describe, it, expect, TestType } from '@ohos/hypium'
import {
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

export default function InterfaceTime_Lang() {
  describe('interfaceTime_Lang', () => {

    const BASE_COUNT = 2000
    const BASELINE_CREATEHTTP = 2000
    class B {
      b: number = 0
    }

    class A {
      a: number = 0
    }

    class AB {
      a: number = 0;
      b: number = 0
    }

    class Greet{
      greeting: string = ''
    }
    it('castArrayTest',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        castArray({ 'a': 1 })
      }
      let endTime = new Date().getTime()
      console.log("castArrayTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("castArrayTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('cloneTest',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let objects = [{ a: 1 }as A, { b: 2 }as B];
      for (let index = 0; index < BASE_COUNT; index++) {
        clone(objects);
      }
      let endTime = new Date().getTime()
      console.log("cloneTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("cloneTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('cloneDeepTest',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let objects = [{ a: 1 }as A, { b: 2 }as B];
      for (let index = 0; index < BASE_COUNT; index++) {
        cloneDeep(objects);
      }
      let endTime = new Date().getTime()
      console.log("cloneDeepTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("cloneDeepTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('conformsToTest',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let object = { a: 1, b: 2 }as AB;
      for (let index = 0; index < BASE_COUNT; index++) {
        conformsTo(object, { 'b': (n: number)=> { return n > 1; } });
      }
      let endTime = new Date().getTime()
      console.log("conformsToTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("conformsToTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('eqTest',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let object = { a: 1 }as A;
      for (let index = 0; index < BASE_COUNT; index++) {
        eq(object, object);
      }
      let endTime = new Date().getTime()
      console.log("eqTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("eqTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('eq',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let object = { a: 1 }as A;
      let other = { a: 1 }as A;
      for (let index = 0; index < BASE_COUNT; index++) {
        eq(object, other);
      }
      let endTime = new Date().getTime()
      console.log("eq endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("eq averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('gtTest',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        gt(3, 1);
      }
      let endTime = new Date().getTime()
      console.log("gtTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("gtTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('gteTes',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        gte(3, 1);
      }
      let endTime = new Date().getTime()
      console.log("gteTes endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("gteTes averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('gte',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        gte(7, 53);
      }
      let endTime = new Date().getTime()
      console.log("gte endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("gte averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('isArgumentsTest',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        isArguments(() => { return arguments; });
      }
      let endTime = new Date().getTime()
      console.log("isArgumentsTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("isArgumentsTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('isArguments',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        isArguments([1, 2, 3]);
      }
      let endTime = new Date().getTime()
      console.log("isArguments endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("isArguments averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('isArrayTest',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        isArray([1, 2, 3]);
      }
      let endTime = new Date().getTime()
      console.log("isArrayTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("isArrayTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('isArray',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        isArray(noop);
      }
      let endTime = new Date().getTime()
      console.log("isArray endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("isArray averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('isArrayBufferTest',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        isArrayBuffer(new ArrayBuffer(2));
      }
      let endTime = new Date().getTime()
      console.log("isArrayBufferTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("isArrayBufferTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('isArrayBuffer',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        isArrayBuffer(new Array(2));
      }
      let endTime = new Date().getTime()
      console.log("isArrayBuffer endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("isArrayBuffer averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('isArrayLikeTest',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        isArrayLike([1, 2, 3]);
      }
      let endTime = new Date().getTime()
      console.log("isArrayLikeTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("isArrayLikeTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('isArrayLike',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        isArrayLike(noop);
      }
      let endTime = new Date().getTime()
      console.log("isArrayLike endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("isArrayLike averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('isArrayLikeObject',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        isArrayLikeObject([1, 2, 3]);
      }
      let endTime = new Date().getTime()
      console.log("isArrayLikeObject endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("isArrayLikeObject averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('isBoolean',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        isBoolean(false);
      }
      let endTime = new Date().getTime()
      console.log("isBoolean endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("isBoolean averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('isBufferTest',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        isBuffer(new Uint8Array(2));
      }
      let endTime = new Date().getTime()
      console.log("isBufferTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("isBufferTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('isDateTest',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        isDate(new Date);
      }
      let endTime = new Date().getTime()
      console.log("isDateTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("isDateTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('isEmptyTest',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        isEmpty([1, 2, 3]);
      }
      let endTime = new Date().getTime()
      console.log("isEmptyTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("isEmptyTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('isEqualTest',TestType.PERFORMANCE, async (done: Function) => {
      let object = { a: 1 }as A;
      let other = { a: 1 }as A;
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        isEqual(object, other);
      }
      let endTime = new Date().getTime()
      console.log("isEqualTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("isEqualTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('isEqualWithTest',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let isGreeting: (value: string) => boolean = (value: string): boolean => {
        let regex: RegExp = new RegExp('^h(?:i|ello)$')
        return regex.test(value);
      }
      let customizer: (objValue: string, othValue: string) => void = (objValue: string, othValue: string): boolean | void => {
        if (isGreeting(objValue) && isGreeting(othValue)) {
          return true;
        } else {
          return false;
        }
      }
      let array = ['hello', 'goodbye'];
      let other = ['hi', 'goodbye'];
      for (let index = 0; index < BASE_COUNT; index++) {
        isEqualWith(array, other, customizer);
      }
      let endTime = new Date().getTime()
      console.log("isEqualWithTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("isEqualWithTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('isError',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        isError(new Error);
      }
      let endTime = new Date().getTime()
      console.log("isError endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("isError averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('isFinite',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        isFinite(3)
      }
      let endTime = new Date().getTime()
      console.log("isFinite endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("isFinite averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('isFunction',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        isFunction(()=> {})
      }
      let endTime = new Date().getTime()
      console.log("isFunction endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("isFunction averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('isInteger',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        isInteger(3)
      }
      let endTime = new Date().getTime()
      console.log("isInteger endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("isInteger averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('isIntegerTest',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        isInteger(Number.MIN_VALUE)
      }
      let endTime = new Date().getTime()
      console.log("isIntegerTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("isIntegerTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('isLength',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        isLength(3)
      }
      let endTime = new Date().getTime()
      console.log("isLength endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("isLength averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('isMapTes',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        isMap(new Map)
      }
      let endTime = new Date().getTime()
      console.log("isMapTes endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("isMapTes averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('isMatch',TestType.PERFORMANCE, async (done: Function) => {
      let object = { a: 1, b: 2 }as AB;
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        isMatch(object, { b: 2 }as B);
      }
      let endTime = new Date().getTime()
      console.log("isMatch endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("isMatch averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('isMatchWithTest',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
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
      let object: Greet = { greeting: 'hello' };
      let source: Greet = { greeting: 'hi' };
      for (let index = 0; index < BASE_COUNT; index++) {
        isMatchWith(object, source, customizer);
      }
      let endTime = new Date().getTime()
      console.log("isMatchWithTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("isMatchWithTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('isMatchWith',TestType.PERFORMANCE, async (done: Function) => {
      let customizer = (value: string): boolean | undefined=> {
        return isString(value) || undefined;
      };
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        isMatchWith(['a'], ['b'], customizer)
      }
      let endTime = new Date().getTime()
      console.log("isMatchWith endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("isMatchWith averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('isNaN',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        isNaN(undefined)
      }
      let endTime = new Date().getTime()
      console.log("isNaN endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("isNaN averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('isNative',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        isNative(String.toString)
      }
      let endTime = new Date().getTime()
      console.log("isNative endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("isNative averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('isNil',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        isNil(null)
      }
      let endTime = new Date().getTime()
      console.log("isNil endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("isNil averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('isNilTest',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        isNil(1)
      }
      let endTime = new Date().getTime()
      console.log("isNilTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("isNilTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('isNull',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        isNull(null)
      }
      let endTime = new Date().getTime()
      console.log("isNull endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("isNull averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('isNumber',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        isNumber(3)
      }
      let endTime = new Date().getTime()
      console.log("isNumber endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("isNumber averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('isObject',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        isObject({})
      }
      let endTime = new Date().getTime()
      console.log("isObject endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("isObject averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('isObjectLike',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        isObjectLike(null)
      }
      let endTime = new Date().getTime()
      console.log("isObjectLike endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("isObjectLike averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('isPlainObjectTest',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        isPlainObject([1, 2, 3])
      }
      let endTime = new Date().getTime()
      console.log("isPlainObjectTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("isPlainObjectTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('isPlainObject',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        isPlainObject({ 'x': 0, 'y': 0 })
      }
      let endTime = new Date().getTime()
      console.log("isPlainObject endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("isPlainObject averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('isRegExp',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        isRegExp('/abc/')
      }
      let endTime = new Date().getTime()
      console.log("isRegExp endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("isRegExp averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('isSafeInteger',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        isSafeInteger(3)
      }
      let endTime = new Date().getTime()
      console.log("isSafeInteger endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("isSafeInteger averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('isSetTest',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        isSet(new Set([1, 2, 3, 4, 5]))
      }
      let endTime = new Date().getTime()
      console.log("isSetTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("isSetTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('isSet',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        isSet(new WeakSet)
      }
      let endTime = new Date().getTime()
      console.log("isSet endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("isSet averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('isString',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        isString('abc')
      }
      let endTime = new Date().getTime()
      console.log("isString endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("isString averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('isSymbol',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        isSymbol('abc')
      }
      let endTime = new Date().getTime()
      console.log("isSymbol endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("isSymbol averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('isTypedArray',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        isTypedArray(new Uint8Array)
      }
      let endTime = new Date().getTime()
      console.log("isTypedArray endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("isTypedArray averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('isUndefined',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        isUndefined(void 0)
      }
      let endTime = new Date().getTime()
      console.log("isUndefined endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("isUndefined averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('isWeakMapTest',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let obj: number[] = new Array(2);
      obj.fill(5);
      for (let index = 0; index < BASE_COUNT; index++) {
        isWeakMap(obj)
      }
      let endTime = new Date().getTime()
      console.log("isWeakMapTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("isWeakMapTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('isWeakMap',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        isWeakMap(new Map)
      }
      let endTime = new Date().getTime()
      console.log("isWeakMap endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("isWeakMap averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('isWeakSet',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        isWeakSet(new Set([1,2,3]))
      }
      let endTime = new Date().getTime()
      console.log("isWeakSet endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("isWeakSet averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('ltTest',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        lt(23, 11)
      }
      let endTime = new Date().getTime()
      console.log("ltTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("ltTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('lt',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        lt(3, 1)
      }
      let endTime = new Date().getTime()
      console.log("lt endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("lt averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('lteTest',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        lte(3, 1)
      }
      let endTime = new Date().getTime()
      console.log("lteTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("lteTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('toArray',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        toArray('abc')
      }
      let endTime = new Date().getTime()
      console.log("toArray endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("toArray averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('toFinite',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        toFinite(Math.PI)
      }
      let endTime = new Date().getTime()
      console.log("toFinite endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("toFinite averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('toIntegerTest',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        toInteger(Number.MIN_VALUE)
      }
      let endTime = new Date().getTime()
      console.log("toIntegerTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("toIntegerTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('toInteger',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        toInteger(Math.PI)
      }
      let endTime = new Date().getTime()
      console.log("toInteger endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("toInteger averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('toLengthTest',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        toLength(Number.MIN_VALUE)
      }
      let endTime = new Date().getTime()
      console.log("toLengthTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("toLengthTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('toLength',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        toLength(Math.PI)
      }
      let endTime = new Date().getTime()
      console.log("toLength endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("toLength averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('toNumber',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        toNumber(Math.PI)
      }
      let endTime = new Date().getTime()
      console.log("toNumber endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("toNumber averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('toPlainObject',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        toPlainObject(['a', 'b', 'c'])
      }
      let endTime = new Date().getTime()
      console.log("toPlainObject endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("toPlainObject averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('toSafeInteger',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        toSafeInteger(Math.PI)
      }
      let endTime = new Date().getTime()
      console.log("toSafeInteger endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("toSafeInteger averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('toString',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        toString([1, 2, 3])
      }
      let endTime = new Date().getTime()
      console.log("toString endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("toString averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })
  })
}