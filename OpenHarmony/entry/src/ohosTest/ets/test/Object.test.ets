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

const BASE_COUNT: number = 2000;

export default function objectTest() {
  describe('ObjectTest', () => {
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
    class java {
      python: number | ESObject = 0
    }

    class Update {
      cpp: java | ESObject = []
    }

    class A {
      a: B | ESObject = []
    }

    class B {
      b: C | ESObject
    }

    class C {
      c: number = 0
    }

    class XY {
      x: number = 0
      y: string = ''
      z: number = 0
    }

    class ABC {
      a: number = 0
      b: number | string = ''
      c: number = 0
    }

    class Info {
      Name: string = ''
      password: string = ''
      username: string = ''
    }
    class Age {
      age: number = 0
      active: boolean = true
    }
    class User {
      barney: Age | ESObject
      fred: Age | ESObject
      pebbles: Age | ESObject
    }

    class Array {
      a: number[] = []
      b: number[] = []
    }
    class Ages {
      user: string = ''
      age: number = 0
    }

    class Users {
      fred: Ages | ESObject
      pebbles: Ages | ESObject
    }

    let x: number = 0;
    let y: number = 0;
    let a: ESObject;
    let b: ESObject;
    let c: ESObject;
    it('assignTest01', 0, () => {
      let startTime0 = new Date().getTime()
      console.info('appInfoTest xts assignTest01 startTime:' + startTime0 + "us")
      let assigns: object = assign({
        age: 100, name: 'aa'
      }, {
        age: 0
      })

      let endTime0 = new Date().getTime()
      console.info('appInfoTest xts assignTest01 endTime:' + endTime0 + "us")
      let averageTime0 = endTime0 - startTime0
      console.info('appInfoTest xts assignTest01 averageTime:' + averageTime0 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        assign({
          age: 100, name: 'aa'
        }, {
          age: 0
        })
      }
      endTime(startTime, 'assignTest01');
      expect(JSON.stringify(assigns)).assertEqual('{"age":0,"name":"aa"}');
    })


    it('assignTest02', 0, () => {
      let startTime1 = new Date().getTime()
      console.info('appInfoTest xts assignTest02 startTime:' + startTime1 + "us")
      expect(JSON.stringify(assign({
        a: 1, c: 3
      }, {
        a: 0
      }))).assertEqual('{"a":0,"c":3}');
      let endTime1 = new Date().getTime()
      console.info('appInfoTest xts assignTest02 endTime:' + endTime1 + "us")
      let averageTime1 = endTime1 - startTime1
      console.info('appInfoTest xts assignTest02 averageTime:' + averageTime1 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        assign({
          a: 1, c: 3
        }, {
          a: 0
        })
      }
      endTime(startTime, 'assignTest02');
    })


    it('assignInTest01', 0, () => {
      let startTime2 = new Date().getTime()
      console.info('appInfoTest xts assignInTest01 startTime:' + startTime2 + "us")
      let assignIns: object = assignIn({
        a: 4
      }, {
        b: 1
      }, {
        c: 3
      });

      let endTime2 = new Date().getTime()
      console.info('appInfoTest xts assignInTest01 endTime:' + endTime2 + "us")
      let averageTime2 = endTime2 - startTime2
      console.info('appInfoTest xts assignInTest01 averageTime:' + averageTime2 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        assignIn({
          a: 4
        }, {
          b: 1
        }, {
          c: 3
        });
      }
      endTime(startTime, 'assignInTest01');
      expect(JSON.stringify(assignIns)).assertEqual('{"a":4,"b":1,"c":3}');
    })


    it('assignInTest02', 0, () => {
      let startTime3 = new Date().getTime()
      console.info('appInfoTest xts assignInTest02 startTime:' + startTime3 + "us")
      expect(JSON.stringify(assignIn({
        a: 1, c: 3
      }, {
        a: 0
      }))).assertEqual('{"a":0,"c":3}');
      let endTime3 = new Date().getTime()
      console.info('appInfoTest xts assignInTest02 endTime:' + endTime3 + "us")
      let averageTime3 = endTime3 - startTime3
      console.info('appInfoTest xts assignInTest02 averageTime:' + averageTime3 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        assignIn({
          a: 1, c: 3
        }, {
          a: 0
        })
      }
      endTime(startTime, 'assignInTest02');
    })


    it('assignInWithTest01', 0, () => {
      let startTime4 = new Date().getTime()
      console.info('appInfoTest xts assignInWithTest01 startTime:' + startTime4 + "us")
      let customizer: (objValue: ESObject, srcValue: ESObject) => void = (objValue: ESObject, srcValue: ESObject): boolean => {

        return isUndefined(objValue) ? srcValue : objValue;

      }

      let defaults: ESObject = partialRight(assignInWith, customizer);

      let endTime4 = new Date().getTime()
      console.info('appInfoTest xts assignInWithTest01 endTime:' + endTime4 + "us")
      let averageTime4 = endTime4 - startTime4
      console.info('appInfoTest xts assignInWithTest01 averageTime:' + averageTime4 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        partialRight(assignInWith, customizer);
      }
      endTime(startTime, 'assignInWithTest01');
      expect(JSON.stringify(defaults({
        a: 1
      }, {
        b: 2
      }, {
        a: 3
      }))).assertEqual('{"a":1,"b":2}');
    })


    it('assignInWithTest02', 0, () => {
      let startTime5 = new Date().getTime()
      console.info('appInfoTest xts assignInWithTest02 startTime:' + startTime5 + "us")
      let customizer: (objectVal: ESObject, sourceVal: ESObject) => void = (objectVal: ESObject, sourceVal: ESObject): boolean => {

        return isUndefined(objectVal) ? sourceVal : objectVal;

      }


      let obj: object = assignInWith({
        'gfg': 1
      }, {
        'geek': 3
      }, customizer);

      let endTime5 = new Date().getTime()
      console.info('appInfoTest xts assignInWithTest02 endTime:' + endTime5 + "us")
      let averageTime5 = endTime5 - startTime5
      console.info('appInfoTest xts assignInWithTest02 averageTime:' + averageTime5 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        assignInWith({
          'gfg': 1
        }, {
          'geek': 3
        }, customizer);
      }
      endTime(startTime, 'assignInWithTest02');
      expect(JSON.stringify(obj)).assertEqual('{"gfg":1,"geek":3}');
    })


    it('assignWithTest01', 0, () => {
      let startTime6 = new Date().getTime()
      console.info('appInfoTest xts assignWithTest01 startTime:' + startTime6 + "us")
      let customizer: (objValue: ESObject, srcValue: ESObject) => void = (objValue: ESObject, srcValue: ESObject): boolean => {

        return isUndefined(objValue) ? srcValue : objValue;

      }

      let defaults: ESObject = partialRight(assignWith, customizer);

      let endTime6 = new Date().getTime()
      console.info('appInfoTest xts assignWithTest01 endTime:' + endTime6 + "us")
      let averageTime6 = endTime6 - startTime6
      console.info('appInfoTest xts assignWithTest01 averageTime:' + averageTime6 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        partialRight(assignWith, customizer);
      }
      endTime(startTime, 'assignWithTest01');
      expect(JSON.stringify(defaults({
        'a': 1
      }, {
        'b': 2
      }, {
        'a': 3
      }))).assertEqual('{"a":1,"b":2}');
    })


    it('assignWithTest02', 0, () => {
      let startTime7 = new Date().getTime()
      console.info('appInfoTest xts assignWithTest02 startTime:' + startTime7 + "us")
      let customizer: (objectVal: ESObject, sourceVal: ESObject) => void = (objectVal: ESObject, sourceVal: ESObject): boolean => {

        return isUndefined(objectVal) ? sourceVal : objectVal;

      }


      let obj: object = assignWith({
        'hi': 13
      }, {
        'GFG': 4
      }, customizer);

      let endTime7 = new Date().getTime()
      console.info('appInfoTest xts assignWithTest02 endTime:' + endTime7 + "us")
      let averageTime7 = endTime7 - startTime7
      console.info('appInfoTest xts assignWithTest02 averageTime:' + averageTime7 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        assignWith({
          'hi': 13
        }, {
          'GFG': 4
        }, customizer);
      }
      endTime(startTime, 'assignWithTest02');
      expect(JSON.stringify(obj)).assertEqual('{"hi":13,"GFG":4}');
    })


    it('atTest01', 0, () => {
      let startTime8 = new Date().getTime()
      console.info('appInfoTest xts atTest01 startTime:' + startTime8 + "us")
      expect(JSON.stringify(at({
        a: [{
          b: {
            c: 3
          }
        }, 4]
      }, ['a[0].b.c', 'a[1]']))).assertEqual('[3,4]');
      let endTime8 = new Date().getTime()
      console.info('appInfoTest xts atTest01 endTime:' + endTime8 + "us")
      let averageTime8 = endTime8 - startTime8
      console.info('appInfoTest xts atTest01 averageTime:' + averageTime8 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        at({
          a: [{
            b: {
              c: 3
            }
          }, 4]
        }, ['a[0].b.c', 'a[1]'])
      }
      endTime(startTime, 'atTest01');
    })


    it('atTest02', 0, () => {
      let startTime9 = new Date().getTime()
      console.info('appInfoTest xts atTest02 startTime:' + startTime9 + "us")
      let at_elem: number = at({
        oppo: [{
          vivo: {
            moto: 1900
          }
        }, 2400]
      }, ['oppo[0].vivo.moto', 'oppo[1]']);

      let endTime9 = new Date().getTime()
      console.info('appInfoTest xts atTest02 endTime:' + endTime9 + "us")
      let averageTime9 = endTime9 - startTime9
      console.info('appInfoTest xts atTest02 averageTime:' + averageTime9 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        at({
          oppo: [{
            vivo: {
              moto: 1900
            }
          }, 2400]
        }, ['oppo[0].vivo.moto', 'oppo[1]']);
      }
      endTime(startTime, 'atTest02');
      expect(JSON.stringify(at_elem)).assertEqual('[1900,2400]');
    })


    it('createTest01', 0, () => {
      let startTime10 = new Date().getTime()
      console.info('appInfoTest xts createTest01 startTime:' + startTime10 + "us")
      let Geeks: () => void = () => {
        return true;

      }


      let GFG: object = create(Geeks, {
        'GeeksforGeeks': "Computer Science Portal"
      });

      let endTime10 = new Date().getTime()
      console.info('appInfoTest xts createTest01 endTime:' + endTime10 + "us")
      let averageTime10 = endTime10 - startTime10
      console.info('appInfoTest xts createTest01 averageTime:' + averageTime10 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        create(Geeks, {
          'GeeksforGeeks': "Computer Science Portal"
        });
      }
      endTime(startTime, 'createTest01');
      expect(JSON.stringify(GFG)).assertEqual('{"GeeksforGeeks":"Computer Science Portal"}');
    })


    it('createTest02', 0, () => {
      let startTime11 = new Date().getTime()
      console.info('appInfoTest xts createTest02 startTime:' + startTime11 + "us")
      let protoFunc: () => void = () => {
        return 'Geek';

      }


      let GFG: object = create(protoFunc, {
        'a': "b"
      });

      let endTime11 = new Date().getTime()
      console.info('appInfoTest xts createTest02 endTime:' + endTime11 + "us")
      let averageTime11 = endTime11 - startTime11
      console.info('appInfoTest xts createTest02 averageTime:' + averageTime11 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        create(protoFunc, {
          'a': "b"
        });
      }
      endTime(startTime, 'createTest02');
      expect(JSON.stringify(GFG)).assertEqual('{"a":"b"}');
    })


    it('defaultsTest01', 0, () => {
      let startTime12 = new Date().getTime()
      console.info('appInfoTest xts defaultsTest01 startTime:' + startTime12 + "us")
      let defaultsObject: object = defaults({
        'a': 1
      }, {
        'b': 2
      }, {
        'a': 3
      })

      let endTime12 = new Date().getTime()
      console.info('appInfoTest xts defaultsTest01 endTime:' + endTime12 + "us")
      let averageTime12 = endTime12 - startTime12
      console.info('appInfoTest xts defaultsTest01 averageTime:' + averageTime12 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        defaults({
          'a': 1
        }, {
          'b': 2
        }, {
          'a': 3
        })
      }
      endTime(startTime, 'defaultsTest01');
      expect(JSON.stringify(defaultsObject)).assertEqual('{"a":1,"b":2}');
    })


    it('defaultsTest02', 0, () => {
      let startTime13 = new Date().getTime()
      console.info('appInfoTest xts defaultsTest02 startTime:' + startTime13 + "us")
      let defaultsObject: object = defaults({
        'gfg': 3
      }, {
        'geek': 1
      }, {
        'gfg': 6
      });

      let endTime13 = new Date().getTime()
      console.info('appInfoTest xts defaultsTest02 endTime:' + endTime13 + "us")
      let averageTime13 = endTime13 - startTime13
      console.info('appInfoTest xts defaultsTest02 averageTime:' + averageTime13 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        defaults({
          'gfg': 3
        }, {
          'geek': 1
        }, {
          'gfg': 6
        });
      }
      endTime(startTime, 'defaultsTest02');
      expect(JSON.stringify(defaultsObject)).assertEqual('{"gfg":3,"geek":1}');
    })


    it('defaultsDeepTest01', 0, () => {
      let startTime14 = new Date().getTime()
      console.info('appInfoTest xts defaultsDeepTest01 startTime:' + startTime14 + "us")
      let defaultsObject: object = defaultsDeep({
        a: {
          b: 2
        }
      }, {
        a: {
          b: 1, c: 3
        }
      });

      let endTime14 = new Date().getTime()
      console.info('appInfoTest xts defaultsDeepTest01 endTime:' + endTime14 + "us")
      let averageTime14 = endTime14 - startTime14
      console.info('appInfoTest xts defaultsDeepTest01 averageTime:' + averageTime14 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        defaultsDeep({
          a: {
            b: 2
          }
        }, {
          a: {
            b: 1, c: 3
          }
        });
      }
      endTime(startTime, 'defaultsDeepTest01');
      expect(JSON.stringify(defaultsObject)).assertEqual('{"a":{"b":2,"c":3}}');
    })


    it('defaultsDeepTest02', 0, () => {
      let startTime15 = new Date().getTime()
      console.info('appInfoTest xts defaultsDeepTest02 startTime:' + startTime15 + "us")
      let info: Info = {
        Name: "GeeksforGeeks",

        password: "@1234",

        username: "your_geeks"
      }
      expect(JSON.stringify(defaultsDeep(info, defaults(info, {
        id: 'Id97'
      })))).assertEqual('{"Name":"GeeksforGeeks","password":"@1234","username":"your_geeks","id":"Id97"}');
      let endTime15 = new Date().getTime()
      console.info('appInfoTest xts defaultsDeepTest02 endTime:' + endTime15 + "us")
      let averageTime15 = endTime15 - startTime15
      console.info('appInfoTest xts defaultsDeepTest02 averageTime:' + averageTime15 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        defaultsDeep(info, defaults(info, {
          id: 'Id97'
        }))
      }
      endTime(startTime, 'defaultsDeepTest02');
    })


    it('findKeyTest01', 0, () => {
      let startTime16 = new Date().getTime()
      console.info('appInfoTest xts findKeyTest01 startTime:' + startTime16 + "us")
      let users: User = {
        barney: {
          age: 36, active: true
        },

        fred: {
          age: 40, active: false
        },

        pebbles: {
          age: 1, active: true
        }
      };

      let key: string = findKey(users, (o: Age) => {
        return o.age < 40;
      });

      let endTime16 = new Date().getTime()
      console.info('appInfoTest xts findKeyTest01 endTime:' + endTime16 + "us")
      let averageTime16 = endTime16 - startTime16
      console.info('appInfoTest xts findKeyTest01 averageTime:' + averageTime16 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        findKey(users, (o: Age) => {
          return o.age < 40;
        });
      }
      endTime(startTime, 'findKeyTest01');
      expect(key).assertEqual('barney');
    })


    it('findKeyTest02', 0, () => {
      let startTime17 = new Date().getTime()
      console.info('appInfoTest xts findKeyTest02 startTime:' + startTime17 + "us")
      let users: User = {
        barney: {
          age: 36, active: true
        },

        fred: {
          age: 40, active: false
        },

        pebbles: {
          age: 1, active: true
        }
      };

      let key: string = findKey(users, ['active', false]);

      let endTime17 = new Date().getTime()
      console.info('appInfoTest xts findKeyTest02 endTime:' + endTime17 + "us")
      let averageTime17 = endTime17 - startTime17
      console.info('appInfoTest xts findKeyTest02 averageTime:' + averageTime17 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        findKey(users, ['active', false]);
      }
      endTime(startTime, 'findKeyTest02');
      expect(key).assertEqual('fred');
    })


    it('findLastKeyTest01', 0, () => {
      let startTime18 = new Date().getTime()
      console.info('appInfoTest xts findLastKeyTest01 startTime:' + startTime18 + "us")
      let users: User = {
        barney: {
          age: 36, active: true
        },

        fred: {
          age: 40, active: false
        },

        pebbles: {
          age: 1, active: true
        }
      };

      let key: string = findLastKey(users, (o: Age) => {
        return o.age < 40;
      });

      let endTime18 = new Date().getTime()
      console.info('appInfoTest xts findLastKeyTest01 endTime:' + endTime18 + "us")
      let averageTime18 = endTime18 - startTime18
      console.info('appInfoTest xts findLastKeyTest01 averageTime:' + averageTime18 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        findLastKey(users, (o: Age) => {
          return o.age < 40;
        });
      }
      endTime(startTime, 'findLastKeyTest01');
      expect(key).assertEqual('pebbles');
    })


    it('findLastKeyTest02', 0, () => {
      let startTime19 = new Date().getTime()
      console.info('appInfoTest xts findLastKeyTest02 startTime:' + startTime19 + "us")
      let users: User = {
        barney: {
          age: 36, active: true
        },

        fred: {
          age: 40, active: false
        },

        pebbles: {
          age: 1, active: true
        }
      };

      let key: string = findLastKey(users, {
        'age': 36, 'active': true
      });

      let endTime19 = new Date().getTime()
      console.info('appInfoTest xts findLastKeyTest02 endTime:' + endTime19 + "us")
      let averageTime19 = endTime19 - startTime19
      console.info('appInfoTest xts findLastKeyTest02 averageTime:' + averageTime19 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        findLastKey(users, {
          'age': 36, 'active': true
        });
      }
      endTime(startTime, 'findLastKeyTest02');
      expect(key).assertEqual('barney');
    })


    it('functionsTest', 0, () => {
      let startTime20 = new Date().getTime()
      console.info('appInfoTest xts functionsTest startTime:' + startTime20 + "us")
      expect(JSON.stringify(functions({
        a: 1, b: 2, c: 1
      }))).assertEqual('[]');
      let endTime20 = new Date().getTime()
      console.info('appInfoTest xts functionsTest endTime:' + endTime20 + "us")
      let averageTime20 = endTime20 - startTime20
      console.info('appInfoTest xts functionsTest averageTime:' + averageTime20 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        functions({
          a: 1, b: 2, c: 1
        })
      }
      endTime(startTime, 'functionsTest');
    })


    it('functionsInTest', 0, () => {
      let startTime21 = new Date().getTime()
      console.info('appInfoTest xts functionsInTest startTime:' + startTime21 + "us")
      let Foo: () => void = () => {
        a = constant('a');

        b = constant('b');

        c = constant('c');

      }
      expect(JSON.stringify(functionsIn(Foo()))).assertEqual('[]');
      let endTime21 = new Date().getTime()
      console.info('appInfoTest xts functionsInTest endTime:' + endTime21 + "us")
      let averageTime21 = endTime21 - startTime21
      console.info('appInfoTest xts functionsInTest averageTime:' + averageTime21 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        functionsIn(Foo())
      }
      endTime(startTime, 'functionsInTest');
    })


    it('getTest01', 0, () => {
      let startTime22 = new Date().getTime()
      console.info('appInfoTest xts getTest01 startTime:' + startTime22 + "us")
      expect(get({
        a: [{
          b: {
            c: 3
          }
        }]
      }, 'a[0].b.c')).assertEqual(3);
      let endTime22 = new Date().getTime()
      console.info('appInfoTest xts getTest01 endTime:' + endTime22 + "us")
      let averageTime22 = endTime22 - startTime22
      console.info('appInfoTest xts getTest01 averageTime:' + averageTime22 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        get({
          a: [{
            b: {
              c: 3
            }
          }]
        }, 'a[0].b.c')
      }
      endTime(startTime, 'getTest01');
    })


    it('getTest02', 0, () => {
      let startTime23 = new Date().getTime()
      console.info('appInfoTest xts getTest02 startTime:' + startTime23 + "us")
      expect(get({
        a: [{
          b: {
            c: 3
          }
        }]
      }, 'a.b.c', 'default')).assertEqual('default');
      let endTime23 = new Date().getTime()
      console.info('appInfoTest xts getTest02 endTime:' + endTime23 + "us")
      let averageTime23 = endTime23 - startTime23
      console.info('appInfoTest xts getTest02 averageTime:' + averageTime23 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        get({
          a: [{
            b: {
              c: 3
            }
          }]
        }, 'a.b.c', 'default')
      }
      endTime(startTime, 'getTest02');
    })


    it('hasTest01', 0, () => {
      let startTime24 = new Date().getTime()
      console.info('appInfoTest xts hasTest01 startTime:' + startTime24 + "us")
      expect(has({
        a: {
          b: 2
        }
      }, 'a')).assertTrue();
      let endTime24 = new Date().getTime()
      console.info('appInfoTest xts hasTest01 endTime:' + endTime24 + "us")
      let averageTime24 = endTime24 - startTime24
      console.info('appInfoTest xts hasTest01 averageTime:' + averageTime24 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        has({
          a: {
            b: 2
          }
        }, 'a')
      }
      endTime(startTime, 'hasTest01');
    })


    it('hasTest02', 0, () => {
      let startTime25 = new Date().getTime()
      console.info('appInfoTest xts hasTest02 startTime:' + startTime25 + "us")
      let other: boolean = create({
        'a': create({
          'b': 2
        })
      });
      expect(has(other, 'a')).assertFalse();
      let endTime25 = new Date().getTime()
      console.info('appInfoTest xts hasTest02 endTime:' + endTime25 + "us")
      let averageTime25 = endTime25 - startTime25
      console.info('appInfoTest xts hasTest02 averageTime:' + averageTime25 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        has(other, 'a')
      }
      endTime(startTime, 'hasTest02');
    })


    it('hasInTest01', 0, () => {
      let startTime26 = new Date().getTime()
      console.info('appInfoTest xts hasInTest01 startTime:' + startTime26 + "us")
      let object: boolean = create({
        'a': create({
          'b': 2
        })
      });
      expect(hasIn(object, 'a')).assertTrue();
      let endTime26 = new Date().getTime()
      console.info('appInfoTest xts hasInTest01 endTime:' + endTime26 + "us")
      let averageTime26 = endTime26 - startTime26
      console.info('appInfoTest xts hasInTest01 averageTime:' + averageTime26 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        hasIn(object, 'a')
      }
      endTime(startTime, 'hasInTest01');
    })


    it('hasInTest02', 0, () => {
      let startTime27 = new Date().getTime()
      console.info('appInfoTest xts hasInTest02 startTime:' + startTime27 + "us")
      let object: boolean = create({
        'a': create({
          'b': 2
        })
      });
      expect(hasIn(object, ['a', 'b'])).assertTrue();
      let endTime27 = new Date().getTime()
      console.info('appInfoTest xts hasInTest02 endTime:' + endTime27 + "us")
      let averageTime27 = endTime27 - startTime27
      console.info('appInfoTest xts hasInTest02 averageTime:' + averageTime27 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        hasIn(object, ['a', 'b'])
      }
      endTime(startTime, 'hasInTest02');
    })


    it('invertTest01', 0, () => {
      let startTime28 = new Date().getTime()
      console.info('appInfoTest xts invertTest01 startTime:' + startTime28 + "us")
      let object: ABC = {
        a: 1, b: 2, c: 1
      };
      expect(JSON.stringify(invert(object))).assertEqual('{"1":"c","2":"b"}');
      let endTime28 = new Date().getTime()
      console.info('appInfoTest xts invertTest01 endTime:' + endTime28 + "us")
      let averageTime28 = endTime28 - startTime28
      console.info('appInfoTest xts invertTest01 averageTime:' + averageTime28 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        invert(object)
      }
      endTime(startTime, 'invertTest01');
    })


    it('invertTest02', 0, () => {
      let startTime29 = new Date().getTime()
      console.info('appInfoTest xts invertTest02 startTime:' + startTime29 + "us")
      expect(JSON.stringify(invert({
        'hello': 1, 'world': 2, '!': 3
      }))).assertEqual('{"1":"hello","2":"world","3":"!"}');
      let endTime29 = new Date().getTime()
      console.info('appInfoTest xts invertTest02 endTime:' + endTime29 + "us")
      let averageTime29 = endTime29 - startTime29
      console.info('appInfoTest xts invertTest02 averageTime:' + averageTime29 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        invert({
          'hello': 1, 'world': 2, '!': 3
        })
      }
      endTime(startTime, 'invertTest02');
    })


    it('invertByTest01', 0, () => {
      let startTime30 = new Date().getTime()
      console.info('appInfoTest xts invertByTest01 startTime:' + startTime30 + "us")
      let object: ABC = {
        a: 1, b: 2, c: 1
      };
      expect(JSON.stringify(invertBy(object))).assertEqual('{"1":["a","c"],"2":["b"]}');
      let endTime30 = new Date().getTime()
      console.info('appInfoTest xts invertByTest01 endTime:' + endTime30 + "us")
      let averageTime30 = endTime30 - startTime30
      console.info('appInfoTest xts invertByTest01 averageTime:' + averageTime30 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        invertBy(object)
      }
      endTime(startTime, 'invertByTest01');
    })


    it('invertByTest02', 0, () => {
      let startTime31 = new Date().getTime()
      console.info('appInfoTest xts invertByTest02 startTime:' + startTime31 + "us")
      let invertByObject: object = invertBy({
        'hello': 1, 'world': 2, '!': 3
      }, (value: string) => {

        return 'group' + value;

      });
      expect(JSON.stringify(invertBy(invertByObject)))
        .assertEqual('{"hello":["group1"],"world":["group2"],"!":["group3"]}');
      let endTime31 = new Date().getTime()
      console.info('appInfoTest xts invertByTest02 endTime:' + endTime31 + "us")
      let averageTime31 = endTime31 - startTime31
      console.info('appInfoTest xts invertByTest02 averageTime:' + averageTime31 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        invertBy(invertByObject)
      }
      endTime(startTime, 'invertByTest02');
    })


    it('invokeTest01', 0, () => {
      let startTime32 = new Date().getTime()
      console.info('appInfoTest xts invokeTest01 startTime:' + startTime32 + "us")
      expect(JSON.stringify(invoke({
        a: [{
          b: {
            c: [1, 2, 3, 4]
          }
        }]
      }, 'a[0].b.c.slice', 1, 3))).assertEqual('[2,3]');
      let endTime32 = new Date().getTime()
      console.info('appInfoTest xts invokeTest01 endTime:' + endTime32 + "us")
      let averageTime32 = endTime32 - startTime32
      console.info('appInfoTest xts invokeTest01 averageTime:' + averageTime32 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        invoke({
          a: [{
            b: {
              c: [1, 2, 3, 4]
            }
          }]
        }, 'a[0].b.c.slice', 1, 3)
      }
      endTime(startTime, 'invokeTest01');
    })


    it('invokeTest02', 0, () => {
      let startTime33 = new Date().getTime()
      console.info('appInfoTest xts invokeTest02 startTime:' + startTime33 + "us")
      let invokeObject: object = invoke({
        p: [{
          q: {
            r: {
              s: [2, 4, 6, 8, 10]
            }
          }
        }]
      }, 'p[0].q.r.s.slice', 2, 5);

      let endTime33 = new Date().getTime()
      console.info('appInfoTest xts invokeTest02 endTime:' + endTime33 + "us")
      let averageTime33 = endTime33 - startTime33
      console.info('appInfoTest xts invokeTest02 averageTime:' + averageTime33 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        invoke({
          a: [{
            b: {
              c: [1, 2, 3, 4]
            }
          }]
        }, 'a[0].b.c.slice', 1, 3)
      }
      endTime(startTime, 'invokeTest02');
      expect(JSON.stringify(invertBy(invokeObject))).assertEqual('{"6":["0"],"8":["1"],"10":["2"]}');
    })


    it('keysTest01', 0, () => {
      let startTime34 = new Date().getTime()
      console.info('appInfoTest xts keysTest01 startTime:' + startTime34 + "us")
      expect(JSON.stringify(keys('100'))).assertEqual('["0","1","2"]');
      let endTime34 = new Date().getTime()
      console.info('appInfoTest xts keysTest01 endTime:' + endTime34 + "us")
      let averageTime34 = endTime34 - startTime34
      console.info('appInfoTest xts keysTest01 averageTime:' + averageTime34 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        keys('100')
      }
      endTime(startTime, 'keysTest01');
    })


    it('keysTest02', 0, () => {
      let startTime35 = new Date().getTime()
      console.info('appInfoTest xts keysTest02 startTime:' + startTime35 + "us")
      expect(JSON.stringify(keys('hi'))).assertEqual('["0","1"]');
      let endTime35 = new Date().getTime()
      console.info('appInfoTest xts keysTest02 endTime:' + endTime35 + "us")
      let averageTime35 = endTime35 - startTime35
      console.info('appInfoTest xts keysTest02 averageTime:' + averageTime35 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        keys('hi')
      }
      endTime(startTime, 'keysTest02');
    })


    it('keysInTest01', 0, () => {
      let startTime36 = new Date().getTime()
      console.info('appInfoTest xts keysInTest01 startTime:' + startTime36 + "us")
      expect(JSON.stringify(keysIn({
        'a': 1, 'b': 2
      }))).assertEqual('["a","b"]');
      let endTime36 = new Date().getTime()
      console.info('appInfoTest xts keysInTest01 endTime:' + endTime36 + "us")
      let averageTime36 = endTime36 - startTime36
      console.info('appInfoTest xts keysInTest01 averageTime:' + averageTime36 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        keysIn({
          'a': 1, 'b': 2
        })
      }
      endTime(startTime, 'keysInTest01');
    })


    it('keysInTest02', 0, () => {
      let startTime37 = new Date().getTime()
      console.info('appInfoTest xts keysInTest02 startTime:' + startTime37 + "us")
      let obj: Info = {
        Name: "GeeksforGeeks",

        password: "@1234",

        username: "your_geeks"
      }
      expect(JSON.stringify(keys(obj))).assertEqual('["Name","password","username"]');
      let endTime37 = new Date().getTime()
      console.info('appInfoTest xts keysInTest02 endTime:' + endTime37 + "us")
      let averageTime37 = endTime37 - startTime37
      console.info('appInfoTest xts keysInTest02 averageTime:' + averageTime37 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        keys(obj)
      }
      endTime(startTime, 'keysInTest02');
    })


    it('mapKeysTest01', 0, () => {
      let startTime38 = new Date().getTime()
      console.info('appInfoTest xts mapKeysTest01 startTime:' + startTime38 + "us")
      let mapKeysObject: object = mapKeys({
        'a': 1, 'b': 2
      }, (value: number, key: number): number => {

        return key + value;

      });

      let endTime38 = new Date().getTime()
      console.info('appInfoTest xts mapKeysTest01 endTime:' + endTime38 + "us")
      let averageTime38 = endTime38 - startTime38
      console.info('appInfoTest xts mapKeysTest01 averageTime:' + averageTime38 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        mapKeys({
          'a': 1, 'b': 2
        }, (value: number, key: number): number => {
          return key + value;
        });
      }
      endTime(startTime, 'mapKeysTest01');
      expect(JSON.stringify(mapKeysObject)).assertEqual('{"a1":1,"b2":2}');
    })


    it('mapKeysTest02', 0, () => {
      let startTime39 = new Date().getTime()
      console.info('appInfoTest xts mapKeysTest02 startTime:' + startTime39 + "us")
      let mapKeysObject: object = mapKeys({
        'cpp': 15, 'java': 40, 'python': 63
      },

        (value: number, key: number): number => {

          return key + value;

        }

      )

      let endTime39 = new Date().getTime()
      console.info('appInfoTest xts mapKeysTest02 endTime:' + endTime39 + "us")
      let averageTime39 = endTime39 - startTime39
      console.info('appInfoTest xts mapKeysTest02 averageTime:' + averageTime39 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        mapKeys({
          'cpp': 15, 'java': 40, 'python': 63
        },
          (value: number, key: number): number => {
            return key + value;
          }
        )
      }
      endTime(startTime, 'mapKeysTest02');
      expect(JSON.stringify(mapKeysObject)).assertEqual('{"cpp15":15,"java40":40,"python63":63}');
    })


    it('mapValuesTest01', 0, () => {
      let startTime40 = new Date().getTime()
      console.info('appInfoTest xts mapValuesTest01 startTime:' + startTime40 + "us")
      let users: Users = {
        fred: {
          user: 'fred', age: 40
        },

        pebbles: {
          user: 'pebbles', age: 1
        }
      };

      let mapValuesObject: object = mapValues(users, 'age');

      let endTime40 = new Date().getTime()
      console.info('appInfoTest xts mapValuesTest01 endTime:' + endTime40 + "us")
      let averageTime40 = endTime40 - startTime40
      console.info('appInfoTest xts mapValuesTest01 averageTime:' + averageTime40 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        mapValues(users, 'age');
      }
      endTime(startTime, 'mapValuesTest01');
      expect(JSON.stringify(mapValuesObject)).assertEqual('{"fred":40,"pebbles":1}');
    })


    it('mapValuesTest02', 0, () => {
      let startTime41 = new Date().getTime()
      console.info('appInfoTest xts mapValuesTest02 startTime:' + startTime41 + "us")
      let users: Users = {
        fred: {
          user: 'fred', age: 40
        },

        pebbles: {
          user: 'pebbles', age: 1
        }
      };

      let mapValuesObject: object = mapValues(users, (o: Ages) => {
        return o.age;
      });

      let endTime41 = new Date().getTime()
      console.info('appInfoTest xts mapValuesTest02 endTime:' + endTime41 + "us")
      let averageTime41 = endTime41 - startTime41
      console.info('appInfoTest xts mapValuesTest02 averageTime:' + averageTime41 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        mapValues(users, (o: Ages) => {
          return o.age;
        });
      }
      endTime(startTime, 'mapValuesTest02');
      expect(JSON.stringify(mapValuesObject)).assertEqual('{"fred":40,"pebbles":1}');
    })


    it('mergeTest01', 0, () => {
      let startTime42 = new Date().getTime()
      console.info('appInfoTest xts mergeTest01 startTime:' + startTime42 + "us")
      expect(JSON.stringify(merge({
        a: [{
          b: 2
        }, {
          d: 4
        }]
      }, {
        a: [{
          c: 3
        }, {
          e: 5
        }]
      }))).assertEqual('{"a":[{"b":2,"c":3},{"d":4,"e":5}]}');
      let endTime42 = new Date().getTime()
      console.info('appInfoTest xts mergeTest01 endTime:' + endTime42 + "us")
      let averageTime42 = endTime42 - startTime42
      console.info('appInfoTest xts mergeTest01 averageTime:' + averageTime42 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        merge({
          a: [{
            b: 2
          }, {
            d: 4
          }]
        }, {
          a: [{
            c: 3
          }, {
            e: 5
          }]
        });
      }
      endTime(startTime, 'mergeTest01');
    })


    it('mergeTest02', 0, () => {
      let startTime43 = new Date().getTime()
      console.info('appInfoTest xts mergeTest02 startTime:' + startTime43 + "us")
      let object: object = merge({
        cpp: "12"
      }, {
        cpp: "12"
      }, {
        java: "23"
      }, {
        python: "35"
      });

      let endTime43 = new Date().getTime()
      console.info('appInfoTest xts mergeTest02 endTime:' + endTime43 + "us")
      let averageTime43 = endTime43 - startTime43
      console.info('appInfoTest xts mergeTest02 averageTime:' + averageTime43 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        merge({
          cpp: "12"
        }, {
          cpp: "12"
        }, {
          java: "23"
        }, {
          python: "35"
        });
      }
      endTime(startTime, 'mergeTest02');
      expect(JSON.stringify(object)).assertEqual('{"cpp":"12","java":"23","python":"35"}');
    })


    it('mergeWithTest01', 0, () => {
      let startTime71 = new Date().getTime()
      console.info('appInfoTest xts mergeWithTest01 startTime:' + startTime71 + "us")
      let customizer: (objValue: ESObject, srcValue: ESObject) => void = (objValue: ESObject, srcValue: ESObject): ESObject => {
        if (isArray(objValue)) {
          return objValue.concat(srcValue);
        }
      }
      let object: Array = { a: [1], b: [2] };
      let other: Array = { a: [3], b: [4] };
      expect(JSON.stringify(mergeWith(object, other, customizer))).assertEqual('{"a":[1,3],"b":[2,4]}');
      let endTime71 = new Date().getTime()
      console.info('appInfoTest xts mergeWithTest01 endTime:' + endTime71 + "us")
      let averageTime71 = endTime71 - startTime71
      console.info('appInfoTest xts mergeWithTest01 averageTime:' + averageTime71 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        mergeWith(object, other, customizer)
      }
      endTime(startTime, 'mergeWithTest01');
    })


    it('mergeWithTest02', 0, () => {
      let startTime44 = new Date().getTime()
      console.info('appInfoTest xts mergeWithTest02 startTime:' + startTime44 + "us")
      expect(JSON.stringify(mergeWith({
        amit: [{
          susanta: 20
        }, {
          durgam: 40
        }]
      }, {
        amit: [{
          chinmoy: 30
        }, {
          kripamoy: 50
        }]
      }))
      ).assertEqual('{"amit":[{"susanta":20,"chinmoy":30},{"durgam":40,"kripamoy":50}]}');
      let endTime44 = new Date().getTime()
      console.info('appInfoTest xts mergeWithTest02 endTime:' + endTime44 + "us")
      let averageTime44 = endTime44 - startTime44
      console.info('appInfoTest xts mergeWithTest02 averageTime:' + averageTime44 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        mergeWith({
          amit: [{
            susanta: 20
          }, {
            durgam: 40
          }]
        }, {
          amit: [{
            chinmoy: 30
          }, {
            kripamoy: 50
          }]
        })
      }
      endTime(startTime, 'mergeWithTest02');
    })


    it('omitTest01', 0, () => {
      let startTime45 = new Date().getTime()
      console.info('appInfoTest xts omitTest01 startTime:' + startTime45 + "us")
      let object: ABC = {
        a: 1, b: '2', c: 3
      };
      expect(JSON.stringify(omit(object, ['a', 'c']))).assertEqual('{"b":"2"}');
      let endTime45 = new Date().getTime()
      console.info('appInfoTest xts omitTest01 endTime:' + endTime45 + "us")
      let averageTime45 = endTime45 - startTime45
      console.info('appInfoTest xts omitTest01 averageTime:' + averageTime45 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        omit(object, ['a', 'c'])
      }
      endTime(startTime, 'omitTest01');
    })


    it('omitTest02', 0, () => {
      let startTime46 = new Date().getTime()
      console.info('appInfoTest xts omitTest02 startTime:' + startTime46 + "us")
      let obj: XY = {
        x: 1, y: '2', z: 3
      };
      expect(JSON.stringify(omit(obj, ['x', 'y']))).assertEqual('{"z":3}');
      let endTime46 = new Date().getTime()
      console.info('appInfoTest xts omitTest02 endTime:' + endTime46 + "us")
      let averageTime46 = endTime46 - startTime46
      console.info('appInfoTest xts omitTest02 averageTime:' + averageTime46 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        omit(obj, ['x', 'y'])
      }
      endTime(startTime, 'omitTest02');
    })


    it('omitByTest01', 0, () => {
      let startTime47 = new Date().getTime()
      console.info('appInfoTest xts omitByTest01 startTime:' + startTime47 + "us")
      let object: ABC = {
        a: 1, b: '2', c: 3
      };
      expect(JSON.stringify(omitBy(object, isNumber))).assertEqual('{"b":"2"}');
      let endTime47 = new Date().getTime()
      console.info('appInfoTest xts omitByTest01 endTime:' + endTime47 + "us")
      let averageTime47 = endTime47 - startTime47
      console.info('appInfoTest xts omitByTest01 averageTime:' + averageTime47 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        omitBy(object, isNumber)
      }
      endTime(startTime, 'omitByTest01');
    })


    it('omitByTest02', 0, () => {
      let startTime48 = new Date().getTime()
      console.info('appInfoTest xts omitByTest02 startTime:' + startTime48 + "us")
      let obj: XY = {
        x: 1, y: '2', z: 3
      };
      expect(JSON.stringify(omitBy(obj, ['x', 'y']))).assertEqual('{"x":1,"y":"2","z":3}');
      let endTime48 = new Date().getTime()
      console.info('appInfoTest xts omitByTest02 endTime:' + endTime48 + "us")
      let averageTime48 = endTime48 - startTime48
      console.info('appInfoTest xts omitByTest02 averageTime:' + averageTime48 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        omitBy(obj, ['x', 'y'])
      }
      endTime(startTime, 'omitByTest02');
    })


    it('pickTest01', 0, () => {
      let startTime49 = new Date().getTime()
      console.info('appInfoTest xts pickTest01 startTime:' + startTime49 + "us")
      let object: ABC = {
        a: 1, b: '2', c: 3
      };
      expect(JSON.stringify(pick(object, ['a', 'c']))).assertEqual('{"a":1,"c":3}');
      let endTime49 = new Date().getTime()
      console.info('appInfoTest xts pickTest01 endTime:' + endTime49 + "us")
      let averageTime49 = endTime49 - startTime49
      console.info('appInfoTest xts pickTest01 averageTime:' + averageTime49 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        pick(object, ['a', 'c'])
      }
      endTime(startTime, 'pickTest01');
    })


    it('pickTest02', 0, () => {
      let startTime50 = new Date().getTime()
      console.info('appInfoTest xts pickTest02 startTime:' + startTime50 + "us")
      let obj: XY = {
        x: 1, y: '2', z: 3
      };
      expect(JSON.stringify(pick(obj, ['x', 'y']))).assertEqual('{"x":1,"y":"2"}');
      let endTime50 = new Date().getTime()
      console.info('appInfoTest xts pickTest02 endTime:' + endTime50 + "us")
      let averageTime50 = endTime50 - startTime50
      console.info('appInfoTest xts pickTest02 averageTime:' + averageTime50 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        pick(obj, ['x', 'y'])
      }
      endTime(startTime, 'pickTest02');
    })


    it('pickByTest01', 0, () => {
      let startTime51 = new Date().getTime()
      console.info('appInfoTest xts pickByTest01 startTime:' + startTime51 + "us")
      let object: ABC = {
        a: 1, b: '2', c: 3
      };
      expect(JSON.stringify(pickBy(object, isNumber))).assertEqual('{"a":1,"c":3}');
      let endTime51 = new Date().getTime()
      console.info('appInfoTest xts pickByTest01 endTime:' + endTime51 + "us")
      let averageTime51 = endTime51 - startTime51
      console.info('appInfoTest xts pickByTest01 averageTime:' + averageTime51 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        pickBy(object, isNumber)
      }
      endTime(startTime, 'pickByTest01');
    })


    it('pickByTest02', 0, () => {
      let startTime52 = new Date().getTime()
      console.info('appInfoTest xts pickByTest02 startTime:' + startTime52 + "us")
      let obj: XY = {
        x: 1, y: '2', z: 3
      };
      expect(JSON.stringify(pickBy(obj, ['x', 'y']))).assertEqual('{}');
      let endTime52 = new Date().getTime()
      console.info('appInfoTest xts pickByTest02 endTime:' + endTime52 + "us")
      let averageTime52 = endTime52 - startTime52
      console.info('appInfoTest xts pickByTest02 averageTime:' + averageTime52 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        pickBy(obj, ['x', 'y'])
      }
      endTime(startTime, 'pickByTest02');
    })


    it('resultTest01', 0, () => {
      let startTime53 = new Date().getTime()
      console.info('appInfoTest xts resultTest01 startTime:' + startTime53 + "us")
      expect(result({
        a: [{
          b: {
            c1: 3, c2: constant(4)
          }
        }]
      }, 'a[0].b.c1')).assertEqual(3);
      let endTime53 = new Date().getTime()
      console.info('appInfoTest xts resultTest01 endTime:' + endTime53 + "us")
      let averageTime53 = endTime53 - startTime53
      console.info('appInfoTest xts resultTest01 averageTime:' + averageTime53 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        result({
          a: [{
            b: {
              c1: 3, c2: constant(4)
            }
          }]
        }, 'a[0].b.c1')
      }
      endTime(startTime, 'resultTest01');
    })


    it('resultTest02', 0, () => {
      let startTime54 = new Date().getTime()
      console.info('appInfoTest xts resultTest02 startTime:' + startTime54 + "us")
      expect(result({
        a: [{
          b: {
            c1: 3, c2: constant(4)
          }
        }]
      }, 'a[0].b.c3', 'default')).assertEqual('default');
      let endTime54 = new Date().getTime()
      console.info('appInfoTest xts resultTest02 endTime:' + endTime54 + "us")
      let averageTime54 = endTime54 - startTime54
      console.info('appInfoTest xts resultTest02 averageTime:' + averageTime54 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        result({
          a: [{
            b: {
              c1: 3, c2: constant(4)
            }
          }]
        }, 'a[0].b.c3', 'default')
      }
      endTime(startTime, 'resultTest02');
    })


    it('setTest01', 0, () => {
      let startTime55 = new Date().getTime()
      console.info('appInfoTest xts setTest01 startTime:' + startTime55 + "us")
      let object: A = {
        a: [{
          b: {
            c: 3
          } as C
        }]
      };

      let setObject: object = set(object, 'a[0].b.c', 4);

      let endTime55 = new Date().getTime()
      console.info('appInfoTest xts setTest01 endTime:' + endTime55 + "us")
      let averageTime55 = endTime55 - startTime55
      console.info('appInfoTest xts setTest01 averageTime:' + averageTime55 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        set(object, 'a[0].b.c', 4);
      }
      endTime(startTime, 'setTest01');
      expect(JSON.stringify(setObject)).assertEqual('{"a":[{"b":{"c":4}}]}');
    })


    it('setTest02', 0, () => {
      let startTime56 = new Date().getTime()
      console.info('appInfoTest xts setTest02 startTime:' + startTime56 + "us")
      let object: A = {
        a: [{
          b: {
            c: 3
          } as C
        }]
      };

      let setObject: object = set(object, ['x', '0', 'y', 'z'], 5);

      let endTime56 = new Date().getTime()
      console.info('appInfoTest xts setTest02 endTime:' + endTime56 + "us")
      let averageTime56 = endTime56 - startTime56
      console.info('appInfoTest xts setTest02 averageTime:' + averageTime56 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        set(object, ['x', '0', 'y', 'z'], 5);
      }
      endTime(startTime, 'setTest02');
      expect(JSON.stringify(setObject)).assertEqual('{"a":[{"b":{"c":3}}],"x":[{"y":{"z":5}}]}');
    })


    it('setWithTest01', 0, () => {
      let startTime57 = new Date().getTime()
      console.info('appInfoTest xts setWithTest01 startTime:' + startTime57 + "us")
      let setObject: object = setWith({}, '[0][1]', 'a', Object);

      let endTime57 = new Date().getTime()
      console.info('appInfoTest xts setWithTest01 endTime:' + endTime57 + "us")
      let averageTime57 = endTime57 - startTime57
      console.info('appInfoTest xts setWithTest01 averageTime:' + averageTime57 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        setWith({}, '[0][1]', 'a', Object);
      }
      endTime(startTime, 'setWithTest01');
      expect(JSON.stringify(setObject)).assertEqual('{"0":{"1":"a"}}');
    })


    it('setWithTest02', 0, () => {
      let startTime58 = new Date().getTime()
      console.info('appInfoTest xts setWithTest02 startTime:' + startTime58 + "us")
      let setObject: object = setWith({}, '[0][1][2]', 'a', Object);

      let endTime58 = new Date().getTime()
      console.info('appInfoTest xts setWithTest02 endTime:' + endTime58 + "us")
      let averageTime58 = endTime58 - startTime58
      console.info('appInfoTest xts setWithTest02 averageTime:' + averageTime58 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        setWith({}, '[0][1][2]', 'a', Object);
      }
      endTime(startTime, 'setWithTest02');
      expect(JSON.stringify(setObject)).assertEqual('{"0":{"1":{"2":"a"}}}');
    })


    it('transformTest01', 0, () => {
      let startTime59 = new Date().getTime()
      console.info('appInfoTest xts transformTest01 startTime:' + startTime59 + "us")
      let transformObject: number[] = transform([2, 3, 4], (result: number[], n: number) => {

        result.push(n *= n);

        return n % 2 == 0;

      }, []);

      let endTime59 = new Date().getTime()
      console.info('appInfoTest xts transformTest01 endTime:' + endTime59 + "us")
      let averageTime59 = endTime59 - startTime59
      console.info('appInfoTest xts transformTest01 averageTime:' + averageTime59 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        transform([2, 3, 4], (result: number[], n: number) => {
          result.push(n *= n);
          return n % 2 == 0;
        }, []);
      }
      endTime(startTime, 'transformTest01');
      expect(JSON.stringify(transformObject)).assertEqual('[4,9]');
    })


    it('transformTest02', 0, () => {
      let startTime60 = new Date().getTime()
      console.info('appInfoTest xts transformTest02 startTime:' + startTime60 + "us")
      let transformObject: object = transform({
        'a': 1, 'b': 2, 'c': 1
      }, (result: string[], value: string, key: number[]) => {

        (result[value] || (result[value] = [])).push(key);

      }, {});

      let endTime60 = new Date().getTime()
      console.info('appInfoTest xts transformTest02 endTime:' + endTime60 + "us")
      let averageTime60 = endTime60 - startTime60
      console.info('appInfoTest xts transformTest02 averageTime:' + averageTime60 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        transform({
          'a': 1, 'b': 2, 'c': 1
        }, (result: string[], value: string, key: number[]) => {
          (result[value] || (result[value] = [])).push(key);
        }, {});
      }
      endTime(startTime, 'transformTest02');
      expect(JSON.stringify(transformObject)).assertEqual('{"1":["a","c"],"2":["b"]}');
    })


    it('unsetTest01', 0, () => {
      let startTime61 = new Date().getTime()
      console.info('appInfoTest xts unsetTest01 startTime:' + startTime61 + "us")
      let object: A = {
        a: [{
          b: {
            c: 7
          } as C
        }]
      };

      unset(object, 'a[0].b.c');

      let endTime61 = new Date().getTime()
      console.info('appInfoTest xts unsetTest01 endTime:' + endTime61 + "us")
      let averageTime61 = endTime61 - startTime61
      console.info('appInfoTest xts unsetTest01 averageTime:' + averageTime61 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        unset(object, 'a[0].b.c');
      }
      endTime(startTime, 'unsetTest01');
      expect(JSON.stringify(object)).assertEqual('{"a":[{"b":{}}]}');
    })


    it('unsetTest02', 0, () => {
      let startTime62 = new Date().getTime()
      console.info('appInfoTest xts unsetTest02 startTime:' + startTime62 + "us")
      let object: A = {
        a: [{
          b: {
            c: 7
          } as C
        }]
      };

      unset(object, ['a', '0', 'b', 'c']);

      let endTime62 = new Date().getTime()
      console.info('appInfoTest xts unsetTest02 endTime:' + endTime62 + "us")
      let averageTime62 = endTime62 - startTime62
      console.info('appInfoTest xts unsetTest02 averageTime:' + averageTime62 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        unset(object, ['a', '0', 'b', 'c']);
      }
      endTime(startTime, 'unsetTest02');
      expect(JSON.stringify(object)).assertEqual('{"a":[{"b":{}}]}');
    })


    it('updateTest01', 0, () => {
      let startTime63 = new Date().getTime()
      console.info('appInfoTest xts updateTest01 startTime:' + startTime63 + "us")
      let object: A = {
        a: [{
          b: {
            c: 3
          } as C
        }]
      };

      update(object, 'a[0].b.c', (n: number) => {
        return n * n;
      });

      let endTime63 = new Date().getTime()
      console.info('appInfoTest xts updateTest01 endTime:' + endTime63 + "us")
      let averageTime63 = endTime63 - startTime63
      console.info('appInfoTest xts updateTest01 averageTime:' + averageTime63 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        let object1: A = {
          a: [{
            b: {
              c: 3
            } as C
          }]
        };
        update(object1, 'a[0].b.c', (n: number) => {
          return n * n;
        });
      }
      endTime(startTime, 'updateTest01');
      expect(object.a[0].b.c).assertEqual(9);
    })


    it('updateTest02', 0, () => {
      let startTime64 = new Date().getTime()
      console.info('appInfoTest xts updateTest02 startTime:' + startTime64 + "us")
      let obj: Update = {
        cpp: [{
          java: {
            python: 3
          } as java
        }]
      };

      update(obj, 'cpp[0].java.python', (n: number) => {
        return n * n;
      });

      let endTime64 = new Date().getTime()
      console.info('appInfoTest xts updateTest02 endTime:' + endTime64 + "us")
      let averageTime64 = endTime64 - startTime64
      console.info('appInfoTest xts updateTest02 averageTime:' + averageTime64 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        let obj1: Update = {
          cpp: [{
            java: {
              python: 3
            } as java
          }]
        };
        update(obj1, 'cpp[0].java.python', (n: number) => {
          return n * n;
        });
      }
      endTime(startTime, 'updateTest02');
      expect(obj.cpp[0].java.python).assertEqual(9);
    })


    it('updateWithTest01', 0, () => {
      let startTime65 = new Date().getTime()
      console.info('appInfoTest xts updateWithTest01 startTime:' + startTime65 + "us")
      let updateWithObject: object = updateWith({}, '[0][1]', constant('a'), Object);

      let endTime65 = new Date().getTime()
      console.info('appInfoTest xts updateWithTest01 endTime:' + endTime65 + "us")
      let averageTime65 = endTime65 - startTime65
      console.info('appInfoTest xts updateWithTest01 averageTime:' + averageTime65 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        updateWith({}, '[0][1]', constant('a'), Object);
      }
      endTime(startTime, 'updateWithTest01');
      expect(JSON.stringify(updateWithObject)).assertEqual('{"0":{"1":"a"}}');
    })


    it('updateWithTest02', 0, () => {
      let startTime66 = new Date().getTime()
      console.info('appInfoTest xts updateWithTest02 startTime:' + startTime66 + "us")
      let obj: Update = {
        cpp: [{
          java: {
            python: 3
          } as java
        }]
      };

      updateWith(obj, 'cpp[0].java.python', (n: number) => {
        return n * n;
      });

      let endTime66 = new Date().getTime()
      console.info('appInfoTest xts updateWithTest02 endTime:' + endTime66 + "us")
      let averageTime66 = endTime66 - startTime66
      console.info('appInfoTest xts updateWithTest02 averageTime:' + averageTime66 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        let obj1: Update = {
          cpp: [{
            java: {
              python: 3
            } as java
          }]
        };
        updateWith(obj1, 'cpp[0].java.python', (n: number) => {
          return n * n;
        });
      }
      endTime(startTime, 'updateWithTest02');
      expect(obj.cpp[0].java.python).assertEqual(9);
    })


    it('valuesTest01', 0, () => {
      let startTime67 = new Date().getTime()
      console.info('appInfoTest xts valuesTest01 startTime:' + startTime67 + "us")
      expect(JSON.stringify(values({
        a: [{
          b: {
            c: 7
          }
        }]
      }))).assertEqual('[[{"b":{"c":7}}]]');
      let endTime67 = new Date().getTime()
      console.info('appInfoTest xts valuesTest01 endTime:' + endTime67 + "us")
      let averageTime67 = endTime67 - startTime67
      console.info('appInfoTest xts valuesTest01 averageTime:' + averageTime67 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        values({
          a: [{
            b: {
              c: 7
            }
          }]
        })
      }
      endTime(startTime, 'valuesTest01');
    })


    it('valuesTest02', 0, () => {
      let startTime68 = new Date().getTime()
      console.info('appInfoTest xts valuesTest02 startTime:' + startTime68 + "us")
      expect(JSON.stringify(values('hi'))).assertEqual('["h","i"]');
      let endTime68 = new Date().getTime()
      console.info('appInfoTest xts valuesTest02 endTime:' + endTime68 + "us")
      let averageTime68 = endTime68 - startTime68
      console.info('appInfoTest xts valuesTest02 averageTime:' + averageTime68 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        values('hi')
      }
      endTime(startTime, 'valuesTest02');
    })


    it('valuesInTest01', 0, () => {
      let startTime69 = new Date().getTime()
      console.info('appInfoTest xts valuesInTest01 startTime:' + startTime69 + "us")
      expect(JSON.stringify(valuesIn({
        x: 1, y: '2', z: 3
      }))).assertEqual('[1,"2",3]');
      let endTime69 = new Date().getTime()
      console.info('appInfoTest xts valuesInTest01 endTime:' + endTime69 + "us")
      let averageTime69 = endTime69 - startTime69
      console.info('appInfoTest xts valuesInTest01 averageTime:' + averageTime69 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        valuesIn({
          x: 1, y: '2', z: 3
        })
      }
      endTime(startTime, 'valuesInTest01');
    })


    it('valuesInTest02', 0, () => {
      let startTime70 = new Date().getTime()
      console.info('appInfoTest xts valuesInTest02 startTime:' + startTime70 + "us")
      expect(JSON.stringify(valuesIn('hi'))).assertEqual('["h","i"]');
      let endTime70 = new Date().getTime()
      console.info('appInfoTest xts valuesInTest02 endTime:' + endTime70 + "us")
      let averageTime70 = endTime70 - startTime70
      console.info('appInfoTest xts valuesInTest02 averageTime:' + averageTime70 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        valuesIn('hi')
      }
      endTime(startTime, 'valuesInTest02');
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