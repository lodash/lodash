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
  add,
  attempt, bindAll, cond, conforms,
  constant,
  defaultTo,
  filter,
  flow,
  flowRight,
  identity,
  isNumber,
  iteratee,
  map, matches,
  matchesProperty,
  method,
  methodOf,
  mixin,
  multiply,
  noop,
  nthArg,
  over,
  overEvery,
  overSome,
  property,
  propertyOf,
  range,
  rangeRight,
  slice,
  stubArray,
  stubFalse,
  stubObject,
  stubString,
  stubTrue,
  times,
  toPath,
  uniqueId
} from 'lodash'

export default function InterfaceTime_Util() {
  describe('interfaceTime_Util', () => {

    const BASE_COUNT = 2000
    const BASELINE_CREATEHTTP = 2000

    class ABC{
      a: number[] | number = []
      b: number[] | number = []
      c: number[] | number = []
    }

    class B{
      b: number = 0
    }

    class AB{
      a: B = {
      b:  0
    }
    }

    class Source {
      a: (array: number[]) => number = () => 0;
      b: string = '';
    }

    class Age{
      user: string = ''
      age: number = 0
      active: boolean = true
    }
    class A{
      a: number = 0
    }

    class Ident{
      a: number = 0
      b: number = 0
    }

    class View{
      label: string = ''
      click: ()=>void = Object
    }
    it('attempt',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        attempt((): number=> { return slice.call(arguments); }, 1, 2);
      }
      let endTime = new Date().getTime()
      console.log("attempt endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("attempt averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('bindAllTest',TestType.PERFORMANCE, async (done: Function) => {
      let view: View = {
        label: 'docs',
        click: ()=> {
          console.log('clicked ' + view.label);
        }
      };
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        bindAll(view, ['click']);
      }
      let endTime = new Date().getTime()
      console.log("bindAll endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("bindAll averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('cond',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        let func: (a: Ident)=> string = cond([
          [matches({ 'a': 1 }),           constant('matches A')],
          [conforms({ 'b': isNumber }), constant('matches B')],
          [stubTrue,                      constant('no match')]
        ]);
        func({ a: 1, b: 2 });
      }
      let endTime = new Date().getTime()
      console.log("cond endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("cond averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('conforms',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let objects: Ident[] = [
        { a: 2, b: 1 },
        { a: 1, b: 2 }
      ];
      for (let index = 0; index < BASE_COUNT; index++) {
        filter(objects, conforms({ 'b': (n: number)=> { return n > 1; } }));
      }
      let endTime = new Date().getTime()
      console.log("conforms endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("conforms averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('constant',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        times(2, constant({ 'a': 1 }));
      }
      let endTime = new Date().getTime()
      console.log("constant endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("constant averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('defaultTo',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        defaultTo(1, 10)
      }
      let endTime = new Date().getTime()
      console.log("defaultTo endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("defaultTo averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('flow',TestType.PERFORMANCE, async (done: Function) => {
      let square: (n: number) => void = (n: number): number => {
        return n * n;
      }
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        let addSquare: (a: number, b: number)=> number = flow([add, square]);
        addSquare(1, 2);
      }
      let endTime = new Date().getTime()
      console.log("flow endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("flow averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('flowRight',TestType.PERFORMANCE, async (done: Function) => {
      let square: (n: number) => void = (n: number): number => {
        return n * n;
      }
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        let addSquare: (a: number, b: number)=> number = flowRight([square, add]);
        addSquare(1, 2)
      }
      let endTime = new Date().getTime()
      console.log("flowRight endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("flowRight averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('identity',TestType.PERFORMANCE, async (done: Function) => {
      let object: A = { a: 1 };
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        identity(object)
      }
      let endTime = new Date().getTime()
      console.log("identity endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("identity averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('iteratee',TestType.PERFORMANCE, async (done: Function) => {
      let users: Age[] = [
        { user: 'barney', age: 36, active: true },
        { user: 'fred',   age: 40, active: false }
      ];
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        filter(users, iteratee({ 'user': 'barney', 'active': true }));
      }
      let endTime = new Date().getTime()
      console.log("iteratee endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("iteratee averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('matches',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let objects: ABC[] = [
        { a: 1, b: 2, c: 3 },
        { a: 4, b: 5, c: 6 }
      ];
      for (let index = 0; index < BASE_COUNT; index++) {
        filter(objects, matches({ 'a': 4, 'c': 6 }));
      }
      let endTime = new Date().getTime()
      console.log("matches endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("matches averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('matchesProperty',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let objects: ABC[] = [
        { a: 1, b: 2, c: 3 },
        { a: 4, b: 5, c: 6 }
      ];
      for (let index = 0; index < BASE_COUNT; index++) {
        filter(objects, matchesProperty('a', 4));
      }
      let endTime = new Date().getTime()
      console.log("matchesProperty endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("matchesProperty averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('method',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        map( [
          { a: { b: constant(2) } },
          { a: { b: constant(1) } }
        ]
        , method('a.b'));
      }
      let endTime = new Date().getTime()
      console.log("method endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("method averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('methodOf',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let array: number[] = times(3, constant),
        object: ABC = { a: array, b: array, c: array };
      for (let index = 0; index < BASE_COUNT; index++) {
        map(['a[2]', 'c[0]'], methodOf(object));
      }
      let endTime = new Date().getTime()
      console.log("methodOf endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("methodOf averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('mixin',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let source: Source = { a: (array: number[])=> { return array[1]; }, b: 'ffff' }
      for (let index = 0; index < BASE_COUNT; index++) {
        mixin({}, source);
      }
      let endTime = new Date().getTime()
      console.log("mixin endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("mixin averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('noop',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        times(2, noop)
      }
      let endTime = new Date().getTime()
      console.log("noop endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("noop averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('nthArg',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        let func: (a: string, b: string, c: string, d: string)=> string = nthArg(1)
        func('a', 'b', 'c', 'd')
      }
      let endTime = new Date().getTime()
      console.log("nthArg endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("nthArg averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('over',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        let func: (a: number, b: number, c: number, d: number)=> number[] = over([Math.max, Math.min]);
        func(1, 2, 3, 4);
      }
      let endTime = new Date().getTime()
      console.log("over endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("over averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('overEvery',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        let func: (a: string)=> boolean = overEvery([Boolean, isFinite]);
        func('1');
      }
      let endTime = new Date().getTime()
      console.log("overEvery endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("overEvery averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('overSome',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        let func: (a: string)=> boolean = overSome([Boolean, isFinite]);
        func('1');
      }
      let endTime = new Date().getTime()
      console.log("overSome endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("overSome averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('property',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let objects: AB[] = [
        { a: { b: 2 } },
        { a: { b: 1 } }
      ];
      for (let index = 0; index < BASE_COUNT; index++) {
        map(objects, property('a.b'));
      }
      let endTime = new Date().getTime()
      console.log("property endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("property averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('propertyOf',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let array: number[] = [0, 1, 2],
        object: ABC = { a: array, b: array, c: array };
      for (let index = 0; index < BASE_COUNT; index++) {
        map(['a[2]', 'c[0]'], propertyOf(object));
      }
      let endTime = new Date().getTime()
      console.log("propertyOf endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("propertyOf averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('range',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        range(4)
      }
      let endTime = new Date().getTime()
      console.log("range endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("range averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('rangeRight',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        rangeRight(4)
      }
      let endTime = new Date().getTime()
      console.log("rangeRight endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("rangeRight averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('stubArray',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        times(2, stubArray);
      }
      let endTime = new Date().getTime()
      console.log("stubArray endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("stubArray averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('stubFalse',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        times(2, stubFalse);
      }
      let endTime = new Date().getTime()
      console.log("stubFalse endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("stubFalse averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('stubObject',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        times(2, stubObject);
      }
      let endTime = new Date().getTime()
      console.log("stubObject endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("stubObject averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('stubString',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        times(2, stubString);
      }
      let endTime = new Date().getTime()
      console.log("stubString endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("stubString averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('stubTrue',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        times(2, stubTrue);
      }
      let endTime = new Date().getTime()
      console.log("stubTrue endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("stubTrue averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('times',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        times(3, String);
      }
      let endTime = new Date().getTime()
      console.log("times endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("times averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('toPath',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        toPath('a.b.c');
      }
      let endTime = new Date().getTime()
      console.log("toPath endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("toPath averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('uniqueId',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        uniqueId('contact_');
      }
      let endTime = new Date().getTime()
      console.log("uniqueId endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("uniqueId averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })
  })
}