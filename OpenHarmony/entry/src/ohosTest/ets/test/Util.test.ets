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
  add,
  attempt, bindAll, cond, conforms,
  conformsTo,
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
  sortBy,
  stubArray,
  stubFalse,
  stubObject,
  stubString,
  stubTrue,
  times,
  toPath,
  uniqueId
} from 'lodash'

const BASE_COUNT: number = 2000;

export default function utilTest() {
  describe('UtilTest', () => {
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
    class ABC {
      a: number[] | number = []
      b: number[] | number = []
      c: number[] | number = []
    }

    class B {
      b: number = 0
    }

    class AB {
      a: B | ESObject
    }

    class Const {
      b: ESObject
    }

    class Constant {
      a: Const | ESObject
    }

    class Source {
      a: (array: number[]) => number = () => 0;
      b: string = '';
    }

    class User {
      java: number = 0
      python: number = 0
      js: number = 0
    }

    class Age {
      user: string = ''
      age: number = 0
      active: boolean = true
    }
    class A {
      a: number = 0
    }

    class Ident {
      a: number = 0
      b: number = 0
    }

    class Conforms {
      gfg: number = 0
      GFG: number = 0
    }
    class View {
      label: string = ''
      click: () => void = Object
    }
    it('attemptTest01', 0, () => {
      let startTime0 = new Date().getTime()
      console.info('appInfoTest xts attemptTest01 startTime:' + startTime0 + "us")
      let actual: number[] = attempt((): number => {
        return slice.call(arguments);
      }, 1, 2);

      let endTime0 = new Date().getTime()
      console.info('appInfoTest xts attemptTest01 endTime:' + endTime0 + "us")
      let averageTime0 = endTime0 - startTime0
      console.info('appInfoTest xts attemptTest01 averageTime:' + averageTime0 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        attempt((): number => {
          return slice.call(arguments);
        }, 1, 2);
      }
      endTime(startTime, 'attemptTest01');
      expect(JSON.stringify(actual)).assertEqual('[]');
    })


    it('attemptTest02', 0, () => {
      let startTime1 = new Date().getTime()
      console.info('appInfoTest xts attemptTest02 startTime:' + startTime1 + "us")
      let elements: number = map(new Error, (error: ESObject) => {

        return attempt(() => {
          throw new Error();
        }) === error;

      });

      let endTime1 = new Date().getTime()
      console.info('appInfoTest xts attemptTest02 endTime:' + endTime1 + "us")
      let averageTime1 = endTime1 - startTime1
      console.info('appInfoTest xts attemptTest02 averageTime:' + averageTime1 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        map(new Error, (error: ESObject) => {
          return attempt(() => {
            throw new Error();
          }) === error;
        });
      }
      endTime(startTime, 'attemptTest02');
      expect(JSON.stringify(elements)).assertEqual('[]');
    })


    it('bindAllTest', 0, () => {
      let startTime2 = new Date().getTime()
      console.info('appInfoTest xts bindAllTest startTime:' + startTime2 + "us")
      let view: View = {
        label: 'docs',

        click: () => {

          console.log('clicked ' + view.label);

        }
      };
      expect(JSON.stringify(bindAll(view, ['click']))).assertEqual('{"label":"docs"}');
      let endTime2 = new Date().getTime()
      console.info('appInfoTest xts bindAllTest endTime:' + endTime2 + "us")
      let averageTime2 = endTime2 - startTime2
      console.info('appInfoTest xts bindAllTest averageTime:' + averageTime2 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        bindAll(view, ['click'])
      }
      endTime(startTime, 'bindAllTest');
    })


    it('condTest01', 0, () => {
      let startTime3 = new Date().getTime()
      console.info('appInfoTest xts condTest01 startTime:' + startTime3 + "us")
      let func: (a: Ident) => string = cond([

        [matches({
          'a': 1
        }), constant('matches A')],

        [conforms({
          'b': isNumber
        }), constant('matches B')],

        [stubTrue, constant('no match')]

      ]);

      let string: string = func({
        a: 1, b: 2
      });

      let endTime3 = new Date().getTime()
      console.info('appInfoTest xts condTest01 endTime:' + endTime3 + "us")
      let averageTime3 = endTime3 - startTime3
      console.info('appInfoTest xts condTest01 averageTime:' + averageTime3 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        func({
          a: 1, b: 2
        });
      }
      endTime(startTime, 'condTest01');
      expect(string).assertEqual('matches A');
    })


    it('condTest02', 0, () => {
      let startTime4 = new Date().getTime()
      console.info('appInfoTest xts condTest02 startTime:' + startTime4 + "us")
      let func: (a: Ident) => string = cond([

        [matches({
          'a': 1
        }), constant('matches A')],

        [conforms({
          'b': isNumber
        }), constant('matches B')],

        [stubTrue, constant('no match')]

      ]);

      let string: string = func({
        a: 1, b: 2
      });

      let endTime4 = new Date().getTime()
      console.info('appInfoTest xts condTest02 endTime:' + endTime4 + "us")
      let averageTime4 = endTime4 - startTime4
      console.info('appInfoTest xts condTest02 averageTime:' + averageTime4 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        func({
          a: 1, b: 2
        });
      }
      endTime(startTime, 'condTest01');
      expect(string).assertEqual('matches A');
    })


    it('conformsTest01', 0, () => {
      let startTime5 = new Date().getTime()
      console.info('appInfoTest xts conformsTest01 startTime:' + startTime5 + "us")
      let objects: Ident[] = [

        {
          a: 2, b: 1
        },

        {
          a: 1, b: 2
        }

      ];

      let string: object = filter(objects, conforms({
        'b': (n: number) => {
          return n > 1;
        }
      }));

      let endTime5 = new Date().getTime()
      console.info('appInfoTest xts conformsTest01 endTime:' + endTime5 + "us")
      let averageTime5 = endTime5 - startTime5
      console.info('appInfoTest xts conformsTest01 averageTime:' + averageTime5 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        filter(objects, conforms({
          'b': (n: number) => {
            return n > 1;
          }
        }));
      }
      endTime(startTime, 'conformsTest01');
      expect(JSON.stringify(string)).assertEqual('[{"a":1,"b":2}]');
    })


    it('conformsTest02', 0, () => {
      let startTime6 = new Date().getTime()
      console.info('appInfoTest xts conformsTest02 startTime:' + startTime6 + "us")
      let objects: Conforms = {
        gfg: 5, GFG: 10
      };

      let string: boolean = conformsTo(objects,

        {
          'GFG': (n: number) => {
            return n > 12;
          }
        }

      );

      let endTime6 = new Date().getTime()
      console.info('appInfoTest xts conformsTest02 endTime:' + endTime6 + "us")
      let averageTime6 = endTime6 - startTime6
      console.info('appInfoTest xts conformsTest02 averageTime:' + averageTime6 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        conformsTo(objects,
          {
            'GFG': (n: number) => {
              return n > 12;
            }
          }
        );
      }
      endTime(startTime, 'conformsTest02');
      expect(string).assertFalse();
    })


    it('constantTest01', 0, () => {
      let startTime7 = new Date().getTime()
      console.info('appInfoTest xts constantTest01 startTime:' + startTime7 + "us")
      let objects: object = times(2, constant({
        'a': 1
      }));

      let endTime7 = new Date().getTime()
      console.info('appInfoTest xts constantTest01 endTime:' + endTime7 + "us")
      let averageTime7 = endTime7 - startTime7
      console.info('appInfoTest xts constantTest01 averageTime:' + averageTime7 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        times(2, constant({
          'a': 1
        }));
      }
      endTime(startTime, 'constantTest01');
      expect(JSON.stringify(objects)).assertEqual('[{"a":1},{"a":1}]');
    })


    it('constantTest02', 0, () => {
      let startTime8 = new Date().getTime()
      console.info('appInfoTest xts constantTest02 startTime:' + startTime8 + "us")
      let objects: object = times(3, constant({
        'geeks': 3
      }));

      let endTime8 = new Date().getTime()
      console.info('appInfoTest xts constantTest02 endTime:' + endTime8 + "us")
      let averageTime8 = endTime8 - startTime8
      console.info('appInfoTest xts constantTest02 averageTime:' + averageTime8 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        times(3, constant({
          'geeks': 3
        }));
      }
      endTime(startTime, 'constantTest02');
      expect(JSON.stringify(objects)).assertEqual('[{"geeks":3},{"geeks":3},{"geeks":3}]');
    })


    it('defaultToTest01', 0, () => {
      let startTime9 = new Date().getTime()
      console.info('appInfoTest xts defaultToTest01 startTime:' + startTime9 + "us")
      expect(defaultTo(1, 10)).assertEqual(1);
      let endTime9 = new Date().getTime()
      console.info('appInfoTest xts defaultToTest01 endTime:' + endTime9 + "us")
      let averageTime9 = endTime9 - startTime9
      console.info('appInfoTest xts defaultToTest01 averageTime:' + averageTime9 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        defaultTo(1, 10);
      }
      endTime(startTime, 'defaultToTest01');
    })


    it('defaultToTest02', 0, () => {
      let startTime10 = new Date().getTime()
      console.info('appInfoTest xts defaultToTest02 startTime:' + startTime10 + "us")
      expect(defaultTo(undefined, 10)).assertEqual(10);
      let endTime10 = new Date().getTime()
      console.info('appInfoTest xts defaultToTest02 endTime:' + endTime10 + "us")
      let averageTime10 = endTime10 - startTime10
      console.info('appInfoTest xts defaultToTest02 averageTime:' + averageTime10 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        defaultTo(undefined, 10)
      }
      endTime(startTime, 'defaultToTest02');
    })


    it('flowTest01', 0, () => {
      let startTime11 = new Date().getTime()
      console.info('appInfoTest xts flowTest01 startTime:' + startTime11 + "us")
      let square: (n: number) => void = (n: number): number => {

        return n * n;

      }

      let addSquare: (a: number, b: number) => number = flow([add, square]);

      let endTime11 = new Date().getTime()
      console.info('appInfoTest xts flowTest01 endTime:' + endTime11 + "us")
      let averageTime11 = endTime11 - startTime11
      console.info('appInfoTest xts flowTest01 averageTime:' + averageTime11 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        addSquare(1, 2)
      }
      endTime(startTime, 'flowTest01');
      expect(addSquare(1, 2)).assertEqual(9);
    })


    it('flowTest02', 0, () => {
      let startTime12 = new Date().getTime()
      console.info('appInfoTest xts flowTest02 startTime:' + startTime12 + "us")
      let cube: (number: number) => void = (number: number): number => {

        return number * number * number;

      }

      let multiplycube: (a: number, b: number) => number = flow([multiply, cube]);

      let endTime12 = new Date().getTime()
      console.info('appInfoTest xts flowTest02 endTime:' + endTime12 + "us")
      let averageTime12 = endTime12 - startTime12
      console.info('appInfoTest xts flowTest02 averageTime:' + averageTime12 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        multiplycube(2, 3)
      }
      endTime(startTime, 'flowTest02');
      expect(multiplycube(2, 3)).assertEqual(216);
    })


    it('flowRightTest01', 0, () => {
      let startTime13 = new Date().getTime()
      console.info('appInfoTest xts flowRightTest01 startTime:' + startTime13 + "us")
      let square: (n: number) => void = (n: number): number => {

        return n * n;

      }

      let addSquare: (a: number, b: number) => number = flowRight([square, add]);

      let endTime13 = new Date().getTime()
      console.info('appInfoTest xts flowRightTest01 endTime:' + endTime13 + "us")
      let averageTime13 = endTime13 - startTime13
      console.info('appInfoTest xts flowRightTest01 averageTime:' + averageTime13 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        addSquare(1, 2)
      }
      endTime(startTime, 'flowRightTest01');
      expect(addSquare(1, 2)).assertEqual(9);
    })


    it('flowRightTest02', 0, () => {
      let startTime14 = new Date().getTime()
      console.info('appInfoTest xts flowRightTest02 startTime:' + startTime14 + "us")
      let cube: (number: number) => void = (number: number): number => {

        return number * number * number;

      }

      let multiplycube: (a: number, b: number) => number = flowRight([multiply, cube]);

      let endTime14 = new Date().getTime()
      console.info('appInfoTest xts flowRightTest02 endTime:' + endTime14 + "us")
      let averageTime14 = endTime14 - startTime14
      console.info('appInfoTest xts flowRightTest02 averageTime:' + averageTime14 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        multiplycube(2, 3)
      }
      endTime(startTime, 'flowRightTest02');
      expect(multiplycube(2, 3)).assertEqual(8);
    })


    it('identityTest01', 0, () => {
      let startTime15 = new Date().getTime()
      console.info('appInfoTest xts identityTest01 startTime:' + startTime15 + "us")
      let object: A = {
        a: 1
      };
      expect(JSON.stringify(identity(object))).assertEqual('{"a":1}');
      let endTime15 = new Date().getTime()
      console.info('appInfoTest xts identityTest01 endTime:' + endTime15 + "us")
      let averageTime15 = endTime15 - startTime15
      console.info('appInfoTest xts identityTest01 averageTime:' + averageTime15 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        identity(object)
      }
      endTime(startTime, 'identityTest01');
    })


    it('identityTest02', 0, () => {
      let startTime16 = new Date().getTime()
      console.info('appInfoTest xts identityTest02 startTime:' + startTime16 + "us")
      let object: Ident = {
        a: 9, b: 3
      };
      expect(JSON.stringify(identity(object))).assertEqual('{"a":9,"b":3}');
      let endTime16 = new Date().getTime()
      console.info('appInfoTest xts identityTest02 endTime:' + endTime16 + "us")
      let averageTime16 = endTime16 - startTime16
      console.info('appInfoTest xts identityTest02 averageTime:' + averageTime16 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        identity(object)
      }
      endTime(startTime, 'identityTest02');
    })


    it('iterateeTest01', 0, () => {
      let startTime17 = new Date().getTime()
      console.info('appInfoTest xts iterateeTest01 startTime:' + startTime17 + "us")
      let users: Age[] = [

        {
          user: 'barney', age: 36, active: true
        },

        {
          user: 'fred', age: 40, active: false
        }

      ];

      let iterateeObject: object = filter(users, iteratee({
        'user': 'barney', 'active': true
      }));

      let endTime17 = new Date().getTime()
      console.info('appInfoTest xts iterateeTest01 endTime:' + endTime17 + "us")
      let averageTime17 = endTime17 - startTime17
      console.info('appInfoTest xts iterateeTest01 averageTime:' + averageTime17 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        filter(users, iteratee({
          'user': 'barney', 'active': true
        }));
      }
      endTime(startTime, 'iterateeTest01');
      expect(JSON.stringify(identity(iterateeObject))).assertEqual('[{"user":"barney","age":36,"active":true}]');
    })


    it('iterateeTest02', 0, () => {
      let startTime18 = new Date().getTime()
      console.info('appInfoTest xts iterateeTest02 startTime:' + startTime18 + "us")
      let users: Age[] = [

        {
          user: 'barney', age: 36, active: true
        },

        {
          user: 'fred', age: 40, active: false
        }

      ];

      let iterateeObject: string[] = map(users, iteratee('user'));

      let endTime18 = new Date().getTime()
      console.info('appInfoTest xts iterateeTest02 endTime:' + endTime18 + "us")
      let averageTime18 = endTime18 - startTime18
      console.info('appInfoTest xts iterateeTest02 averageTime:' + averageTime18 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        map(users, iteratee('user'));
      }
      endTime(startTime, 'iterateeTest02');
      expect(JSON.stringify(identity(iterateeObject))).assertEqual('["barney","fred"]');
    })


    it('matchesTest01', 0, () => {
      let startTime19 = new Date().getTime()
      console.info('appInfoTest xts matchesTest01 startTime:' + startTime19 + "us")
      let objects: ABC[] = [

        {
          a: 1, b: 2, c: 3
        },

        {
          a: 4, b: 5, c: 6
        }

      ];

      let matchesObject: object = filter(objects, matches({
        'a': 4, 'c': 6
      }));

      let endTime19 = new Date().getTime()
      console.info('appInfoTest xts matchesTest01 endTime:' + endTime19 + "us")
      let averageTime19 = endTime19 - startTime19
      console.info('appInfoTest xts matchesTest01 averageTime:' + averageTime19 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        filter(objects, matches({
          'a': 4, 'c': 6
        }));
      }
      endTime(startTime, 'matchesTest01');
      expect(JSON.stringify(identity(matchesObject))).assertEqual('[{"a":4,"b":5,"c":6}]');
    })


    it('matchesTest02', 0, () => {
      let startTime20 = new Date().getTime()
      console.info('appInfoTest xts matchesTest02 startTime:' + startTime20 + "us")
      let users: User[] = [{
        java: 3, python: 5, js: 7
      },

        {
          java: 4, python: 2, js: 6
        }

      ];

      let matchesObject: object = filter(users, matches({
        'java': 3, 'js': 7
      }));

      let endTime20 = new Date().getTime()
      console.info('appInfoTest xts matchesTest02 endTime:' + endTime20 + "us")
      let averageTime20 = endTime20 - startTime20
      console.info('appInfoTest xts matchesTest02 averageTime:' + averageTime20 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        filter(users, matches({
          'java': 3, 'js': 7
        }));
      }
      endTime(startTime, 'matchesTest02');
      expect(JSON.stringify(identity(matchesObject))).assertEqual('[{"java":3,"python":5,"js":7}]');
    })


    it('matchesPropertyTest01', 0, () => {
      let startTime21 = new Date().getTime()
      console.info('appInfoTest xts matchesPropertyTest01 startTime:' + startTime21 + "us")
      let objects: ABC[] = [

        {
          a: 1, b: 2, c: 3
        },

        {
          a: 4, b: 5, c: 6
        }

      ];

      let matchesObject: object = filter(objects, matchesProperty('a', 4));

      let endTime21 = new Date().getTime()
      console.info('appInfoTest xts matchesPropertyTest01 endTime:' + endTime21 + "us")
      let averageTime21 = endTime21 - startTime21
      console.info('appInfoTest xts matchesPropertyTest01 averageTime:' + averageTime21 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        filter(objects, matchesProperty('a', 4));
      }
      endTime(startTime, 'matchesPropertyTest01');
      expect(JSON.stringify(identity(matchesObject))).assertEqual('[{"a":4,"b":5,"c":6}]');
    })


    it('matchesPropertyTest02', 0, () => {
      let startTime22 = new Date().getTime()
      console.info('appInfoTest xts matchesPropertyTest02 startTime:' + startTime22 + "us")
      let users: User[] = [

        {
          java: 3, python: 5, js: 7
        },

        {
          java: 4, python: 2, js: 6
        }

      ];

      let matchesObject: object = filter(users, matchesProperty('java', 3));

      let endTime22 = new Date().getTime()
      console.info('appInfoTest xts matchesPropertyTest02 endTime:' + endTime22 + "us")
      let averageTime22 = endTime22 - startTime22
      console.info('appInfoTest xts matchesPropertyTest02 averageTime:' + averageTime22 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        filter(users, matchesProperty('java', 3));
      }
      endTime(startTime, 'matchesPropertyTest02');
      expect(JSON.stringify(identity(matchesObject))).assertEqual('[{"java":3,"python":5,"js":7}]');
    })


    it('methodTest01', 0, () => {
      let startTime23 = new Date().getTime()
      console.info('appInfoTest xts methodTest01 startTime:' + startTime23 + "us")
      let objects: Constant[] = [

        {
          a: {
            b: constant(2)
          }
        },

        {
          a: {
            b: constant(1)
          }
        }

      ];

      let methodObject: number[] = map(objects, method('a.b'));

      let endTime23 = new Date().getTime()
      console.info('appInfoTest xts methodTest01 endTime:' + endTime23 + "us")
      let averageTime23 = endTime23 - startTime23
      console.info('appInfoTest xts methodTest01 averageTime:' + averageTime23 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        map(objects, method('a.b'));
      }
      endTime(startTime, 'methodTest01');
      expect(JSON.stringify(identity(methodObject))).assertEqual('[2,1]');
    })


    it('methodTest02', 0, () => {
      let startTime24 = new Date().getTime()
      console.info('appInfoTest xts methodTest02 startTime:' + startTime24 + "us")
      let objects: Constant[] = [

        {
          a: {
            b: constant(2)
          }
        },

        {
          a: {
            b: constant(1)
          }
        }

      ];

      let methodObject: number[] = map(objects, method(['a', 'b']));

      let endTime24 = new Date().getTime()
      console.info('appInfoTest xts methodTest02 endTime:' + endTime24 + "us")
      let averageTime24 = endTime24 - startTime24
      console.info('appInfoTest xts methodTest02 averageTime:' + averageTime24 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        map(objects, method(['a', 'b']));
      }
      endTime(startTime, 'methodTest02');
      expect(JSON.stringify(identity(methodObject))).assertEqual('[2,1]');
    })


    it('methodOfTest01', 0, () => {
      let startTime25 = new Date().getTime()
      console.info('appInfoTest xts methodOfTest01 startTime:' + startTime25 + "us")
      let array: number[] = times(3, constant),

        object: ABC = {
          a: array, b: array, c: array
        };

      let methodOfObject: number[] = map(['a[2]', 'c[0]'], methodOf(object));

      let endTime25 = new Date().getTime()
      console.info('appInfoTest xts methodOfTest01 endTime:' + endTime25 + "us")
      let averageTime25 = endTime25 - startTime25
      console.info('appInfoTest xts methodOfTest01 averageTime:' + averageTime25 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        map(['a[2]', 'c[0]'], methodOf(object));
      }
      endTime(startTime, 'methodOfTest01');
      expect(JSON.stringify(identity(methodOfObject))).assertEqual('[2,0]');
    })


    it('methodOfTest02', 0, () => {
      let startTime26 = new Date().getTime()
      console.info('appInfoTest xts methodOfTest02 startTime:' + startTime26 + "us")
      let array: number[] = times(3, constant),

        object: ABC = {
          a: array, b: array, c: array
        };

      let methodObject: number[] = map([['a', '2'], ['c', '0']], methodOf(object));

      let endTime26 = new Date().getTime()
      console.info('appInfoTest xts methodOfTest02 endTime:' + endTime26 + "us")
      let averageTime26 = endTime26 - startTime26
      console.info('appInfoTest xts methodOfTest02 averageTime:' + averageTime26 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        map([['a', '2'], ['c', '0']], methodOf(object));
      }
      endTime(startTime, 'methodOfTest02');
      expect(JSON.stringify(identity(methodObject))).assertEqual('[2,0]');
    })


    it('mixinTest01', 0, () => {
      let startTime27 = new Date().getTime()
      console.info('appInfoTest xts mixinTest01 startTime:' + startTime27 + "us")
      let source: Source = {
        a: (array: number[]) => {
          return array[1];
        }, b: 'ffff'
      }
      expect(JSON.stringify(mixin({}, source))).assertEqual('{}');
      let endTime27 = new Date().getTime()
      console.info('appInfoTest xts mixinTest01 endTime:' + endTime27 + "us")
      let averageTime27 = endTime27 - startTime27
      console.info('appInfoTest xts mixinTest01 averageTime:' + averageTime27 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        mixin({}, source)
      }
      endTime(startTime, 'mixinTest01');
    })


    it('mixinTest02', 0, () => {
      let startTime28 = new Date().getTime()
      console.info('appInfoTest xts mixinTest02 startTime:' + startTime28 + "us")
      let source: Source = {
        a: (array: number[]) => {
          return array[0];
        }, b: 'B'
      }
      expect(JSON.stringify(mixin({}, source))).assertEqual('{}');
      let endTime28 = new Date().getTime()
      console.info('appInfoTest xts mixinTest02 endTime:' + endTime28 + "us")
      let averageTime28 = endTime28 - startTime28
      console.info('appInfoTest xts mixinTest02 averageTime:' + averageTime28 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        mixin({}, source)
      }
      endTime(startTime, 'mixinTest02');
    })


    it('noopTest', 0, () => {
      let startTime29 = new Date().getTime()
      console.info('appInfoTest xts noopTest startTime:' + startTime29 + "us")
      expect(JSON.stringify(times(2, noop))).assertEqual('[null,null]');
      let endTime29 = new Date().getTime()
      console.info('appInfoTest xts noopTest endTime:' + endTime29 + "us")
      let averageTime29 = endTime29 - startTime29
      console.info('appInfoTest xts noopTest averageTime:' + averageTime29 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        times(2, noop)
      }
      endTime(startTime, 'noopTest');
    })


    it('nthArgTest01', 0, () => {
      let startTime30 = new Date().getTime()
      console.info('appInfoTest xts nthArgTest01 startTime:' + startTime30 + "us")
      let func: (a: string, b: string, c: string, d: string) => string = nthArg(1)

      let endTime30 = new Date().getTime()
      console.info('appInfoTest xts nthArgTest01 endTime:' + endTime30 + "us")
      let averageTime30 = endTime30 - startTime30
      console.info('appInfoTest xts nthArgTest01 averageTime:' + averageTime30 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        func('a', 'b', 'c', 'd')
      }
      endTime(startTime, 'nthArgTest01');
      expect(func('a', 'b', 'c', 'd')).assertEqual('b');
    })


    it('nthArgTest02', 0, () => {
      let startTime31 = new Date().getTime()
      console.info('appInfoTest xts nthArgTest02 startTime:' + startTime31 + "us")
      let func: (a: string, b: string, c: string, d: string) => string = nthArg(-2);

      let endTime31 = new Date().getTime()
      console.info('appInfoTest xts nthArgTest02 endTime:' + endTime31 + "us")
      let averageTime31 = endTime31 - startTime31
      console.info('appInfoTest xts nthArgTest02 averageTime:' + averageTime31 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        func('a', 'b', 'c', 'd')
      }
      endTime(startTime, 'nthArgTest02');
      expect(func('a', 'b', 'c', 'd')).assertEqual('c');
    })


    it('overTest01', 0, () => {
      let startTime32 = new Date().getTime()
      console.info('appInfoTest xts overTest01 startTime:' + startTime32 + "us")
      let func: (a: number, b: number, c: number, d: number) => number[] = over([Math.max, Math.min]);

      let endTime32 = new Date().getTime()
      console.info('appInfoTest xts overTest01 endTime:' + endTime32 + "us")
      let averageTime32 = endTime32 - startTime32
      console.info('appInfoTest xts overTest01 averageTime:' + averageTime32 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        func(1, 2, 3, 4)
      }
      endTime(startTime, 'overTest01');
      expect(JSON.stringify(func(1, 2, 3, 4))).assertEqual('[4,1]');
    })


    it('overTest02', 0, () => {
      let startTime33 = new Date().getTime()
      console.info('appInfoTest xts overTest02 startTime:' + startTime33 + "us")
      let func: (a: string, b: string) => boolean[] = over([Boolean, isFinite]);

      let endTime33 = new Date().getTime()
      console.info('appInfoTest xts overTest02 endTime:' + endTime33 + "us")
      let averageTime33 = endTime33 - startTime33
      console.info('appInfoTest xts overTest02 averageTime:' + averageTime33 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        func('10', 'null')
      }
      endTime(startTime, 'overTest02');
      expect(JSON.stringify(func('10', 'null'))).assertEqual('[true,true]');
    })


    it('overEveryTest01', 0, () => {
      let startTime34 = new Date().getTime()
      console.info('appInfoTest xts overEveryTest01 startTime:' + startTime34 + "us")
      let func: (a: string) => boolean = overEvery([Boolean, isFinite]);

      let endTime34 = new Date().getTime()
      console.info('appInfoTest xts overEveryTest01 endTime:' + endTime34 + "us")
      let averageTime34 = endTime34 - startTime34
      console.info('appInfoTest xts overEveryTest01 averageTime:' + averageTime34 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        func('1')
      }
      endTime(startTime, 'overEveryTest01');
      expect(func('1')).assertTrue();
    })


    it('overEveryTest02', 0, () => {
      let startTime35 = new Date().getTime()
      console.info('appInfoTest xts overEveryTest02 startTime:' + startTime35 + "us")
      let func: (a: string) => boolean = overEvery([Boolean, isFinite]);

      let endTime35 = new Date().getTime()
      console.info('appInfoTest xts overEveryTest02 endTime:' + endTime35 + "us")
      let averageTime35 = endTime35 - startTime35
      console.info('appInfoTest xts overEveryTest02 averageTime:' + averageTime35 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        func('b')
      }
      endTime(startTime, 'overEveryTest02');
      expect(func('b')).assertFalse();
    })


    it('overSomeTest01', 0, () => {
      let startTime36 = new Date().getTime()
      console.info('appInfoTest xts overSomeTest01 startTime:' + startTime36 + "us")
      let func: (a: string) => boolean = overSome([Boolean, isFinite]);

      let endTime36 = new Date().getTime()
      console.info('appInfoTest xts overSomeTest01 endTime:' + endTime36 + "us")
      let averageTime36 = endTime36 - startTime36
      console.info('appInfoTest xts overSomeTest01 averageTime:' + averageTime36 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        func('1')
      }
      endTime(startTime, 'overSomeTest01');
      expect(func('1')).assertTrue();
    })


    it('overSomeTest02', 0, () => {
      let startTime37 = new Date().getTime()
      console.info('appInfoTest xts overSomeTest02 startTime:' + startTime37 + "us")
      let func: (a: string) => boolean = overSome([Boolean, isFinite]);

      let endTime37 = new Date().getTime()
      console.info('appInfoTest xts overSomeTest02 endTime:' + endTime37 + "us")
      let averageTime37 = endTime37 - startTime37
      console.info('appInfoTest xts overSomeTest02 averageTime:' + averageTime37 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        func('a')
      }
      endTime(startTime, 'overSomeTest02');
      expect(func('a')).assertTrue();
    })


    it('propertyTest01', 0, () => {
      let startTime38 = new Date().getTime()
      console.info('appInfoTest xts propertyTest01 startTime:' + startTime38 + "us")
      let objects: AB[] = [

        {
          a: {
            b: 2
          }
        },

        {
          a: {
            b: 1
          }
        }

      ];

      let propertyArray: number[] = map(objects, property('a.b'));

      let endTime38 = new Date().getTime()
      console.info('appInfoTest xts propertyTest01 endTime:' + endTime38 + "us")
      let averageTime38 = endTime38 - startTime38
      console.info('appInfoTest xts propertyTest01 averageTime:' + averageTime38 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        map(objects, property('a.b'));
      }
      endTime(startTime, 'propertyTest01');
      expect(JSON.stringify(propertyArray)).assertEqual('[2,1]');
    })


    it('propertyTest02', 0, () => {
      let startTime39 = new Date().getTime()
      console.info('appInfoTest xts propertyTest02 startTime:' + startTime39 + "us")
      let objects: AB[] = [

        {
          a: {
            b: 2
          }
        },

        {
          a: {
            b: 1
          }
        }

      ];

      let propertyArray: number[] = map(sortBy(objects, property(['a', 'b'])), 'a.b');

      let endTime39 = new Date().getTime()
      console.info('appInfoTest xts propertyTest02 endTime:' + endTime39 + "us")
      let averageTime39 = endTime39 - startTime39
      console.info('appInfoTest xts propertyTest02 averageTime:' + averageTime39 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        map(sortBy(objects, property(['a', 'b'])), 'a.b');
      }
      endTime(startTime, 'propertyTest02');
      expect(JSON.stringify(propertyArray)).assertEqual('[1,2]');
    })


    it('propertyOfTest01', 0, () => {
      let startTime40 = new Date().getTime()
      console.info('appInfoTest xts propertyOfTest01 startTime:' + startTime40 + "us")
      let array: number[] = [0, 1, 2],

        object: ABC = {
          a: array, b: array, c: array
        };

      let propertyOfArray: number[] = map(['a[2]', 'c[0]'], propertyOf(object));

      let endTime40 = new Date().getTime()
      console.info('appInfoTest xts propertyOfTest01 endTime:' + endTime40 + "us")
      let averageTime40 = endTime40 - startTime40
      console.info('appInfoTest xts propertyOfTest01 averageTime:' + averageTime40 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        map(['a[2]', 'c[0]'], propertyOf(object));
      }
      endTime(startTime, 'propertyOfTest01');
      expect(JSON.stringify(propertyOfArray)).assertEqual('[2,0]');
    })


    it('propertyOfTest02', 0, () => {
      let startTime41 = new Date().getTime()
      console.info('appInfoTest xts propertyOfTest02 startTime:' + startTime41 + "us")
      let array: number[] = [0, 1, 2],

        object: ABC = {
          a: array, b: array, c: array
        };

      let propertyOfArray: number[] = map([['a', '2'], ['c', '0']], propertyOf(object));

      let endTime41 = new Date().getTime()
      console.info('appInfoTest xts propertyOfTest02 endTime:' + endTime41 + "us")
      let averageTime41 = endTime41 - startTime41
      console.info('appInfoTest xts propertyOfTest02 averageTime:' + averageTime41 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        map([['a', '2'], ['c', '0']], propertyOf(object));
      }
      endTime(startTime, 'propertyOfTest02');
      expect(JSON.stringify(propertyOfArray)).assertEqual('[2,0]');
    })


    it('rangeTest01', 0, () => {
      let startTime42 = new Date().getTime()
      console.info('appInfoTest xts rangeTest01 startTime:' + startTime42 + "us")
      expect(JSON.stringify(range(4))).assertEqual('[0,1,2,3]');
      let endTime42 = new Date().getTime()
      console.info('appInfoTest xts rangeTest01 endTime:' + endTime42 + "us")
      let averageTime42 = endTime42 - startTime42
      console.info('appInfoTest xts rangeTest01 averageTime:' + averageTime42 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        range(4)
      }
      endTime(startTime, 'rangeTest01');
    })


    it('rangeTest02', 0, () => {
      let startTime43 = new Date().getTime()
      console.info('appInfoTest xts rangeTest02 startTime:' + startTime43 + "us")
      expect(JSON.stringify(range(0, 20, 5))).assertEqual('[0,5,10,15]');
      let endTime43 = new Date().getTime()
      console.info('appInfoTest xts rangeTest02 endTime:' + endTime43 + "us")
      let averageTime43 = endTime43 - startTime43
      console.info('appInfoTest xts rangeTest02 averageTime:' + averageTime43 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        range(0, 20, 5)
      }
      endTime(startTime, 'rangeTest02');
    })


    it('rangeRightTest01', 0, () => {
      let startTime44 = new Date().getTime()
      console.info('appInfoTest xts rangeRightTest01 startTime:' + startTime44 + "us")
      expect(JSON.stringify(rangeRight(4))).assertEqual('[3,2,1,0]');
      let endTime44 = new Date().getTime()
      console.info('appInfoTest xts rangeRightTest01 endTime:' + endTime44 + "us")
      let averageTime44 = endTime44 - startTime44
      console.info('appInfoTest xts rangeRightTest01 averageTime:' + averageTime44 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        rangeRight(4)
      }
      endTime(startTime, 'rangeRightTest01');
    })


    it('rangeRightTest02', 0, () => {
      let startTime45 = new Date().getTime()
      console.info('appInfoTest xts rangeRightTest02 startTime:' + startTime45 + "us")
      expect(JSON.stringify(rangeRight(0, 20, 5))).assertEqual('[15,10,5,0]');
      let endTime45 = new Date().getTime()
      console.info('appInfoTest xts rangeRightTest02 endTime:' + endTime45 + "us")
      let averageTime45 = endTime45 - startTime45
      console.info('appInfoTest xts rangeRightTest02 averageTime:' + averageTime45 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        rangeRight(0, 20, 5)
      }
      endTime(startTime, 'rangeRightTest02');
    })


    it('stubArrayTest01', 0, () => {
      let startTime46 = new Date().getTime()
      console.info('appInfoTest xts stubArrayTest01 startTime:' + startTime46 + "us")
      let arrays: number[] = times(2, stubArray);

      let endTime46 = new Date().getTime()
      console.info('appInfoTest xts stubArrayTest01 endTime:' + endTime46 + "us")
      let averageTime46 = endTime46 - startTime46
      console.info('appInfoTest xts stubArrayTest01 averageTime:' + averageTime46 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        times(2, stubArray);
      }
      endTime(startTime, 'stubArrayTest01');
      expect(JSON.stringify(arrays)).assertEqual('[[],[]]');
    })


    it('stubArrayTest02', 0, () => {
      let startTime47 = new Date().getTime()
      console.info('appInfoTest xts stubArrayTest02 startTime:' + startTime47 + "us")
      let arrays: number[] = times(3, stubArray);

      let endTime47 = new Date().getTime()
      console.info('appInfoTest xts stubArrayTest02 endTime:' + endTime47 + "us")
      let averageTime47 = endTime47 - startTime47
      console.info('appInfoTest xts stubArrayTest02 averageTime:' + averageTime47 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        times(3, stubArray);
      }
      endTime(startTime, 'stubArrayTest02');
      expect(JSON.stringify(arrays)).assertEqual('[[],[],[]]');
    })


    it('stubFalseTest01', 0, () => {
      let startTime48 = new Date().getTime()
      console.info('appInfoTest xts stubFalseTest01 startTime:' + startTime48 + "us")
      let arrays: number[] = times(2, stubFalse);

      let endTime48 = new Date().getTime()
      console.info('appInfoTest xts stubFalseTest01 endTime:' + endTime48 + "us")
      let averageTime48 = endTime48 - startTime48
      console.info('appInfoTest xts stubFalseTest01 averageTime:' + averageTime48 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        times(2, stubFalse);
      }
      endTime(startTime, 'stubFalseTest01');
      expect(JSON.stringify(arrays)).assertEqual('[false,false]');
    })


    it('stubFalseTest02', 0, () => {
      let startTime49 = new Date().getTime()
      console.info('appInfoTest xts stubFalseTest02 startTime:' + startTime49 + "us")
      let arrays: number[] = times(3, stubFalse);

      let endTime49 = new Date().getTime()
      console.info('appInfoTest xts stubFalseTest02 endTime:' + endTime49 + "us")
      let averageTime49 = endTime49 - startTime49
      console.info('appInfoTest xts stubFalseTest02 averageTime:' + averageTime49 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        times(3, stubFalse);
      }
      endTime(startTime, 'stubFalseTest02');
      expect(JSON.stringify(arrays)).assertEqual('[false,false,false]');
    })


    it('stubObjectTest01', 0, () => {
      let startTime50 = new Date().getTime()
      console.info('appInfoTest xts stubObjectTest01 startTime:' + startTime50 + "us")
      let arrays: number[] = times(2, stubObject);

      let endTime50 = new Date().getTime()
      console.info('appInfoTest xts stubObjectTest01 endTime:' + endTime50 + "us")
      let averageTime50 = endTime50 - startTime50
      console.info('appInfoTest xts stubObjectTest01 averageTime:' + averageTime50 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        times(2, stubObject);
      }
      endTime(startTime, 'stubObjectTest01');
      expect(JSON.stringify(arrays)).assertEqual('[{},{}]');
    })


    it('stubObjectTest02', 0, () => {
      let startTime51 = new Date().getTime()
      console.info('appInfoTest xts stubObjectTest02 startTime:' + startTime51 + "us")
      let arrays: number[] = times(3, stubObject);

      let endTime51 = new Date().getTime()
      console.info('appInfoTest xts stubObjectTest02 endTime:' + endTime51 + "us")
      let averageTime51 = endTime51 - startTime51
      console.info('appInfoTest xts stubObjectTest02 averageTime:' + averageTime51 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        times(3, stubObject);
      }
      endTime(startTime, 'stubObjectTest02');
      expect(JSON.stringify(arrays)).assertEqual('[{},{},{}]');
    })


    it('stubStringTest01', 0, () => {
      let startTime52 = new Date().getTime()
      console.info('appInfoTest xts stubStringTest01 startTime:' + startTime52 + "us")
      let arrays: number[] = times(2, stubString);

      let endTime52 = new Date().getTime()
      console.info('appInfoTest xts stubStringTest01 endTime:' + endTime52 + "us")
      let averageTime52 = endTime52 - startTime52
      console.info('appInfoTest xts stubStringTest01 averageTime:' + averageTime52 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        times(2, stubString);
      }
      endTime(startTime, 'stubStringTest01');
      expect(JSON.stringify(arrays)).assertEqual('["",""]');
    })


    it('stubStringTest02', 0, () => {
      let startTime53 = new Date().getTime()
      console.info('appInfoTest xts stubStringTest02 startTime:' + startTime53 + "us")
      let arrays: number[] = times(3, stubString);

      let endTime53 = new Date().getTime()
      console.info('appInfoTest xts stubStringTest02 endTime:' + endTime53 + "us")
      let averageTime53 = endTime53 - startTime53
      console.info('appInfoTest xts stubStringTest02 averageTime:' + averageTime53 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        times(3, stubString);
      }
      endTime(startTime, 'stubStringTest02');
      expect(JSON.stringify(arrays)).assertEqual('["","",""]');
    })


    it('stubTrueTest01', 0, () => {
      let startTime54 = new Date().getTime()
      console.info('appInfoTest xts stubTrueTest01 startTime:' + startTime54 + "us")
      let arrays: number[] = times(2, stubTrue);

      let endTime54 = new Date().getTime()
      console.info('appInfoTest xts stubTrueTest01 endTime:' + endTime54 + "us")
      let averageTime54 = endTime54 - startTime54
      console.info('appInfoTest xts stubTrueTest01 averageTime:' + averageTime54 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        times(2, stubTrue);
      }
      endTime(startTime, 'stubTrueTest01');
      expect(JSON.stringify(arrays)).assertEqual('[true,true]');
    })


    it('stubTrueTest02', 0, () => {
      let startTime55 = new Date().getTime()
      console.info('appInfoTest xts stubTrueTest02 startTime:' + startTime55 + "us")
      let arrays: number[] = times(3, stubTrue);

      let endTime55 = new Date().getTime()
      console.info('appInfoTest xts stubTrueTest02 endTime:' + endTime55 + "us")
      let averageTime55 = endTime55 - startTime55
      console.info('appInfoTest xts stubTrueTest02 averageTime:' + averageTime55 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        times(3, stubTrue);
      }
      endTime(startTime, 'stubTrueTest02');
      expect(JSON.stringify(arrays)).assertEqual('[true,true,true]');
    })


    it('timesTest01', 0, () => {
      let startTime56 = new Date().getTime()
      console.info('appInfoTest xts timesTest01 startTime:' + startTime56 + "us")
      let arrays: number[] = times(3, String);

      let endTime56 = new Date().getTime()
      console.info('appInfoTest xts timesTest01 endTime:' + endTime56 + "us")
      let averageTime56 = endTime56 - startTime56
      console.info('appInfoTest xts timesTest01 averageTime:' + averageTime56 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        times(3, String);
      }
      endTime(startTime, 'timesTest01');
      expect(JSON.stringify(arrays)).assertEqual('["0","1","2"]');
    })


    it('timesTest02', 0, () => {
      let startTime57 = new Date().getTime()
      console.info('appInfoTest xts timesTest02 startTime:' + startTime57 + "us")
      let arrays: number[] = times(4, constant(0));

      let endTime57 = new Date().getTime()
      console.info('appInfoTest xts timesTest02 endTime:' + endTime57 + "us")
      let averageTime57 = endTime57 - startTime57
      console.info('appInfoTest xts timesTest02 averageTime:' + averageTime57 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        times(4, constant(0));
      }
      endTime(startTime, 'timesTest02');
      expect(JSON.stringify(arrays)).assertEqual('[0,0,0,0]');
    })


    it('toPathTest01', 0, () => {
      let startTime58 = new Date().getTime()
      console.info('appInfoTest xts toPathTest01 startTime:' + startTime58 + "us")
      let arrays: number[] = toPath('a.b.c');

      let endTime58 = new Date().getTime()
      console.info('appInfoTest xts toPathTest01 endTime:' + endTime58 + "us")
      let averageTime58 = endTime58 - startTime58
      console.info('appInfoTest xts toPathTest01 averageTime:' + averageTime58 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        toPath('a.b.c');
      }
      endTime(startTime, 'toPathTest01');
      expect(JSON.stringify(arrays)).assertEqual('["a","b","c"]');
    })


    it('toPathTest02', 0, () => {
      let startTime59 = new Date().getTime()
      console.info('appInfoTest xts toPathTest02 startTime:' + startTime59 + "us")
      let arrays: number = toPath('a[0].b.c');

      let endTime59 = new Date().getTime()
      console.info('appInfoTest xts toPathTest02 endTime:' + endTime59 + "us")
      let averageTime59 = endTime59 - startTime59
      console.info('appInfoTest xts toPathTest02 averageTime:' + averageTime59 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        toPath('a[0].b.c');
      }
      endTime(startTime, 'toPathTest02');
      expect(JSON.stringify(arrays)).assertEqual('["a","0","b","c"]');
    })


    it('uniqueIdTest01', 0, () => {
      let startTime60 = new Date().getTime()
      console.info('appInfoTest xts uniqueIdTest01 startTime:' + startTime60 + "us")
      let arrays: string = uniqueId('contact_');

      let endTime60 = new Date().getTime()
      console.info('appInfoTest xts uniqueIdTest01 endTime:' + endTime60 + "us")
      let averageTime60 = endTime60 - startTime60
      console.info('appInfoTest xts uniqueIdTest01 averageTime:' + averageTime60 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        uniqueId('contact_');
      }
      endTime(startTime, 'uniqueIdTest01');
      expect(arrays).assertEqual('contact_1');
    })


    it('uniqueIdTest02', 0, () => {
      let startTime61 = new Date().getTime()
      console.info('appInfoTest xts uniqueIdTest02 startTime:' + startTime61 + "us")
      expect(uniqueId()).assertEqual('2002');
      let endTime61 = new Date().getTime()
      console.info('appInfoTest xts uniqueIdTest02 endTime:' + endTime61 + "us")
      let averageTime61 = endTime61 - startTime61
      console.info('appInfoTest xts uniqueIdTest02 averageTime:' + averageTime61 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        uniqueId();
      }
      endTime(startTime, 'uniqueIdTest02');
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