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
  assign,
  assignIn,
  assignInWith,
  assignWith,
  at,
  constant,
  create,
  defaults,
  defaultsDeep,
  findKey,
  findLastKey,
  functions,
  functionsIn,
  get,
  has,
  hasIn,
  invert,
  invertBy,
  invoke,
  isArray,
  isNumber,
  isUndefined,
  keys,
  keysIn,
  mapKeys,
  mapValues,
  merge,
  mergeWith,
  omit,
  omitBy,
  partialRight,
  pick,
  pickBy,
  result,
  set,
  setWith,
  transform,
  unset,
  update,
  updateWith,
  values,
  valuesIn
} from 'lodash';

export default function InterfaceTime_Object() {
  describe('interfaceTime_Object', () => {

    const BASE_COUNT = 2000
    const BASELINE_CREATEHTTP = 2000

    class A{
      a: B = {
        b: {
          c: 0
        }
      }
    }

    class B{
      b: C = {
      c: 0
    }
    }

    class C{
      c: number = 0
    }

    class ABC{
      a: number = 0
      b: number | string = ''
      c: number = 0
    }

    class Age{
      age: number = 0
      active: boolean = true
    }
    class User{
      barney: Age = {
      age:  0,
      active:  true
    }
      fred: Age  = {
        age:  0,
        active:  true
      }
      pebbles: Age  = {
        age:  0,
        active:  true
      }
    }

    class Array{
      a: number[] = []
      b: number[] = []
    }
    class Ages{
      user: string = ''
      age: number = 0
    }

    class Users{
      fred: Ages = {
        user:  '',
        age:  0
      }
      pebbles: Ages = {
        user:  '',
        age:  0
      }
    }

    let x: number = 0;
    let y: number = 0;
    let a: Function;
    let b: Function;
    let c: Function;
    it('assign',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        assign({ age: 100, name: 'aa' }, { age:0 })
      }
      let endTime = new Date().getTime()
      console.log("assign endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("assign averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('assignIn',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        assignIn( { a:4 }, {b: 1}, {c: 3});
      }
      let endTime = new Date().getTime()
      console.log("assignIn endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("assignIn averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('assignInWith',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let customizer: (objValue: undefined, srcValue: boolean) => void = (objValue: undefined, srcValue: boolean): boolean | void => {
        return isUndefined(objValue) ? srcValue : objValue;
      }
      for (let index = 0; index < BASE_COUNT; index++) {
        partialRight(assignInWith, customizer);
      }
      let endTime = new Date().getTime()
      console.log("assignInWith endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("assignInWith averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('assignWith',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let customizer: (objValue: undefined, srcValue: boolean) => void = (objValue: undefined, srcValue: boolean): boolean | void => {
        return isUndefined(objValue) ? srcValue : objValue;
      }
      for (let index = 0; index < BASE_COUNT; index++) {
        partialRight(assignWith, customizer);
      }
      let endTime = new Date().getTime()
      console.log("assignWith endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("assignWith averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('at',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        at({ a: [{ b: { c: 3 } }, 4] }, ['a[0].b.c', 'a[1]'])
      }
      let endTime = new Date().getTime()
      console.log("at endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("at averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('create',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let Geeks: () => void = () => {
        return true;
      }
      for (let index = 0; index < BASE_COUNT; index++) {
        create(Geeks, {
          'GeeksforGeeks':"Computer Science Portal"
        });
      }
      let endTime = new Date().getTime()
      console.log("create endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("create averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('defaults',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 })
      }
      let endTime = new Date().getTime()
      console.log("defaults endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("defaults averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('defaultsDeep',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        defaultsDeep({ a: { b: 2 } }, { a: { b: 1, c: 3 } });
      }
      let endTime = new Date().getTime()
      console.log("defaultsDeep endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("defaultsDeep averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('findKey',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let users: User = {
        barney:  { age: 36, active: true },
        fred:    { age: 40, active: false},
        pebbles: { age: 1,  active: true }
      };
      for (let index = 0; index < BASE_COUNT; index++) {
        findKey(users, (o: Age)=> { return o.age < 40; });
      }
      let endTime = new Date().getTime()
      console.log("findKey endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("findKey averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('findLastKey',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let users: User = {
        barney:  { age: 36, active: true },
        fred:    { age: 40, active: false},
        pebbles: { age: 1,  active: true }
      };
      for (let index = 0; index < BASE_COUNT; index++) {
        findLastKey(users, (o: Age)=> { return o.age < 40; });
      }
      let endTime = new Date().getTime()
      console.log("findLastKey endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("findLastKey averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('functions',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        functions({ a: 1, b: 2, c: 1 });
      }
      let endTime = new Date().getTime()
      console.log("functions endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("functions averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('functionsIn',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let Foo: () => void = () => {
        a = constant('a');
        b = constant('b');
        c = constant('c');
      }
      for (let index = 0; index < BASE_COUNT; index++) {
        functionsIn(Foo());
      }
      let endTime = new Date().getTime()
      console.log("functionsIn endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("functionsIn averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('get',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        get({ a: [{ b: { c: 3 } }] }, 'a[0].b.c');
      }
      let endTime = new Date().getTime()
      console.log("get endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("get averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('has',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        has({ a: { b: 2 } }, 'a');
      }
      let endTime = new Date().getTime()
      console.log("has endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("has averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('hasIn',TestType.PERFORMANCE, async (done: Function) => {
      let object: boolean = create({ 'a': create({ 'b': 2 }) });
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        hasIn(object, 'a')
      }
      let endTime = new Date().getTime()
      console.log("hasIn endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("hasIn averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('invert',TestType.PERFORMANCE, async (done: Function) => {
      let object: ABC = { a: 1, b: 2, c: 1 };
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        invert(object);
      }
      let endTime = new Date().getTime()
      console.log("invert endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("invert averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('invertBy',TestType.PERFORMANCE, async (done: Function) => {
      let object: ABC = { a: 1, b: 2, c: 1 };
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        invertBy(object)
      }
      let endTime = new Date().getTime()
      console.log("invertBy endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("invertBy averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('invoke',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        invoke({ a: [{ b: { c: [1, 2, 3, 4] } }] }, 'a[0].b.c.slice', 1, 3)
      }
      let endTime = new Date().getTime()
      console.log("invoke endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("invoke averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('keys',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        keys('100')
      }
      let endTime = new Date().getTime()
      console.log("keys endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("keys averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('keysIn',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        keysIn({'a': 1, 'b': 2})
      }
      let endTime = new Date().getTime()
      console.log("keysIn endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("keysIn averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('mapKeys',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        mapKeys({ 'a': 1, 'b': 2 }, (value: number, key: number): number => {
          return key + value;
        });
      }
      let endTime = new Date().getTime()
      console.log("mapKeys endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("mapKeys averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('mapValues',TestType.PERFORMANCE, async (done: Function) => {
      let users: Users = {
        fred: { user: 'fred', age: 40 },
        pebbles: { user: 'pebbles', age: 1 }
      };
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        mapValues(users, 'age');
      }
      let endTime = new Date().getTime()
      console.log("mapValues endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("mapValues averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('merge',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        merge({a: [{b: 2}, {d: 4 }]}, {a: [{c: 3}, {e: 5 }]});
      }
      let endTime = new Date().getTime()
      console.log("merge endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("merge averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('omit',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let object: ABC = { a: 1, b: '2', c: 3 };
      for (let index = 0; index < BASE_COUNT; index++) {
        omit(object, ['a', 'c'])
      }
      let endTime = new Date().getTime()
      console.log("omit endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("omit averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('omitBy',TestType.PERFORMANCE, async (done: Function) => {
      let object: ABC = { a: 1, b: '2', c: 3 };
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        omitBy(object, isNumber)
      }
      let endTime = new Date().getTime()
      console.log("omitBy endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("omitBy averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('pick',TestType.PERFORMANCE, async (done: Function) => {
      let object: ABC = { a: 1, b: '2', c: 3 };
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        pick(object, ['a', 'c'])
      }
      let endTime = new Date().getTime()
      console.log("pick endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("pick averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('pickBy',TestType.PERFORMANCE, async (done: Function) => {
      let object: ABC = { a: 1, b: '2', c: 3 };
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        pickBy(object, isNumber)
      }
      let endTime = new Date().getTime()
      console.log("pickBy endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("pickBy averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('result',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        result({ a: [{ b: { c1: 3, c2: constant(4) } }] }, 'a[0].b.c1')
      }
      let endTime = new Date().getTime()
      console.log("result endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("result averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('set',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        set({ a: [{ b: { c: 3 } }] }, 'a[0].b.c', 4)
      }
      let endTime = new Date().getTime()
      console.log("set endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("set averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('setWith',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        setWith({}, '[0][1]', 'a', Object);
      }
      let endTime = new Date().getTime()
      console.log("setWith endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("setWith averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('transform',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        transform([2, 3, 4], (result: number[], n: number)=> {
          result.push(n *= n);
          return n % 2 == 0;
        }, []);
      }
      let endTime = new Date().getTime()
      console.log("transform endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("transform averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('unset',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        unset({ a: [{ b: { c: 7 } }] }, 'a[0].b.c');
      }
      let endTime = new Date().getTime()
      console.log("unset endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("unset averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('update',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        update({ a: [{ b: { c: 3 } }] }, 'a[0].b.c',(n: number)=> { return n * n; });
      }
      let endTime = new Date().getTime()
      console.log("update endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("update averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('updateWith',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        updateWith({}, '[0][1]', constant('a'), Object);
      }
      let endTime = new Date().getTime()
      console.log("updateWith endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("updateWith averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('values',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        values({ a: [{ b: { c: 7 } }] })
      }
      let endTime = new Date().getTime()
      console.log("values endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("values averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('valuesIn',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        valuesIn({ x:1, y:'2', z:3 })
      }
      let endTime = new Date().getTime()
      console.log("valuesIn endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("valuesIn averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })
  })
}