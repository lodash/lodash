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
import { countBy, every, filter, find, findLast, flatMap, flatMapDeep, flatMapDepth, groupBy, includes,
  invokeMap,
  keyBy,
  map,
  orderBy,
  partition,
  reduce,
  reduceRight,
  reject,
  size,
  some,
  sortBy
} from 'lodash';

const BASE_COUNT: number = 2000;

export default function collectionTest() {
  describe('CollectionTestTest', () => {
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
    class User {
      user: string = ''
      active: boolean = true
      age: number = 0
    }

    class Active {
      user: string = ''
      active: boolean = true
    }

    class Users {
      user: string = ''
    }

    class Age {
      user: string = ''
      age: number = 0
    }

    class Array {
      dir: string = ''
      code: number = 0
    }

    class Emp {
      employee: string = ''
      salary: number = 0
    }
    it('countByTest01', 0, () => {
      let startTime0 = new Date().getTime()
      console.info('appInfoTest xts countByTest01 startTime:' + startTime0 + "us")
      let countByObject: object = countBy([6.1, 4.2, 6.3], Math.floor);

      let endTime0 = new Date().getTime()
      console.info('appInfoTest xts countByTest01 endTime:' + endTime0 + "us")
      let averageTime0 = endTime0 - startTime0
      console.info('appInfoTest xts countByTest01 averageTime:' + averageTime0 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        countBy([6.1, 4.2, 6.3], Math.floor);
      }
      endTime(startTime, 'countByTest01');
      expect(JSON.stringify(countByObject)).assertEqual('{"4":1,"6":2}')
    })


    it('countByTest02', 0, () => {
      let startTime1 = new Date().getTime()
      console.info('appInfoTest xts countByTest02 startTime:' + startTime1 + "us")
      let countByObject: object = countBy(['one', 'two', 'three'], 'length');

      let endTime1 = new Date().getTime()
      console.info('appInfoTest xts countByTest02 endTime:' + endTime1 + "us")
      let averageTime1 = endTime1 - startTime1
      console.info('appInfoTest xts countByTest02 averageTime:' + averageTime1 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        countBy(['one', 'two', 'three'], 'length');
      }
      endTime(startTime, 'countByTest02');
      expect(JSON.stringify(countByObject)).assertEqual('{"3":2,"5":1}')
    })


    it('everyTest01', 0, () => {
      let startTime2 = new Date().getTime()
      console.info('appInfoTest xts everyTest01 startTime:' + startTime2 + "us")
      let everyObject: boolean = every([true, 1, null, 'yes'], Boolean);

      let endTime2 = new Date().getTime()
      console.info('appInfoTest xts everyTest01 endTime:' + endTime2 + "us")
      let averageTime2 = endTime2 - startTime2
      console.info('appInfoTest xts everyTest01 averageTime:' + averageTime2 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        every([true, 1, null, 'yes'], Boolean);
      }
      endTime(startTime, 'everyTest01');
      expect(everyObject).assertFalse()
    })


    it('everyTest02', 0, () => {
      let startTime3 = new Date().getTime()
      console.info('appInfoTest xts everyTest02 startTime:' + startTime3 + "us")
      let users: User[] = [

        {
          user: 'barney', age: 36, active: false
        },

        {
          user: 'fred', age: 40, active: false
        }

      ];

      let everyObject: boolean = every(users, ['active', false]);

      let endTime3 = new Date().getTime()
      console.info('appInfoTest xts everyTest02 endTime:' + endTime3 + "us")
      let averageTime3 = endTime3 - startTime3
      console.info('appInfoTest xts everyTest02 averageTime:' + averageTime3 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        every(users, ['active', false]);
      }
      endTime(startTime, 'everyTest02');
      expect(everyObject).assertTrue()
    })


    it('filterTest01', 0, () => {
      let startTime4 = new Date().getTime()
      console.info('appInfoTest xts filterTest01 startTime:' + startTime4 + "us")
      let users: User[] = [

        {
          user: 'barney', age: 36, active: true
        },

        {
          user: 'fred', age: 40, active: false
        }

      ];

      let filterObject: object = filter(users, (o: User) => {
        return !o.active;
      });

      let endTime4 = new Date().getTime()
      console.info('appInfoTest xts filterTest01 endTime:' + endTime4 + "us")
      let averageTime4 = endTime4 - startTime4
      console.info('appInfoTest xts filterTest01 averageTime:' + averageTime4 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        filter(users, (o: User) => {
          return !o.active;
        });
      }
      endTime(startTime, 'filterTest01');
      expect(JSON.stringify(filterObject)).assertEqual('[{"user":"fred","age":40,"active":false}]')
    })


    it('filterTest02', 0, () => {
      let startTime5 = new Date().getTime()
      console.info('appInfoTest xts filterTest02 startTime:' + startTime5 + "us")
      let users: User[] = [

        {
          user: 'barney', age: 36, active: true
        },

        {
          user: 'fred', age: 40, active: false
        }

      ];

      let filterObject: object = filter(users, {
        'age': 36, 'active': true
      });

      let endTime5 = new Date().getTime()
      console.info('appInfoTest xts filterTest02 endTime:' + endTime5 + "us")
      let averageTime5 = endTime5 - startTime5
      console.info('appInfoTest xts filterTest02 averageTime:' + averageTime5 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        filter(users, {
          'age': 36, 'active': true
        });
      }
      endTime(startTime, 'filterTest02');
      expect(JSON.stringify(filterObject)).assertEqual('[{"user":"barney","age":36,"active":true}]')
    })


    it('findTest01', 0, () => {
      let startTime6 = new Date().getTime()
      console.info('appInfoTest xts findTest01 startTime:' + startTime6 + "us")
      let users: User[] = [

        {
          user: 'barney', age: 36, active: true
        },

        {
          user: 'fred', age: 40, active: false
        },

        {
          user: 'pebbles', age: 1, active: true
        }

      ];

      let findObject: object = find(users, (o: User) => {
        return o.age < 40;
      });

      let endTime6 = new Date().getTime()
      console.info('appInfoTest xts findTest01 endTime:' + endTime6 + "us")
      let averageTime6 = endTime6 - startTime6
      console.info('appInfoTest xts findTest01 averageTime:' + averageTime6 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        find(users, (o: User) => {
          return o.age < 40;
        });
      }
      endTime(startTime, 'findTest01');
      expect(JSON.stringify(findObject)).assertEqual('{"user":"barney","age":36,"active":true}')
    })


    it('findTest02', 0, () => {
      let startTime7 = new Date().getTime()
      console.info('appInfoTest xts findTest02 startTime:' + startTime7 + "us")
      let users: User[] = [

        {
          user: 'barney', age: 36, active: true
        },

        {
          user: 'fred', age: 40, active: false
        },

        {
          user: 'pebbles', age: 1, active: true
        }

      ];

      let findObject: object = find(users, ['active', false]);

      let endTime7 = new Date().getTime()
      console.info('appInfoTest xts findTest02 endTime:' + endTime7 + "us")
      let averageTime7 = endTime7 - startTime7
      console.info('appInfoTest xts findTest02 averageTime:' + averageTime7 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        find(users, ['active', false]);
      }
      endTime(startTime, 'findTest02');
      expect(JSON.stringify(findObject)).assertEqual('{"user":"fred","age":40,"active":false}')
    })


    it('findLastTest01', 0, () => {
      let startTime8 = new Date().getTime()
      console.info('appInfoTest xts findLastTest01 startTime:' + startTime8 + "us")
      let findLastObject: number = findLast([1, 2, 3, 4], (n: number) => {

        return n % 2 == 1;

      });

      let endTime8 = new Date().getTime()
      console.info('appInfoTest xts findLastTest01 endTime:' + endTime8 + "us")
      let averageTime8 = endTime8 - startTime8
      console.info('appInfoTest xts findLastTest01 averageTime:' + averageTime8 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        findLast([1, 2, 3, 4], (n: number) => {
          return n % 2 == 1;
        });
      }
      endTime(startTime, 'findLastTest01');
      expect(findLastObject).assertEqual(3)
    })


    it('findLastTest02', 0, () => {
      let startTime9 = new Date().getTime()
      console.info('appInfoTest xts findLastTest02 startTime:' + startTime9 + "us")
      let findLastObject: number = findLast([6, 5, 6, 8, 4, 88, 23, 25, 48], (n: number) => {

        return n % 2 == 0;

      });

      let endTime9 = new Date().getTime()
      console.info('appInfoTest xts findLastTest02 endTime:' + endTime9 + "us")
      let averageTime9 = endTime9 - startTime9
      console.info('appInfoTest xts findLastTest02 averageTime:' + averageTime9 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        findLast([6, 5, 6, 8, 4, 88, 23, 25, 48], (n: number) => {
          return n % 2 == 0;
        })
      }
      endTime(startTime, 'findLastTest02');
      expect(findLastObject).assertEqual(48)
    })


    it('flatMapTest01', 0, () => {
      let startTime10 = new Date().getTime()
      console.info('appInfoTest xts flatMapTest01 startTime:' + startTime10 + "us")
      let duplicate: (n: number) => void = (n: number): number[] => {

        return [n, n];

      }

      let flatMapObject: number[] = flatMap([1, 2], duplicate);

      let endTime10 = new Date().getTime()
      console.info('appInfoTest xts flatMapTest01 endTime:' + endTime10 + "us")
      let averageTime10 = endTime10 - startTime10
      console.info('appInfoTest xts flatMapTest01 averageTime:' + averageTime10 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        flatMap([1, 2], duplicate);
      }
      endTime(startTime, 'flatMapTest01');
      expect(JSON.stringify(flatMapObject)).assertEqual('[1,1,2,2]')
    })


    it('flatMapTest02', 0, () => {
      let startTime11 = new Date().getTime()
      console.info('appInfoTest xts flatMapTest02 startTime:' + startTime11 + "us")
      let duplicate: (n: number) => void = (n: number): number[] => {

        return [n, n];

      }

      let flatMapObject: number[] = flatMap([43, 62], duplicate);

      let endTime11 = new Date().getTime()
      console.info('appInfoTest xts flatMapTest02 endTime:' + endTime11 + "us")
      let averageTime11 = endTime11 - startTime11
      console.info('appInfoTest xts flatMapTest02 averageTime:' + averageTime11 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        flatMap([43, 62], duplicate);
      }
      endTime(startTime, 'flatMapTest02');
      expect(JSON.stringify(flatMapObject)).assertEqual('[43,43,62,62]')
    })


    it('flatMapDeepTest01', 0, () => {
      let startTime12 = new Date().getTime()
      console.info('appInfoTest xts flatMapDeepTest01 startTime:' + startTime12 + "us")
      let duplicate: (n: number) => void = (n: number): [[number, number]][] => {

        return [[[n, n]]];

      }

      let flatMapDeepObject: number[] = flatMapDeep([1, 2], duplicate);

      let endTime12 = new Date().getTime()
      console.info('appInfoTest xts flatMapDeepTest01 endTime:' + endTime12 + "us")
      let averageTime12 = endTime12 - startTime12
      console.info('appInfoTest xts flatMapDeepTest01 averageTime:' + averageTime12 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        flatMapDeep([1, 2], duplicate);
      }
      endTime(startTime, 'flatMapDeepTest01');
      expect(JSON.stringify(flatMapDeepObject)).assertEqual('[1,1,2,2]')
    })


    it('flatMapDeepTest02', 0, () => {
      let startTime13 = new Date().getTime()
      console.info('appInfoTest xts flatMapDeepTest02 startTime:' + startTime13 + "us")
      let duplicate: (n: number) => void = (n: number): [[number, number]][] => {

        return [[[n, n]]];

      }

      let flatMapDeepObject: number[] = flatMapDeep([87, 72], duplicate);

      let endTime13 = new Date().getTime()
      console.info('appInfoTest xts flatMapDeepTest02 endTime:' + endTime13 + "us")
      let averageTime13 = endTime13 - startTime13
      console.info('appInfoTest xts flatMapDeepTest02 averageTime:' + averageTime13 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        flatMapDeep([87, 72], duplicate);
      }
      endTime(startTime, 'flatMapDeepTest02');
      expect(JSON.stringify(flatMapDeepObject)).assertEqual('[87,87,72,72]')
    })


    it('flatMapDepthTest01', 0, () => {
      let startTime14 = new Date().getTime()
      console.info('appInfoTest xts flatMapDepthTest01 startTime:' + startTime14 + "us")
      let duplicate: (n: number) => void = (n: number): [[number, number]][] => {

        return [[[n, n]]];

      }

      let flatMapDepthObject: number[] = flatMapDepth([1, 2], duplicate, 2);

      let endTime14 = new Date().getTime()
      console.info('appInfoTest xts flatMapDepthTest01 endTime:' + endTime14 + "us")
      let averageTime14 = endTime14 - startTime14
      console.info('appInfoTest xts flatMapDepthTest01 averageTime:' + averageTime14 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        flatMapDepth([1, 2], duplicate, 2);
      }
      endTime(startTime, 'flatMapDepthTest01');
      expect(JSON.stringify(flatMapDepthObject)).assertEqual('[[1,1],[2,2]]')
    })


    it('flatMapDepthTest02', 0, () => {
      let startTime15 = new Date().getTime()
      console.info('appInfoTest xts flatMapDepthTest02 startTime:' + startTime15 + "us")
      let duplicate: (n: number) => void = (n: number): [[number, number]][] => {

        return [[[n, n]]];

      }

      let flatMapDepthObject: number[] = flatMapDepth([23, 8], duplicate, 3);

      let endTime15 = new Date().getTime()
      console.info('appInfoTest xts flatMapDepthTest02 endTime:' + endTime15 + "us")
      let averageTime15 = endTime15 - startTime15
      console.info('appInfoTest xts flatMapDepthTest02 averageTime:' + averageTime15 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        flatMapDepth([23, 8], duplicate, 3);
      }
      endTime(startTime, 'flatMapDepthTest02');
      expect(JSON.stringify(flatMapDepthObject)).assertEqual('[23,23,8,8]')
    })


    it('groupByTest01', 0, () => {
      let startTime16 = new Date().getTime()
      console.info('appInfoTest xts groupByTest01 startTime:' + startTime16 + "us")
      let groupByObject: object = groupBy([6.1, 4.2, 6.3], Math.floor);

      let endTime16 = new Date().getTime()
      console.info('appInfoTest xts groupByTest01 endTime:' + endTime16 + "us")
      let averageTime16 = endTime16 - startTime16
      console.info('appInfoTest xts groupByTest01 averageTime:' + averageTime16 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        groupBy([6.1, 4.2, 6.3], Math.floor);
      }
      endTime(startTime, 'groupByTest01');
      expect(JSON.stringify(groupByObject)).assertEqual('{"4":[4.2],"6":[6.1,6.3]}')
    })


    it('groupByTest02', 0, () => {
      let startTime17 = new Date().getTime()
      console.info('appInfoTest xts groupByTest02 startTime:' + startTime17 + "us")
      let groupByObject: object = groupBy(['one', 'two', 'three'], 'length');

      let endTime17 = new Date().getTime()
      console.info('appInfoTest xts groupByTest02 endTime:' + endTime17 + "us")
      let averageTime17 = endTime17 - startTime17
      console.info('appInfoTest xts groupByTest02 averageTime:' + averageTime17 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        groupBy(['one', 'two', 'three'], 'length');
      }
      endTime(startTime, 'groupByTest02');
      expect(JSON.stringify(groupByObject)).assertEqual('{"3":["one","two"],"5":["three"]}')
    })


    it('includesTest01', 0, () => {
      let startTime18 = new Date().getTime()
      console.info('appInfoTest xts includesTest01 startTime:' + startTime18 + "us")
      let includesObject: boolean = includes([1, 2, 3], 1);

      let endTime18 = new Date().getTime()
      console.info('appInfoTest xts includesTest01 endTime:' + endTime18 + "us")
      let averageTime18 = endTime18 - startTime18
      console.info('appInfoTest xts includesTest01 averageTime:' + averageTime18 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        includes([1, 2, 3], 1);
      }
      endTime(startTime, 'includesTest01');
      expect(includesObject).assertTrue();
    })


    it('includesTest02', 0, () => {
      let startTime19 = new Date().getTime()
      console.info('appInfoTest xts includesTest02 startTime:' + startTime19 + "us")
      let includesObject: boolean = includes([1, 2, 3], 1, 2);

      let endTime19 = new Date().getTime()
      console.info('appInfoTest xts includesTest02 endTime:' + endTime19 + "us")
      let averageTime19 = endTime19 - startTime19
      console.info('appInfoTest xts includesTest02 averageTime:' + averageTime19 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        includes([1, 2, 3], 1, 2);
      }
      endTime(startTime, 'includesTest02');
      expect(includesObject).assertFalse();
    })


    it('invokeMapTest01', 0, () => {
      let startTime20 = new Date().getTime()
      console.info('appInfoTest xts invokeMapTest01 startTime:' + startTime20 + "us")
      let invokeMapObject: number[][] = invokeMap([123, 456], '');

      let endTime20 = new Date().getTime()
      console.info('appInfoTest xts invokeMapTest01 endTime:' + endTime20 + "us")
      let averageTime20 = endTime20 - startTime20
      console.info('appInfoTest xts invokeMapTest01 averageTime:' + averageTime20 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        invokeMap([123, 456], '');
      }
      endTime(startTime, 'invokeMapTest01');
      expect(JSON.stringify(invokeMapObject)).assertEqual('[null,null]');
    })


    it('invokeMapTest02', 0, () => {
      let startTime21 = new Date().getTime()
      console.info('appInfoTest xts invokeMapTest02 startTime:' + startTime21 + "us")
      let invokeMapObject: number[][] = invokeMap([[5, 1, 7], [3, 2, 1]], 'sort');

      let endTime21 = new Date().getTime()
      console.info('appInfoTest xts invokeMapTest02 endTime:' + endTime21 + "us")
      let averageTime21 = endTime21 - startTime21
      console.info('appInfoTest xts invokeMapTest02 averageTime:' + averageTime21 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        invokeMap([[5, 1, 7], [3, 2, 1]], 'sort');
      }
      endTime(startTime, 'invokeMapTest02');
      expect(JSON.stringify(invokeMapObject)).assertEqual('[[1,5,7],[1,2,3]]');
    })


    it('keyByTest01', 0, () => {
      let startTime22 = new Date().getTime()
      console.info('appInfoTest xts keyByTest01 startTime:' + startTime22 + "us")
      let array: Array[] = [

        {
          dir: 'left', code: 97
        },

        {
          dir: 'right', code: 100
        }

      ];

      let keyByObject: object = keyBy(array, (o: Array) => {

        return String.fromCharCode(o.code);

      });

      let endTime22 = new Date().getTime()
      console.info('appInfoTest xts keyByTest01 endTime:' + endTime22 + "us")
      let averageTime22 = endTime22 - startTime22
      console.info('appInfoTest xts keyByTest01 averageTime:' + averageTime22 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        keyBy(array, (o: Array) => {
          return String.fromCharCode(o.code);
        });
      }
      endTime(startTime, 'keyByTest01');
      expect(JSON.stringify(keyByObject)).assertEqual('{"a":{"dir":"left","code":97},"d":{"dir":"right","code":100}}');
    })


    it('keyByTest02', 0, () => {
      let startTime23 = new Date().getTime()
      console.info('appInfoTest xts keyByTest02 startTime:' + startTime23 + "us")
      let array: Array[] = [

        {
          dir: 'left', code: 97
        },

        {
          dir: 'right', code: 100
        }

      ];

      let keyByObject: object = keyBy(array, 'dir');

      let endTime23 = new Date().getTime()
      console.info('appInfoTest xts keyByTest02 endTime:' + endTime23 + "us")
      let averageTime23 = endTime23 - startTime23
      console.info('appInfoTest xts keyByTest02 averageTime:' + averageTime23 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        keyBy(array, 'dir');
      }
      endTime(startTime, 'keyByTest02');
      expect(JSON.stringify(keyByObject))
        .assertEqual('{"left":{"dir":"left","code":97},"right":{"dir":"right","code":100}}');
    })


    it('mapTest01', 0, () => {
      let startTime24 = new Date().getTime()
      console.info('appInfoTest xts mapTest01 startTime:' + startTime24 + "us")
      let square: (n: number) => void = (n: number): number => {

        return n * n;

      }

      let mapObject: number[] = map([4, 8], square);

      let endTime24 = new Date().getTime()
      console.info('appInfoTest xts mapTest01 endTime:' + endTime24 + "us")
      let averageTime24 = endTime24 - startTime24
      console.info('appInfoTest xts mapTest01 averageTime:' + averageTime24 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        map([4, 8], square);
      }
      endTime(startTime, 'mapTest01');
      expect(JSON.stringify(mapObject)).assertEqual('[16,64]');
    })


    it('mapTest02', 0, () => {
      let startTime25 = new Date().getTime()
      console.info('appInfoTest xts mapTest02 startTime:' + startTime25 + "us")
      let users: Users[] = [

        {
          user: 'barney'
        },

        {
          user: 'fred'
        }

      ];

      let mapObject: string[] = map(users, 'user');

      let endTime25 = new Date().getTime()
      console.info('appInfoTest xts mapTest02 endTime:' + endTime25 + "us")
      let averageTime25 = endTime25 - startTime25
      console.info('appInfoTest xts mapTest02 averageTime:' + averageTime25 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        map(users, 'user');
      }
      endTime(startTime, 'mapTest02');
      expect(JSON.stringify(mapObject)).assertEqual('["barney","fred"]');
    })


    it('orderByTest01', 0, () => {
      let startTime26 = new Date().getTime()
      console.info('appInfoTest xts orderByTest01 startTime:' + startTime26 + "us")
      let users: Age[] = [

        {
          user: 'fred', age: 48
        },

        {
          user: 'barney', age: 34
        },

        {
          user: 'fred', age: 40
        },

        {
          user: 'barney', age: 36
        }

      ];

      let orderByObject: object = orderBy(users, ['user', 'age'], ['asc', 'desc']);

      let endTime26 = new Date().getTime()
      console.info('appInfoTest xts orderByTest01 endTime:' + endTime26 + "us")
      let averageTime26 = endTime26 - startTime26
      console.info('appInfoTest xts orderByTest01 averageTime:' + averageTime26 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        orderBy(users, ['user', 'age'], ['asc', 'desc']);
      }
      endTime(startTime, 'orderByTest01');
      expect(JSON.stringify(orderByObject))
        .assertEqual('[{"user":"barney","age":36},{"user":"barney","age":34},{"user":"fred","age":48},{"user":"fred","age":40}]');
    })


    it('orderByTest02', 0, () => {
      let startTime27 = new Date().getTime()
      console.info('appInfoTest xts orderByTest02 startTime:' + startTime27 + "us")
      let users: Emp[] = [

        {
          employee: 'hunny', salary: 60000
        },

        {
          employee: 'munny', salary: 40000
        },

        {
          employee: 'hunny', salary: 55000
        },

        {
          employee: 'munny', salary: 36000
        }

      ];

      let orderByObject: object = orderBy(users, ['employee',

        'salary'], ['asc', 'desc']);

      let endTime27 = new Date().getTime()
      console.info('appInfoTest xts orderByTest02 endTime:' + endTime27 + "us")
      let averageTime27 = endTime27 - startTime27
      console.info('appInfoTest xts orderByTest02 averageTime:' + averageTime27 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        orderBy(users, ['employee', 'salary'], ['asc', 'desc']);
      }
      endTime(startTime, 'orderByTest02');
      expect(JSON.stringify(orderByObject))
        .assertEqual('[{"employee":"hunny","salary":60000},{"employee":"hunny","salary":55000},{"employee":"munny","salary":40000},{"employee":"munny","salary":36000}]');
    })


    it('partitionTest01', 0, () => {
      let startTime28 = new Date().getTime()
      console.info('appInfoTest xts partitionTest01 startTime:' + startTime28 + "us")
      let users: User[] = [

        {
          user: 'barney', age: 36, active: false
        },

        {
          user: 'fred', age: 40, active: true
        },

        {
          user: 'pebbles', age: 1, active: false
        }

      ];

      let partitionObject: object = partition(users, (o: User) => {
        return o.active;
      });

      let endTime28 = new Date().getTime()
      console.info('appInfoTest xts partitionTest01 endTime:' + endTime28 + "us")
      let averageTime28 = endTime28 - startTime28
      console.info('appInfoTest xts partitionTest01 averageTime:' + averageTime28 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        partition(users, (o: User) => {
          return o.active;
        });
      }
      endTime(startTime, 'partitionTest01');
      expect(JSON.stringify(partitionObject))
        .assertEqual('[[{"user":"fred","age":40,"active":true}],[{"user":"barney","age":36,"active":false},{"user":"pebbles","age":1,"active":false}]]');
    })


    it('partitionTest02', 0, () => {
      let startTime29 = new Date().getTime()
      console.info('appInfoTest xts partitionTest02 startTime:' + startTime29 + "us")
      let users: User[] = [

        {
          user: 'barney', age: 36, active: false
        },

        {
          user: 'fred', age: 40, active: true
        },

        {
          user: 'pebbles', age: 1, active: false
        }

      ];

      let partitionObject: object = partition(users, ['active', false]);

      let endTime29 = new Date().getTime()
      console.info('appInfoTest xts partitionTest02 endTime:' + endTime29 + "us")
      let averageTime29 = endTime29 - startTime29
      console.info('appInfoTest xts partitionTest02 averageTime:' + averageTime29 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        partition(users, ['active', false]);
      }
      endTime(startTime, 'partitionTest02');
      expect(JSON.stringify(partitionObject))
        .assertEqual('[[{"user":"barney","age":36,"active":false},{"user":"pebbles","age":1,"active":false}],[{"user":"fred","age":40,"active":true}]]');
    })


    it('reduceTest01', 0, () => {
      let startTime30 = new Date().getTime()
      console.info('appInfoTest xts reduceTest01 startTime:' + startTime30 + "us")
      let reduceObject: number = reduce([1, 2], (sum: number, n: number) => {

        return sum + n;

      }, 0);

      let endTime30 = new Date().getTime()
      console.info('appInfoTest xts reduceTest01 endTime:' + endTime30 + "us")
      let averageTime30 = endTime30 - startTime30
      console.info('appInfoTest xts reduceTest01 averageTime:' + averageTime30 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        reduce([1, 2], (sum: number, n: number) => {
          return sum + n;
        }, 0);
      }
      endTime(startTime, 'reduceTest01');
      expect(reduceObject).assertEqual(3);
    })


    it('reduceTest02', 0, () => {
      let startTime31 = new Date().getTime()
      console.info('appInfoTest xts reduceTest02 startTime:' + startTime31 + "us")
      let reduceObject: object = reduce({
        'a': 1, 'b': 2, 'c': 1
      }, (result: object, value: string, key: number) => {

        (result[value] || (result[value] = [])).push(key);

        return result;

      }, {});

      let endTime31 = new Date().getTime()
      console.info('appInfoTest xts reduceTest02 endTime:' + endTime31 + "us")
      let averageTime31 = endTime31 - startTime31
      console.info('appInfoTest xts reduceTest02 averageTime:' + averageTime31 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        reduce({
          'a': 1, 'b': 2, 'c': 1
        }, (result: object, value: string, key: number) => {
          (result[value] || (result[value] = [])).push(key);
          return result;
        }, {});
      }
      endTime(startTime, 'reduceTest02');
      expect(JSON.stringify(reduceObject)).assertEqual('{"1":["a","c"],"2":["b"]}');
    })


    it('reduceRightTest01', 0, () => {
      let startTime32 = new Date().getTime()
      console.info('appInfoTest xts reduceRightTest01 startTime:' + startTime32 + "us")
      let array = [[0, 1], [2, 3], [4, 5]];

      let reduceRightObject: number[][] = reduceRight(array, (flattened: number[], other: number[]) => {

        return flattened.concat(other);

      }, []);

      let endTime32 = new Date().getTime()
      console.info('appInfoTest xts reduceRightTest01 endTime:' + endTime32 + "us")
      let averageTime32 = endTime32 - startTime32
      console.info('appInfoTest xts reduceRightTest01 averageTime:' + averageTime32 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        reduceRight(array, (flattened: number[], other: number[]) => {
          return flattened.concat(other);
        }, []);
      }
      endTime(startTime, 'reduceRightTest01');
      expect(JSON.stringify(reduceRightObject)).assertEqual('[4,5,2,3,0,1]');
    })


    it('reduceRightTest02', 0, () => {
      let startTime33 = new Date().getTime()
      console.info('appInfoTest xts reduceRightTest02 startTime:' + startTime33 + "us")
      let array = [[54, 45, 1], [12, 33, 8], [4, 35, 7]];

      let reduceRightObject: number[] = reduceRight(array, (flattened: number[], other: number[]) => {

        return flattened.concat(other);

      }, []);

      let endTime33 = new Date().getTime()
      console.info('appInfoTest xts reduceRightTest02 endTime:' + endTime33 + "us")
      let averageTime33 = endTime33 - startTime33
      console.info('appInfoTest xts reduceRightTest02 averageTime:' + averageTime33 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        reduceRight(array, (flattened: number[], other: number[]) => {
          return flattened.concat(other);
        }, []);
      }
      endTime(startTime, 'reduceRightTest02');
      expect(JSON.stringify(reduceRightObject)).assertEqual('[4,35,7,12,33,8,54,45,1]');
    })


    it('rejectTest01', 0, () => {
      let startTime34 = new Date().getTime()
      console.info('appInfoTest xts rejectTest01 startTime:' + startTime34 + "us")
      let users: User[] = [

        {
          user: 'barney', age: 36, active: false
        },

        {
          user: 'fred', age: 40, active: true
        }

      ];

      let rejectObject: object = reject(users, (o: User) => {
        return !o.active;
      });

      let endTime34 = new Date().getTime()
      console.info('appInfoTest xts rejectTest01 endTime:' + endTime34 + "us")
      let averageTime34 = endTime34 - startTime34
      console.info('appInfoTest xts rejectTest01 averageTime:' + averageTime34 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        reject(users, (o: User) => {
          return !o.active;
        });
      }
      endTime(startTime, 'rejectTest01');
      expect(JSON.stringify(rejectObject)).assertEqual('[{"user":"fred","age":40,"active":true}]');
    })


    it('rejectTest02', 0, () => {
      let startTime35 = new Date().getTime()
      console.info('appInfoTest xts rejectTest02 startTime:' + startTime35 + "us")
      let users: User[] = [

        {
          user: 'barney', age: 36, active: false
        },

        {
          user: 'fred', age: 40, active: true
        }

      ];

      let rejectObject: object = reject(users, 'active');

      let endTime35 = new Date().getTime()
      console.info('appInfoTest xts rejectTest02 endTime:' + endTime35 + "us")
      let averageTime35 = endTime35 - startTime35
      console.info('appInfoTest xts rejectTest02 averageTime:' + averageTime35 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        reject(users, 'active');
      }
      endTime(startTime, 'rejectTest02');
      expect(JSON.stringify(rejectObject)).assertEqual('[{"user":"barney","age":36,"active":false}]');
    })


    it('sizeTest01', 0, () => {
      let startTime36 = new Date().getTime()
      console.info('appInfoTest xts sizeTest01 startTime:' + startTime36 + "us")
      let sizeObject: number = size([1, 2, 3]);

      let endTime36 = new Date().getTime()
      console.info('appInfoTest xts sizeTest01 endTime:' + endTime36 + "us")
      let averageTime36 = endTime36 - startTime36
      console.info('appInfoTest xts sizeTest01 averageTime:' + averageTime36 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        size([1, 2, 3]);
      }
      endTime(startTime, 'sizeTest01');
      expect(sizeObject).assertEqual(3);
    })


    it('sizeTest02', 0, () => {
      let startTime37 = new Date().getTime()
      console.info('appInfoTest xts sizeTest02 startTime:' + startTime37 + "us")
      let sizeObject: number = size({
        'a': 1, 'b': 2
      });

      let endTime37 = new Date().getTime()
      console.info('appInfoTest xts sizeTest02 endTime:' + endTime37 + "us")
      let averageTime37 = endTime37 - startTime37
      console.info('appInfoTest xts sizeTest02 averageTime:' + averageTime37 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        size({
          'a': 1, 'b': 2
        });
      }
      endTime(startTime, 'sizeTest02');
      expect(sizeObject).assertEqual(2);
    })


    it('someTest01', 0, () => {
      let startTime38 = new Date().getTime()
      console.info('appInfoTest xts someTest01 startTime:' + startTime38 + "us")
      let someObject: boolean = some([null, 0, 'yes', false], Boolean);

      let endTime38 = new Date().getTime()
      console.info('appInfoTest xts someTest01 endTime:' + endTime38 + "us")
      let averageTime38 = endTime38 - startTime38
      console.info('appInfoTest xts someTest01 averageTime:' + averageTime38 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        some([null, 0, 'yes', false], Boolean);
      }
      endTime(startTime, 'someTest01');
      expect(someObject).assertTrue();
    })


    it('someTest02', 0, () => {
      let startTime39 = new Date().getTime()
      console.info('appInfoTest xts someTest02 startTime:' + startTime39 + "us")
      let users: Active[] = [

        {
          user: 'barney', active: true
        },

        {
          user: 'fred', active: false
        }

      ];

      let someObject: boolean = some(users, {
        'user': 'barney', 'active': false
      });

      let endTime39 = new Date().getTime()
      console.info('appInfoTest xts someTest02 endTime:' + endTime39 + "us")
      let averageTime39 = endTime39 - startTime39
      console.info('appInfoTest xts someTest02 averageTime:' + averageTime39 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        some(users, {
          'user': 'barney', 'active': false
        });
      }
      endTime(startTime, 'someTest02');
      expect(someObject).assertFalse();
    })


    it('sortByTest01', 0, () => {
      let startTime40 = new Date().getTime()
      console.info('appInfoTest xts sortByTest01 startTime:' + startTime40 + "us")
      let users: Age[] = [

        {
          user: 'fred', age: 48
        },

        {
          user: 'barney', age: 36
        },

        {
          user: 'fred', age: 40
        },

        {
          user: 'barney', age: 34
        }

      ];

      let sortByObject: object = sortBy(users, (o: Age) => {
        return o.user;
      });

      let endTime40 = new Date().getTime()
      console.info('appInfoTest xts sortByTest01 endTime:' + endTime40 + "us")
      let averageTime40 = endTime40 - startTime40
      console.info('appInfoTest xts sortByTest01 averageTime:' + averageTime40 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        sortBy(users, (o: Age) => {
          return o.user;
        });
      }
      endTime(startTime, 'sortByTest01');
      expect(JSON.stringify(sortByObject))
        .assertEqual('[{"user":"barney","age":36},{"user":"barney","age":34},{"user":"fred","age":48},{"user":"fred","age":40}]');
    })


    it('sortByTest02', 0, () => {
      let startTime41 = new Date().getTime()
      console.info('appInfoTest xts sortByTest02 startTime:' + startTime41 + "us")
      let users: Age[] = [
        {
          user: 'fred', age: 48
        },
        {
          user: 'barney', age: 36
        },
        {
          user: 'fred', age: 40
        },
        {
          user: 'barney', age: 34
        }
      ];
      let sortByObject: object = sortBy(users, 'user', (o: Age) => {
        return Math.floor(o.age / 10);
      });
      let endTime41 = new Date().getTime()
      console.info('appInfoTest xts sortByTest02 endTime:' + endTime41 + "us")
      let averageTime41 = endTime41 - startTime41
      console.info('appInfoTest xts sortByTest02 averageTime:' + averageTime41 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        sortBy(users, 'user', (o: Age) => {
          return Math.floor(o.age / 10);
        });
      }
      endTime(startTime, 'sortByTest02');
      expect(JSON.stringify(sortByObject))
        .assertEqual('[{"user":"barney","age":36},{"user":"barney","age":34},{"user":"fred","age":48},{"user":"fred","age":40}]');
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