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
  chunk, compact, concat, difference, differenceBy, differenceWith, drop,
  dropRightWhile,
  dropWhile,
  fill,
  findIndex,
  findLastIndex,
  head,
  indexOf,
  initial,
  intersection,
  intersectionBy,
  intersectionWith,
  isEqual,
  join,
  last,
  lastIndexOf,
  nth,
  pull,
  pullAll,
  pullAllBy,
  pullAllWith,
  pullAt,
  remove,
  reverse,
  slice,
  sortedIndex,
  sortedIndexBy,
  sortedIndexOf,
  sortedLastIndex,
  sortedLastIndexBy,
  sortedLastIndexOf,
  sortedUniq,
  sortedUniqBy,
  tail,
  take,
  takeRight,
  takeRightWhile,
  takeWhile,
  union,
  unionWith,
  uniq,
  unzip,
  without,
  xor,
  xorBy,
  xorWith,
  zip,
  zipObject,
  zipObjectDeep,
  zipWith
} from 'lodash';

const BASE_COUNT: number = 2000;

export default function arrayTest() {
  describe('ArrayTest', () => {
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
    class XY {
      x: number = 0
      y: number = 0
    }

    class AB {
      a: number = 0
      b: number = 0
    }

    class CD {
      c: number = 0
      d: number = 0
    }

    class X {
      x: number = 0
    }
    class Y {
      y: number = 0
    }

    class B {
      b: number = 0
    }

    class C {
      c: number = 0
    }

    class User{
      user: string = ''
      active: boolean = true
    }

    it('chunkTest01', 0, () => {
      let startTime0 = new Date().getTime()
      console.info('appInfoTest xts chunkTest01 startTime:' + startTime0 + "us")
      let chunkArray: number[] = chunk(['a', 'b', 'c', 'd'], 2);

      let endTime0 = new Date().getTime()
      console.info('appInfoTest xts chunkTest01 endTime:' + endTime0 + "us")
      let averageTime0 = endTime0 - startTime0
      console.info('appInfoTest xts chunkTest01 averageTime:' + averageTime0 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        chunk(['a', 'b', 'c', 'd'], 2);
      }
      endTime(startTime, 'chunkTest01');
      expect(JSON.stringify(chunkArray)).assertEqual('[["a","b"],["c","d"]]')
    })


    it('chunkTest02', 0, () => {
      let startTime1 = new Date().getTime()
      console.info('appInfoTest xts chunkTest02 startTime:' + startTime1 + "us")
      let chunkArray: number[] = chunk(['a', 'b', 'c', 'd'], 3);

      let endTime1 = new Date().getTime()
      console.info('appInfoTest xts chunkTest02 endTime:' + endTime1 + "us")
      let averageTime1 = endTime1 - startTime1
      console.info('appInfoTest xts chunkTest02 averageTime:' + averageTime1 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        chunk(['a', 'b', 'c', 'd'], 3);
      }
      endTime(startTime, 'chunkTest02');
      expect(JSON.stringify(chunkArray)).assertEqual('[["a","b","c"],["d"]]')
    })


    it('compactTest01', 0, () => {
      let startTime2 = new Date().getTime()
      console.info('appInfoTest xts compactTest01 startTime:' + startTime2 + "us")
      let compactArray: number[] = compact([0, 1, false, 2, '', 3]);

      let endTime2 = new Date().getTime()
      console.info('appInfoTest xts compactTest01 endTime:' + endTime2 + "us")
      let averageTime2 = endTime2 - startTime2
      console.info('appInfoTest xts compactTest01 averageTime:' + averageTime2 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        compact([0, 1, false, 2, '', 3]);
      }
      endTime(startTime, 'compactTest01');
      expect(JSON.stringify(compactArray)).assertEqual('[1,2,3]')
    })


    it('compactTest02', 0, () => {
      let startTime3 = new Date().getTime()
      console.info('appInfoTest xts compactTest02 startTime:' + startTime3 + "us")
      let compactArray: number[] = compact([0, 1, false, 2, '', null, 0]);

      let endTime3 = new Date().getTime()
      console.info('appInfoTest xts compactTest02 endTime:' + endTime3 + "us")
      let averageTime3 = endTime3 - startTime3
      console.info('appInfoTest xts compactTest02 averageTime:' + averageTime3 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        compact([0, 1, false, 2, '', null, 0]);
      }
      endTime(startTime, 'compactTest02');
      expect(JSON.stringify(compactArray)).assertEqual('[1,2]')
    })


    it('concatTest01', 0, () => {
      let startTime4 = new Date().getTime()
      console.info('appInfoTest xts concatTest01 startTime:' + startTime4 + "us")
      let array: number[] = [1];

      let concatArray: number[] = concat(array, 2, [3], [[4]]);

      let endTime4 = new Date().getTime()
      console.info('appInfoTest xts concatTest01 endTime:' + endTime4 + "us")
      let averageTime4 = endTime4 - startTime4
      console.info('appInfoTest xts concatTest01 averageTime:' + averageTime4 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        concat(array, 2, [3], [[4]]);
      }
      endTime(startTime, 'concatTest01');
      expect(JSON.stringify(concatArray)).assertEqual('[1,2,3,[4]]')
    })


    it('concatTest02', 0, () => {
      let startTime5 = new Date().getTime()
      console.info('appInfoTest xts concatTest02 startTime:' + startTime5 + "us")
      let array = ['a'];

      let concatArray: number[] = concat(array, 'd', [3], [[4], [6]]);

      let endTime5 = new Date().getTime()
      console.info('appInfoTest xts concatTest02 endTime:' + endTime5 + "us")
      let averageTime5 = endTime5 - startTime5
      console.info('appInfoTest xts concatTest02 averageTime:' + averageTime5 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        concat(array, 'd', [3], [[4], [6]]);
      }
      endTime(startTime, 'concatTest02');
      expect(JSON.stringify(concatArray)).assertEqual('["a","d",3,[4],[6]]')
    })


    it('differenceTest01', 0, () => {
      let startTime6 = new Date().getTime()
      console.info('appInfoTest xts differenceTest01 startTime:' + startTime6 + "us")
      let differenceArray: number[] = difference([3, 2, 1], [4, 2]);

      let endTime6 = new Date().getTime()
      console.info('appInfoTest xts differenceTest01 endTime:' + endTime6 + "us")
      let averageTime6 = endTime6 - startTime6
      console.info('appInfoTest xts differenceTest01 averageTime:' + averageTime6 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        difference([3, 2, 1], [4, 2]);
      }
      endTime(startTime, 'differenceTest01');
      expect(JSON.stringify(differenceArray)).assertEqual('[3,1]')
    })


    it('differenceTest02', 0, () => {
      let startTime7 = new Date().getTime()
      console.info('appInfoTest xts differenceTest02 startTime:' + startTime7 + "us")
      let differenceArray: number[] = difference([3, 2, 1, 9, 3], [3, 2]);

      let endTime7 = new Date().getTime()
      console.info('appInfoTest xts differenceTest02 endTime:' + endTime7 + "us")
      let averageTime7 = endTime7 - startTime7
      console.info('appInfoTest xts differenceTest02 averageTime:' + averageTime7 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        difference([3, 2, 1, 9, 3], [3, 2]);
      }
      endTime(startTime, 'differenceTest02');
      expect(JSON.stringify(differenceArray)).assertEqual('[1,9]')
    })


    it('differenceByTest01', 0, () => {
      let startTime8 = new Date().getTime()
      console.info('appInfoTest xts differenceByTest01 startTime:' + startTime8 + "us")
      let differenceByArray: number[] = differenceBy([3.1, 2.2, 1.3], [4.4, 2.5], Math.floor);

      let endTime8 = new Date().getTime()
      console.info('appInfoTest xts differenceByTest01 endTime:' + endTime8 + "us")
      let averageTime8 = endTime8 - startTime8
      console.info('appInfoTest xts differenceByTest01 averageTime:' + averageTime8 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        differenceBy([3.1, 2.2, 1.3], [4.4, 2.5], Math.floor);
      }
      endTime(startTime, 'differenceByTest01');
      expect(JSON.stringify(differenceByArray)).assertEqual('[3.1,1.3]')
    })

    it('differenceByTest02', 0, () => {
      let startTime9 = new Date().getTime()
      console.info('appInfoTest xts differenceByTest02 startTime:' + startTime9 + "us")
      let differenceByArray: number[] = differenceBy([{
        'x': 2
      }, {
        'x': 1
      }], [{
        'x': 1
      }], 'x');

      let endTime9 = new Date().getTime()
      console.info('appInfoTest xts differenceByTest02 endTime:' + endTime9 + "us")
      let averageTime9 = endTime9 - startTime9
      console.info('appInfoTest xts differenceByTest02 averageTime:' + averageTime9 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        differenceBy([{
          'x': 2
        }, {
          'x': 1
        }], [{
          'x': 1
        }], 'x');
      }
      endTime(startTime, 'differenceByTest02');
      expect(JSON.stringify(differenceByArray)).assertEqual('[{"x":2}]')
    })


    it('differenceWithTest01', 0, () => {
      let startTime10 = new Date().getTime()
      console.info('appInfoTest xts differenceWithTest01 startTime:' + startTime10 + "us")
      let objects = [{
        x: 1, y: 2
      } as XY, {
        x: 2, y: 1
      } as XY];

      let differenceWithArray: object = differenceWith(objects, [{
        'x': 1, 'y': 2
      }], isEqual);

      let endTime10 = new Date().getTime()
      console.info('appInfoTest xts differenceWithTest01 endTime:' + endTime10 + "us")
      let averageTime10 = endTime10 - startTime10
      console.info('appInfoTest xts differenceWithTest01 averageTime:' + averageTime10 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        differenceWith(objects, [{
          'x': 1, 'y': 2
        }], isEqual);
      }
      endTime(startTime, 'differenceWithTest01');
      expect(JSON.stringify(differenceWithArray)).assertEqual('[{"x":2,"y":1}]')
    })

    it('differenceWithTest02', 0, () => {
      let startTime11 = new Date().getTime()
      console.info('appInfoTest xts differenceWithTest02 startTime:' + startTime11 + "us")
      let objects = [{
        x: 1, y: 2
      } as XY, {
        c: 2, d: 1
      } as CD, {
        a: 6, b: 7
      } as AB];

      let differenceWithArray: object = differenceWith(objects, [{
        'x': 1, 'y': 2
      }], isEqual);

      let endTime11 = new Date().getTime()
      console.info('appInfoTest xts differenceWithTest02 endTime:' + endTime11 + "us")
      let averageTime11 = endTime11 - startTime11
      console.info('appInfoTest xts differenceWithTest02 averageTime:' + averageTime11 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        differenceWith(objects, [{
          'x': 1, 'y': 2
        }], isEqual);
      }
      endTime(startTime, 'differenceWithTest02');
      expect(JSON.stringify(differenceWithArray)).assertEqual('[{"c":2,"d":1},{"a":6,"b":7}]')
    })


    it('dropTest01', 0, () => {
      let startTime12 = new Date().getTime()
      console.info('appInfoTest xts dropTest01 startTime:' + startTime12 + "us")
      let dropArray: number[] = drop([1, 2, 3]);

      let endTime12 = new Date().getTime()
      console.info('appInfoTest xts dropTest01 endTime:' + endTime12 + "us")
      let averageTime12 = endTime12 - startTime12
      console.info('appInfoTest xts dropTest01 averageTime:' + averageTime12 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        drop([1, 2, 3]);
      }
      endTime(startTime, 'dropTest01');
      expect(JSON.stringify(dropArray)).assertEqual('[2,3]')
    })


    it('dropTest02', 0, () => {
      let startTime13 = new Date().getTime()
      console.info('appInfoTest xts dropTest02 startTime:' + startTime13 + "us")
      let dropArray: number[] = drop([1, 2, 3], 5);

      let endTime13 = new Date().getTime()
      console.info('appInfoTest xts dropTest02 endTime:' + endTime13 + "us")
      let averageTime13 = endTime13 - startTime13
      console.info('appInfoTest xts dropTest02 averageTime:' + averageTime13 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        drop([1, 2, 3], 5);
      }
      endTime(startTime, 'dropTest02');
      expect(JSON.stringify(dropArray)).assertEqual('[]')
    })


    it('dropRightTest01', 0, () => {
      let startTime14 = new Date().getTime()
      console.info('appInfoTest xts dropRightTest01 startTime:' + startTime14 + "us")
      let dropRightArray: number[] = drop([1, 2, 3]);

      let endTime14 = new Date().getTime()
      console.info('appInfoTest xts dropRightTest01 endTime:' + endTime14 + "us")
      let averageTime14 = endTime14 - startTime14
      console.info('appInfoTest xts dropRightTest01 averageTime:' + averageTime14 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        drop([1, 2, 3]);
      }
      endTime(startTime, 'dropRightTest01');
      expect(JSON.stringify(dropRightArray)).assertEqual('[2,3]')
    })


    it('dropRightTest02', 0, () => {
      let startTime15 = new Date().getTime()
      console.info('appInfoTest xts dropRightTest02 startTime:' + startTime15 + "us")
      let dropRightArray: number[] = drop([0, 1, 2, 3, 9, 10], 2);

      let endTime15 = new Date().getTime()
      console.info('appInfoTest xts dropRightTest02 endTime:' + endTime15 + "us")
      let averageTime15 = endTime15 - startTime15
      console.info('appInfoTest xts dropRightTest02 averageTime:' + averageTime15 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        drop([0, 1, 2, 3, 9, 10], 2);
      }
      endTime(startTime, 'dropRightTest02');
      expect(JSON.stringify(dropRightArray)).assertEqual('[2,3,9,10]')
    })


    it('dropRightWhileTest01', 0, () => {
      let startTime16 = new Date().getTime()
      console.info('appInfoTest xts dropRightWhileTest01 startTime:' + startTime16 + "us")
      let users: User[] = [
        {
          user: 'barney', active: true
        },
        {
          user: 'fred', active: false
        },
        {
          user: 'pebbles', active: false
        }
      ];
      let dropRightWhileArray: number[] = dropRightWhile(users, (o: User) => {
        return !o.active;
      });

      let endTime16 = new Date().getTime()
      console.info('appInfoTest xts dropRightWhileTest01 endTime:' + endTime16 + "us")
      let averageTime16 = endTime16 - startTime16
      console.info('appInfoTest xts dropRightWhileTest01 averageTime:' + averageTime16 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        dropRightWhile(users, (o: User) => {
          return !o.active;
        });
      }
      endTime(startTime, 'dropRightWhileTest01');
      expect(JSON.stringify(dropRightWhileArray)).assertEqual('[{"user":"barney","active":true}]')
    })


    it('dropRightWhileTest02', 0, () => {
      let startTime17 = new Date().getTime()
      console.info('appInfoTest xts dropRightWhileTest02 startTime:' + startTime17 + "us")
      let users: User[] = [

        {
          user: 'barney', active: true
        },

        {
          user: 'fred', active: false
        },

        {
          user: 'pebbles', active: false
        }

      ];

      let dropRightWhileArray: number[] = dropRightWhile(users, {
        'user': 'pebbles', 'active': false
      });

      let endTime17 = new Date().getTime()
      console.info('appInfoTest xts dropRightWhileTest02 endTime:' + endTime17 + "us")
      let averageTime17 = endTime17 - startTime17
      console.info('appInfoTest xts dropRightWhileTest02 averageTime:' + averageTime17 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        dropRightWhile(users, {
          'user': 'pebbles', 'active': false
        });
      }
      endTime(startTime, 'dropRightWhileTest02');
      expect(JSON.stringify(dropRightWhileArray))
        .assertEqual('[{"user":"barney","active":true},{"user":"fred","active":false}]')
    })


    it('dropWhileTest01', 0, () => {
      let startTime18 = new Date().getTime()
      console.info('appInfoTest xts dropWhileTest01 startTime:' + startTime18 + "us")
      let users: User[] = [

        {
          user: 'barney', active: false
        },

        {
          user: 'fred', active: false
        },

        {
          user: 'pebbles', active: true
        }

      ];

      let dropWhileArray: number[] = dropWhile(users, (o: User) => {
        return !o.active;
      });

      let endTime18 = new Date().getTime()
      console.info('appInfoTest xts dropWhileTest01 endTime:' + endTime18 + "us")
      let averageTime18 = endTime18 - startTime18
      console.info('appInfoTest xts dropWhileTest01 averageTime:' + averageTime18 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        dropWhile(users, (o: User) => {
          return !o.active;
        });
      }
      endTime(startTime, 'dropWhileTest01');
      expect(JSON.stringify(dropWhileArray)).assertEqual('[{"user":"pebbles","active":true}]')
    })


    it('dropWhileTest02', 0, () => {
      let startTime19 = new Date().getTime()
      console.info('appInfoTest xts dropWhileTest02 startTime:' + startTime19 + "us")
      let users: User[] = [

        {
          user: 'barney', active: false
        },

        {
          user: 'fred', active: false
        },

        {
          user: 'pebbles', active: true
        }

      ];

      let dropWhileArray: number[] = dropWhile(users, 'active');

      let endTime19 = new Date().getTime()
      console.info('appInfoTest xts dropWhileTest02 endTime:' + endTime19 + "us")
      let averageTime19 = endTime19 - startTime19
      console.info('appInfoTest xts dropWhileTest02 averageTime:' + averageTime19 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        dropWhile(users, 'active');
      }
      endTime(startTime, 'dropWhileTest02');
      expect(JSON.stringify(dropWhileArray))
        .assertEqual('[{"user":"barney","active":false},{"user":"fred","active":false},{"user":"pebbles","active":true}]')
    })


    it('fillTest01', 0, () => {
      let startTime20 = new Date().getTime()
      console.info('appInfoTest xts fillTest01 startTime:' + startTime20 + "us")
      let array = [1, 2, 3];

      let fillArray: number[] = fill(array, 'a');

      let endTime20 = new Date().getTime()
      console.info('appInfoTest xts fillTest01 endTime:' + endTime20 + "us")
      let averageTime20 = endTime20 - startTime20
      console.info('appInfoTest xts fillTest01 averageTime:' + averageTime20 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        fill(array, 'a');
      }
      endTime(startTime, 'fillTest01');
      expect(JSON.stringify(fillArray)).assertEqual('["a","a","a"]')
    })


    it('fillTest02', 0, () => {
      let startTime21 = new Date().getTime()
      console.info('appInfoTest xts fillTest02 startTime:' + startTime21 + "us")
      let fillArray: number[] = fill([4, 6, 8, 10], '*', 1, 3);

      let endTime21 = new Date().getTime()
      console.info('appInfoTest xts fillTest02 endTime:' + endTime21 + "us")
      let averageTime21 = endTime21 - startTime21
      console.info('appInfoTest xts fillTest02 averageTime:' + averageTime21 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        fill([4, 6, 8, 10], '*', 1, 3);
      }
      endTime(startTime, 'fillTest02');
      expect(JSON.stringify(fillArray)).assertEqual('[4,"*","*",10]')
    })


    it('findIndexTest01', 0, () => {
      let startTime22 = new Date().getTime()
      console.info('appInfoTest xts findIndexTest01 startTime:' + startTime22 + "us")
      let users: User[] = [

        {
          user: 'barney', active: false
        },

        {
          user: 'fred', active: false
        },

        {
          user: 'pebbles', active: true
        }

      ];

      let findIndexArray: number[] = findIndex(users, (o: User) => {
        return o.user == 'barney';
      });

      let endTime22 = new Date().getTime()
      console.info('appInfoTest xts findIndexTest01 endTime:' + endTime22 + "us")
      let averageTime22 = endTime22 - startTime22
      console.info('appInfoTest xts findIndexTest01 averageTime:' + averageTime22 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        findIndex(users, (o: User) => {
          return o.user == 'barney';
        });
      }
      endTime(startTime, 'findIndexTest01');
      expect(JSON.stringify(findIndexArray)).assertEqual('0')
    })


    it('findIndexTest02', 0, () => {
      let startTime23 = new Date().getTime()
      console.info('appInfoTest xts findIndexTest02 startTime:' + startTime23 + "us")
      let users: User[] = [

        {
          user: 'barney', active: false
        },

        {
          user: 'fred', active: false
        },

        {
          user: 'pebbles', active: true
        }

      ];

      let findIndexArray: number[] = findIndex(users, 'active');

      let endTime23 = new Date().getTime()
      console.info('appInfoTest xts findIndexTest02 endTime:' + endTime23 + "us")
      let averageTime23 = endTime23 - startTime23
      console.info('appInfoTest xts findIndexTest02 averageTime:' + averageTime23 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        findIndex(users, 'active');
      }
      endTime(startTime, 'findIndexTest02');
      expect(JSON.stringify(findIndexArray)).assertEqual('2')
    })


    it('findLastIndexTest01', 0, () => {
      let startTime24 = new Date().getTime()
      console.info('appInfoTest xts findLastIndexTest01 startTime:' + startTime24 + "us")
      let users: User[] = [

        {
          user: 'barney', active: true
        },

        {
          user: 'fred', active: false
        },

        {
          user: 'pebbles', active: false
        }

      ];

      let findLastIndexArray: number[] = findLastIndex(users, (o: User) => {
        return o.user == 'pebbles';
      });

      let endTime24 = new Date().getTime()
      console.info('appInfoTest xts findLastIndexTest01 endTime:' + endTime24 + "us")
      let averageTime24 = endTime24 - startTime24
      console.info('appInfoTest xts findLastIndexTest01 averageTime:' + averageTime24 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        findLastIndex(users, (o: User) => {
          return o.user == 'pebbles';
        });
      }
      endTime(startTime, 'findLastIndexTest01');
      expect(JSON.stringify(findLastIndexArray)).assertEqual('2')
    })


    it('findLastIndexTest02', 0, () => {
      let startTime25 = new Date().getTime()
      console.info('appInfoTest xts findLastIndexTest02 startTime:' + startTime25 + "us")
      let users: User[] = [

        {
          user: 'barney', active: true
        },

        {
          user: 'fred', active: false
        },

        {
          user: 'pebbles', active: false
        }

      ];

      let findLastIndexArray: number[] = findLastIndex(users, {
        'user': 'barney', 'active': true
      });

      let endTime25 = new Date().getTime()
      console.info('appInfoTest xts findLastIndexTest02 endTime:' + endTime25 + "us")
      let averageTime25 = endTime25 - startTime25
      console.info('appInfoTest xts findLastIndexTest02 averageTime:' + averageTime25 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        findLastIndex(users, {
          'user': 'barney', 'active': true
        });
      }
      endTime(startTime, 'findLastIndexTest02');
      expect(JSON.stringify(findLastIndexArray)).assertEqual('0')
    })


    it('headTest01', 0, () => {
      let startTime26 = new Date().getTime()
      console.info('appInfoTest xts headTest01 startTime:' + startTime26 + "us")
      let headArray: number[] = head([1, 2, 3]);

      let endTime26 = new Date().getTime()
      console.info('appInfoTest xts headTest01 endTime:' + endTime26 + "us")
      let averageTime26 = endTime26 - startTime26
      console.info('appInfoTest xts headTest01 averageTime:' + averageTime26 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        head([1, 2, 3]);
      }
      endTime(startTime, 'headTest01');
      expect(headArray).assertEqual(1);
    })


    it('headTest02', 0, () => {
      let startTime27 = new Date().getTime()
      console.info('appInfoTest xts headTest02 startTime:' + startTime27 + "us")
      let headArray: number[] = head([]);

      let endTime27 = new Date().getTime()
      console.info('appInfoTest xts headTest02 endTime:' + endTime27 + "us")
      let averageTime27 = endTime27 - startTime27
      console.info('appInfoTest xts headTest02 averageTime:' + averageTime27 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        head([]);
      }
      endTime(startTime, 'headTest02');
      expect(JSON.stringify(headArray)).assertUndefined();
    })


    it('indexOfTest01', 0, () => {
      let startTime28 = new Date().getTime()
      console.info('appInfoTest xts indexOfTest01 startTime:' + startTime28 + "us")
      let indexOfArray: number[] = indexOf([1, 2, 1, 2], 2);

      let endTime28 = new Date().getTime()
      console.info('appInfoTest xts indexOfTest01 endTime:' + endTime28 + "us")
      let averageTime28 = endTime28 - startTime28
      console.info('appInfoTest xts indexOfTest01 averageTime:' + averageTime28 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        indexOf([1, 2, 1, 2], 2);
      }
      endTime(startTime, 'indexOfTest01')
      expect(indexOfArray).assertEqual(1);
    })


    it('indexOfTest02', 0, () => {
      let startTime29 = new Date().getTime()
      console.info('appInfoTest xts indexOfTest02 startTime:' + startTime29 + "us")
      let indexOfArray: number[] = indexOf([1, 2, 1, 2], 2, 2);

      let endTime29 = new Date().getTime()
      console.info('appInfoTest xts indexOfTest02 endTime:' + endTime29 + "us")
      let averageTime29 = endTime29 - startTime29
      console.info('appInfoTest xts indexOfTest02 averageTime:' + averageTime29 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        indexOf([1, 2, 1, 2], 2, 2);
      }
      endTime(startTime, 'indexOfTest02')
      expect(indexOfArray).assertEqual(3);
    })


    it('initialTest01', 0, () => {
      let startTime30 = new Date().getTime()
      console.info('appInfoTest xts initialTest01 startTime:' + startTime30 + "us")
      let initialArray: number[] = initial([1, 2, 3]);

      let endTime30 = new Date().getTime()
      console.info('appInfoTest xts initialTest01 endTime:' + endTime30 + "us")
      let averageTime30 = endTime30 - startTime30
      console.info('appInfoTest xts initialTest01 averageTime:' + averageTime30 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        initial([1, 2, 3]);
      }
      endTime(startTime, 'initialTest01')
      expect(JSON.stringify(initialArray)).assertEqual('[1,2]');
    })


    it('initialTest02', 0, () => {
      let startTime31 = new Date().getTime()
      console.info('appInfoTest xts initialTest02 startTime:' + startTime31 + "us")
      let initialArray: number[] = initial(['a', 'b', 1, 2, 3, 's']);

      let endTime31 = new Date().getTime()
      console.info('appInfoTest xts initialTest02 endTime:' + endTime31 + "us")
      let averageTime31 = endTime31 - startTime31
      console.info('appInfoTest xts initialTest02 averageTime:' + averageTime31 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        initial(['a', 'b', 1, 2, 3, 's']);
      }
      endTime(startTime, 'initialTest02')
      expect(JSON.stringify(initialArray)).assertEqual('["a","b",1,2,3]');
    })


    it('intersectionTest01', 0, () => {
      let startTime32 = new Date().getTime()
      console.info('appInfoTest xts intersectionTest01 startTime:' + startTime32 + "us")
      let intersectionArray: number[] = intersection([2, 1], [4, 2], [1, 2]);

      let endTime32 = new Date().getTime()
      console.info('appInfoTest xts intersectionTest01 endTime:' + endTime32 + "us")
      let averageTime32 = endTime32 - startTime32
      console.info('appInfoTest xts intersectionTest01 averageTime:' + averageTime32 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        intersection([2, 1], [4, 2], [1, 2]);
      }
      endTime(startTime, 'intersectionTest01')
      expect(JSON.stringify(intersectionArray)).assertEqual('[2]');
    })


    it('intersectionTest02', 0, () => {
      let startTime33 = new Date().getTime()
      console.info('appInfoTest xts intersectionTest02 startTime:' + startTime33 + "us")
      let intersectionArray: number[] = intersection(['a', 1], ['a', 2], [1, 'a']);

      let endTime33 = new Date().getTime()
      console.info('appInfoTest xts intersectionTest02 endTime:' + endTime33 + "us")
      let averageTime33 = endTime33 - startTime33
      console.info('appInfoTest xts intersectionTest02 averageTime:' + averageTime33 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        intersection(['a', 1], ['a', 2], [1, 'a']);
      }
      endTime(startTime, 'intersectionTest02')
      expect(JSON.stringify(intersectionArray)).assertEqual('["a"]');
    })


    it('intersectionByTest01', 0, () => {
      let startTime34 = new Date().getTime()
      console.info('appInfoTest xts intersectionByTest01 startTime:' + startTime34 + "us")
      let intersectionByArray: number[] = intersectionBy([2.1, 1.2], [4.3, 2.4], Math.floor);

      let endTime34 = new Date().getTime()
      console.info('appInfoTest xts intersectionByTest01 endTime:' + endTime34 + "us")
      let averageTime34 = endTime34 - startTime34
      console.info('appInfoTest xts intersectionByTest01 averageTime:' + averageTime34 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        intersectionBy([2.1, 1.2], [4.3, 2.4], Math.floor);
      }
      endTime(startTime, 'intersectionByTest01')
      expect(JSON.stringify(intersectionByArray)).assertEqual('[2.1]');
    })


    it('intersectionByTest02', 0, () => {
      let startTime35 = new Date().getTime()
      console.info('appInfoTest xts intersectionByTest02 startTime:' + startTime35 + "us")
      let intersectionByArray: number[] = intersectionBy([{
        'x': 1
      }], [{
        'x': 2
      }, {
        'x': 1
      }], 'x');

      let endTime35 = new Date().getTime()
      console.info('appInfoTest xts intersectionByTest02 endTime:' + endTime35 + "us")
      let averageTime35 = endTime35 - startTime35
      console.info('appInfoTest xts intersectionByTest02 averageTime:' + averageTime35 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        intersectionBy([{
          'x': 1
        }], [{
          'x': 2
        }, {
          'x': 1
        }], 'x');
      }
      endTime(startTime, 'intersectionByTest02')
      expect(JSON.stringify(intersectionByArray)).assertEqual('[{"x":1}]');
    })


    it('intersectionWithTest01', 0, () => {
      let startTime36 = new Date().getTime()
      console.info('appInfoTest xts intersectionWithTest01 startTime:' + startTime36 + "us")
      let objects = [{
        x: 1, y: 2
      } as XY, {
        x: 2, y: 1
      } as XY];

      let others = [{
        x: 1, y: 1
      } as XY, {
        x: 1, y: 2
      } as XY];

      let intersectionWithArray: number[] = intersectionWith(objects, others, isEqual);

      let endTime36 = new Date().getTime()
      console.info('appInfoTest xts intersectionWithTest01 endTime:' + endTime36 + "us")
      let averageTime36 = endTime36 - startTime36
      console.info('appInfoTest xts intersectionWithTest01 averageTime:' + averageTime36 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        intersectionWith(objects, others, isEqual);
      }
      endTime(startTime, 'intersectionWithTest01')
      expect(JSON.stringify(intersectionWithArray)).assertEqual('[{"x":1,"y":2}]');
    })


    it('intersectionWithTest02', 0, () => {
      let startTime37 = new Date().getTime()
      console.info('appInfoTest xts intersectionWithTest02 startTime:' + startTime37 + "us")
      let objects = [{
        x: 1, y: 2
      } as XY, {
        x: 2, y: 1
      } as XY, {
        a: 5, b: 6
      } as AB];

      let others = [{
        x: 1, y: 1
      } as XY, {
        x: 1, y: 2
      } as XY, {
        a: 5, b: 6
      } as AB];

      let intersectionWithArray: number[] = intersectionWith(objects, others, isEqual);

      let endTime37 = new Date().getTime()
      console.info('appInfoTest xts intersectionWithTest02 endTime:' + endTime37 + "us")
      let averageTime37 = endTime37 - startTime37
      console.info('appInfoTest xts intersectionWithTest02 averageTime:' + averageTime37 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        intersectionWith(objects, others, isEqual);
      }
      endTime(startTime, 'intersectionWithTest02')
      expect(JSON.stringify(intersectionWithArray)).assertEqual('[{"x":1,"y":2},{"a":5,"b":6}]');
    })


    it('joinTest01', 0, () => {
      let startTime38 = new Date().getTime()
      console.info('appInfoTest xts joinTest01 startTime:' + startTime38 + "us")
      let joinArray: number[] = join(['a', 'b', 'c'], '~');

      let endTime38 = new Date().getTime()
      console.info('appInfoTest xts joinTest01 endTime:' + endTime38 + "us")
      let averageTime38 = endTime38 - startTime38
      console.info('appInfoTest xts joinTest01 averageTime:' + averageTime38 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        join(['a', 'b', 'c'], '~');
      }
      endTime(startTime, 'joinTest01')
      expect(joinArray).assertEqual('a~b~c');
    })


    it('joinTest02', 0, () => {
      let startTime39 = new Date().getTime()
      console.info('appInfoTest xts joinTest02 startTime:' + startTime39 + "us")
      let joinArray: number[] = join(['hello', 'world', 'join'], '#~#');

      let endTime39 = new Date().getTime()
      console.info('appInfoTest xts joinTest02 endTime:' + endTime39 + "us")
      let averageTime39 = endTime39 - startTime39
      console.info('appInfoTest xts joinTest02 averageTime:' + averageTime39 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        join(['hello', 'world', 'join'], '#~#');
      }
      endTime(startTime, 'joinTest02')
      expect(joinArray).assertEqual('hello#~#world#~#join');
    })


    it('lastTest01', 0, () => {
      let startTime40 = new Date().getTime()
      console.info('appInfoTest xts lastTest01 startTime:' + startTime40 + "us")
      let lastArray: number[] = last([1, 2, 3]);

      let endTime40 = new Date().getTime()
      console.info('appInfoTest xts lastTest01 endTime:' + endTime40 + "us")
      let averageTime40 = endTime40 - startTime40
      console.info('appInfoTest xts lastTest01 averageTime:' + averageTime40 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        last([1, 2, 3]);
      }
      endTime(startTime, 'lastTest01')
      expect(lastArray).assertEqual(3);
    })


    it('lastTest02', 0, () => {
      let startTime41 = new Date().getTime()
      console.info('appInfoTest xts lastTest02 startTime:' + startTime41 + "us")
      let lastArray: number[] = last(['a', 'b', 1, 7, 'c']);

      let endTime41 = new Date().getTime()
      console.info('appInfoTest xts lastTest02 endTime:' + endTime41 + "us")
      let averageTime41 = endTime41 - startTime41
      console.info('appInfoTest xts lastTest02 averageTime:' + averageTime41 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        last(['a', 'b', 1, 7, 'c']);
      }
      endTime(startTime, 'lastTest02')
      expect(lastArray).assertEqual('c');
    })


    it('lastIndexOfTest01', 0, () => {
      let startTime42 = new Date().getTime()
      console.info('appInfoTest xts lastIndexOfTest01 startTime:' + startTime42 + "us")
      let lastIndexOfArray: number[] = lastIndexOf([1, 2, 1, 2], 2);

      let endTime42 = new Date().getTime()
      console.info('appInfoTest xts lastIndexOfTest01 endTime:' + endTime42 + "us")
      let averageTime42 = endTime42 - startTime42
      console.info('appInfoTest xts lastIndexOfTest01 averageTime:' + averageTime42 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        lastIndexOf([1, 2, 1, 2], 2);
      }
      endTime(startTime, 'lastIndexOfTest01')
      expect(lastIndexOfArray).assertEqual(3);
    })


    it('lastIndexOfTest02', 0, () => {
      let startTime43 = new Date().getTime()
      console.info('appInfoTest xts lastIndexOfTest02 startTime:' + startTime43 + "us")
      let lastIndexOfArray: number[] = lastIndexOf([1, 2, 1, 2], 2, 2);

      let endTime43 = new Date().getTime()
      console.info('appInfoTest xts lastIndexOfTest02 endTime:' + endTime43 + "us")
      let averageTime43 = endTime43 - startTime43
      console.info('appInfoTest xts lastIndexOfTest02 averageTime:' + averageTime43 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        lastIndexOf([1, 2, 1, 2], 2, 2);
      }
      endTime(startTime, 'lastIndexOfTest02')
      expect(lastIndexOfArray).assertEqual(1);
    })


    it('nthTest01', 0, () => {
      let startTime44 = new Date().getTime()
      console.info('appInfoTest xts nthTest01 startTime:' + startTime44 + "us")
      let array = ['a', 'b', 'c', 'd'];

      let nthArray: number[] = nth(array, 1);

      let endTime44 = new Date().getTime()
      console.info('appInfoTest xts nthTest01 endTime:' + endTime44 + "us")
      let averageTime44 = endTime44 - startTime44
      console.info('appInfoTest xts nthTest01 averageTime:' + averageTime44 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        nth(array, 1);
      }
      endTime(startTime, 'nthTest01')
      expect(nthArray).assertEqual('b');
    })


    it('nthTest02', 0, () => {
      let startTime45 = new Date().getTime()
      console.info('appInfoTest xts nthTest02 startTime:' + startTime45 + "us")
      let array = ['a', 'b', 'c', 'd'];

      let nthArray: number[] = nth(array, -2);

      let endTime45 = new Date().getTime()
      console.info('appInfoTest xts nthTest02 endTime:' + endTime45 + "us")
      let averageTime45 = endTime45 - startTime45
      console.info('appInfoTest xts nthTest02 averageTime:' + averageTime45 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        nth(array, -2);
      }
      endTime(startTime, 'nthTest02')
      expect(nthArray).assertEqual('c');
    })


    it('pullTest01', 0, () => {
      let startTime46 = new Date().getTime()
      console.info('appInfoTest xts pullTest01 startTime:' + startTime46 + "us")
      let array = [1, 2, 3, 1, 2, 3];

      let pullArray: number[] = pull(array, 2, 3);

      let endTime46 = new Date().getTime()
      console.info('appInfoTest xts pullTest01 endTime:' + endTime46 + "us")
      let averageTime46 = endTime46 - startTime46
      console.info('appInfoTest xts pullTest01 averageTime:' + averageTime46 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        pull(array, 2, 3);
      }
      endTime(startTime, 'pullTest01')
      expect(JSON.stringify(pullArray)).assertEqual('[1,1]');
    })


    it('pullTest02', 0, () => {
      let startTime47 = new Date().getTime()
      console.info('appInfoTest xts pullTest02 startTime:' + startTime47 + "us")
      let array = ['a', 'b', 3, 1, 2, 3, 'c'];

      let pullArray: number[] = pull(array, 'a', 3);

      let endTime47 = new Date().getTime()
      console.info('appInfoTest xts pullTest02 endTime:' + endTime47 + "us")
      let averageTime47 = endTime47 - startTime47
      console.info('appInfoTest xts pullTest02 averageTime:' + averageTime47 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        pull(array, 'a', 3);
      }
      endTime(startTime, 'pullTest02')
      expect(JSON.stringify(pullArray)).assertEqual('["b",1,2,"c"]');
    })


    it('pullAllTest01', 0, () => {
      let startTime48 = new Date().getTime()
      console.info('appInfoTest xts pullAllTest01 startTime:' + startTime48 + "us")
      let array = ['a', 'b', 3, 1, 2, 3, 'c'];

      let pullAllArray: number[] = pullAll(array, ['a', 3]);

      let endTime48 = new Date().getTime()
      console.info('appInfoTest xts pullAllTest01 endTime:' + endTime48 + "us")
      let averageTime48 = endTime48 - startTime48
      console.info('appInfoTest xts pullAllTest01 averageTime:' + averageTime48 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        pullAll(array, ['a', 3]);
      }
      endTime(startTime, 'pullAllTest01')
      expect(JSON.stringify(pullAllArray)).assertEqual('["b",1,2,"c"]');
    })


    it('pullAllTest02', 0, () => {
      let startTime49 = new Date().getTime()
      console.info('appInfoTest xts pullAllTest02 startTime:' + startTime49 + "us")
      let array = [1, 2, 3, 1, 2, 3];

      let pullAllArray: number[] = pullAll(array, [2, 3]);

      let endTime49 = new Date().getTime()
      console.info('appInfoTest xts pullAllTest02 endTime:' + endTime49 + "us")
      let averageTime49 = endTime49 - startTime49
      console.info('appInfoTest xts pullAllTest02 averageTime:' + averageTime49 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        pullAll(array, [2, 3]);
      }
      endTime(startTime, 'pullAllTest02')
      expect(JSON.stringify(pullAllArray)).assertEqual('[1,1]');
    })


    it('pullAllByTest01', 0, () => {
      let startTime50 = new Date().getTime()
      console.info('appInfoTest xts pullAllByTest01 startTime:' + startTime50 + "us")
      let array = [{
        x: 1
      }, {
        x: 2
      }, {
        x: 3
      }, {
        x: 1
      }] as XY[];

      let pullAllByArray: object = pullAllBy(array, [{
        'x': 1
      }, {
        'x': 3
      }], 'x');

      let endTime50 = new Date().getTime()
      console.info('appInfoTest xts pullAllByTest01 endTime:' + endTime50 + "us")
      let averageTime50 = endTime50 - startTime50
      console.info('appInfoTest xts pullAllByTest01 averageTime:' + averageTime50 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        pullAllBy(array, [{
          'x': 1
        }, {
          'x': 3
        }], 'x');
      }
      endTime(startTime, 'pullAllByTest01')
      expect(JSON.stringify(pullAllByArray)).assertEqual('[{"x":2}]');
    })


    it('pullAllByTest02', 0, () => {
      let startTime51 = new Date().getTime()
      console.info('appInfoTest xts pullAllByTest02 startTime:' + startTime51 + "us")
      let array = [{
        x: 1
      } as X, {
        x: 2
      } as X, {
        y: 3
      } as Y, {
        b: 1
      } as B, {
        c: 5
      } as C];

      let pullAllByArray: object = pullAllBy(array, [{
        'x': 1
      }, {
        'c': 5
      }], 'y');

      let endTime51 = new Date().getTime()
      console.info('appInfoTest xts pullAllByTest02 endTime:' + endTime51 + "us")
      let averageTime51 = endTime51 - startTime51
      console.info('appInfoTest xts pullAllByTest02 averageTime:' + averageTime51 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        pullAllBy(array, [{
          'x': 1
        }, {
          'c': 5
        }], 'y');
      }
      endTime(startTime, 'pullAllByTest02')
      expect(JSON.stringify(pullAllByArray)).assertEqual('[{"y":3}]');
    })


    it('pullAllWithTest01', 0, () => {
      let startTime52 = new Date().getTime()
      console.info('appInfoTest xts pullAllWithTest01 startTime:' + startTime52 + "us")
      let array = [{
        x: 1, y: 2
      }, {
        x: 3, y: 4
      }, {
        x: 5, y: 6
      }] as XY[];

      let pullAllWithArray: object = pullAllWith(array, [{
        'x': 3, 'y': 4
      }], isEqual);

      let endTime52 = new Date().getTime()
      console.info('appInfoTest xts pullAllWithTest01 endTime:' + endTime52 + "us")
      let averageTime52 = endTime52 - startTime52
      console.info('appInfoTest xts pullAllWithTest01 averageTime:' + averageTime52 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        pullAllWith(array, [{
          'x': 3, 'y': 4
        }], isEqual);
      }
      endTime(startTime, 'pullAllWithTest01')
      expect(JSON.stringify(pullAllWithArray)).assertEqual('[{"x":1,"y":2},{"x":5,"y":6}]');
    })


    it('pullAllWithTest02', 0, () => {
      let startTime53 = new Date().getTime()
      console.info('appInfoTest xts pullAllWithTest02 startTime:' + startTime53 + "us")
      let array = [{
        x: 1, y: 2
      } as XY, {
        a: 7, b: 7
      } as AB, {
        x: 5, y: 6
      } as XY, {
        c: 9, d: 0
      } as CD];

      let pullAllWithArray: object = pullAllWith(array, [{
        'x': 1, 'y': 2
      }, {
        'x': 5, 'y': 6
      }], isEqual);

      let endTime53 = new Date().getTime()
      console.info('appInfoTest xts pullAllWithTest02 endTime:' + endTime53 + "us")
      let averageTime53 = endTime53 - startTime53
      console.info('appInfoTest xts pullAllWithTest02 averageTime:' + averageTime53 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        pullAllWith(array, [{
          'x': 1, 'y': 2
        }, {
          'x': 5, 'y': 6
        }], isEqual);
      }
      endTime(startTime, 'pullAllWithTest02')
      expect(JSON.stringify(pullAllWithArray)).assertEqual('[{"a":7,"b":7},{"c":9,"d":0}]');
    })


    it('pullAtTest01', 0, () => {
      let startTime54 = new Date().getTime()
      console.info('appInfoTest xts pullAtTest01 startTime:' + startTime54 + "us")
      let array = [5, 10, 15, 20];

      let evens: number[] = pullAt(array, 1, 3);

      let endTime54 = new Date().getTime()
      console.info('appInfoTest xts pullAtTest01 endTime:' + endTime54 + "us")
      let averageTime54 = endTime54 - startTime54
      console.info('appInfoTest xts pullAtTest01 averageTime:' + averageTime54 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        pullAt(array, 1, 3);
      }
      endTime(startTime, 'pullAtTest01')
      expect(JSON.stringify(evens)).assertEqual('[10,20]');
    })


    it('pullAtTest02', 0, () => {
      let startTime55 = new Date().getTime()
      console.info('appInfoTest xts pullAtTest02 startTime:' + startTime55 + "us")
      let array = [12, 34, 'a', 'b', 'c', 20];

      let evens: number[] = pullAt(array, 2, 4);

      let endTime55 = new Date().getTime()
      console.info('appInfoTest xts pullAtTest02 endTime:' + endTime55 + "us")
      let averageTime55 = endTime55 - startTime55
      console.info('appInfoTest xts pullAtTest02 averageTime:' + averageTime55 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        pullAt(array, 2, 4);
      }
      endTime(startTime, 'pullAtTest02')
      expect(JSON.stringify(evens)).assertEqual('["a","c"]');
    })


    it('removeTest01', 0, () => {
      let startTime56 = new Date().getTime()
      console.info('appInfoTest xts removeTest01 startTime:' + startTime56 + "us")
      let array = [1, 2, 3, 4];

      let evens: number[] = remove(array, (n: number) => {

        return n % 2 == 0;

      });

      let endTime56 = new Date().getTime()
      console.info('appInfoTest xts removeTest01 endTime:' + endTime56 + "us")
      let averageTime56 = endTime56 - startTime56
      console.info('appInfoTest xts removeTest01 averageTime:' + averageTime56 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        remove(array, (n: number) => {
          return n % 2 == 0;
        });
      }
      endTime(startTime, 'removeTest01')
      expect(JSON.stringify(evens)).assertEqual('[2,4]');
    })


    it('removeTest02', 0, () => {
      let startTime57 = new Date().getTime()
      console.info('appInfoTest xts removeTest02 startTime:' + startTime57 + "us")
      let array = [8, 3, 4, 6, 9, 12, 14, 24];

      let evens: number[] = remove(array, (n: number) => {

        return n % 2 == 0;

      });

      let endTime57 = new Date().getTime()
      console.info('appInfoTest xts removeTest02 endTime:' + endTime57 + "us")
      let averageTime57 = endTime57 - startTime57
      console.info('appInfoTest xts removeTest02 averageTime:' + averageTime57 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        remove(array, (n: number) => {
          return n % 2 == 0;
        });
      }
      endTime(startTime, 'removeTest02')
      expect(JSON.stringify(evens)).assertEqual('[8,4,6,12,14,24]');
    })


    it('reverseTest01', 0, () => {
      let startTime58 = new Date().getTime()
      console.info('appInfoTest xts reverseTest01 startTime:' + startTime58 + "us")
      let array = [1, 2, 3];

      let reverseArray: number[] = reverse(array);

      let endTime58 = new Date().getTime()
      console.info('appInfoTest xts reverseTest01 endTime:' + endTime58 + "us")
      let averageTime58 = endTime58 - startTime58
      console.info('appInfoTest xts reverseTest01 averageTime:' + averageTime58 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        reverse(array);
      }
      endTime(startTime, 'reverseTest01')
      expect(JSON.stringify(reverseArray)).assertEqual('[3,2,1]');
    })


    it('reverseTest02', 0, () => {
      let startTime59 = new Date().getTime()
      console.info('appInfoTest xts reverseTest02 startTime:' + startTime59 + "us")
      let array = ['a', 'b', 'c'];

      let reverseArray: string[] = reverse(array);

      let endTime59 = new Date().getTime()
      console.info('appInfoTest xts reverseTest02 endTime:' + endTime59 + "us")
      let averageTime59 = endTime59 - startTime59
      console.info('appInfoTest xts reverseTest02 averageTime:' + averageTime59 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        reverse(array);
      }
      endTime(startTime, 'reverseTest02')
      expect(JSON.stringify(reverseArray)).assertEqual('["c","b","a"]');
    })


    it('sliceTest01', 0, () => {
      let startTime60 = new Date().getTime()
      console.info('appInfoTest xts sliceTest01 startTime:' + startTime60 + "us")
      let array = [[1, 12], [12, 8], 7, 8]

      let sliceArray: number[][] = slice(array, 1, 3);

      let endTime60 = new Date().getTime()
      console.info('appInfoTest xts sliceTest01 endTime:' + endTime60 + "us")
      let averageTime60 = endTime60 - startTime60
      console.info('appInfoTest xts sliceTest01 averageTime:' + averageTime60 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        slice(array, 1, 3);
      }
      endTime(startTime, 'sliceTest01')
      expect(JSON.stringify(sliceArray)).assertEqual('[[12,8],7]');
    })


    it('sliceTest02', 0, () => {
      let startTime61 = new Date().getTime()
      console.info('appInfoTest xts sliceTest02 startTime:' + startTime61 + "us")
      let array = [[1, 12], [12, 8], 'a', 'as', 'b', 'g']

      let sliceArray: string[] = slice(array, 2, 5);

      let endTime61 = new Date().getTime()
      console.info('appInfoTest xts sliceTest02 endTime:' + endTime61 + "us")
      let averageTime61 = endTime61 - startTime61
      console.info('appInfoTest xts sliceTest02 averageTime:' + averageTime61 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        slice(array, 2, 5);
      }
      endTime(startTime, 'sliceTest02')
      expect(JSON.stringify(sliceArray)).assertEqual('["a","as","b"]');
    })


    it('sortedIndexTest01', 0, () => {
      let startTime62 = new Date().getTime()
      console.info('appInfoTest xts sortedIndexTest01 startTime:' + startTime62 + "us")
      let sortedIndexArray: number = sortedIndex([30, 50], 40);

      let endTime62 = new Date().getTime()
      console.info('appInfoTest xts sortedIndexTest01 endTime:' + endTime62 + "us")
      let averageTime62 = endTime62 - startTime62
      console.info('appInfoTest xts sortedIndexTest01 averageTime:' + averageTime62 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        sortedIndex([30, 50], 40);
      }
      endTime(startTime, 'sortedIndexTest01')
      expect(sortedIndexArray).assertEqual(1);
    })


    it('sortedIndexTest02', 0, () => {
      let startTime63 = new Date().getTime()
      console.info('appInfoTest xts sortedIndexTest02 startTime:' + startTime63 + "us")
      let sortedIndexArray: number = sortedIndex([30, 35, 50, 70, 100, 190], 110);

      let endTime63 = new Date().getTime()
      console.info('appInfoTest xts sortedIndexTest02 endTime:' + endTime63 + "us")
      let averageTime63 = endTime63 - startTime63
      console.info('appInfoTest xts sortedIndexTest02 averageTime:' + averageTime63 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        sortedIndex([30, 35, 50, 70, 100, 190], 110);
      }
      endTime(startTime, 'sortedIndexTest02')
      expect(sortedIndexArray).assertEqual(5);
    })


    it('sortedIndexByTest01', 0, () => {
      let startTime64 = new Date().getTime()
      console.info('appInfoTest xts sortedIndexByTest01 startTime:' + startTime64 + "us")
      let objects = [{
        x: 4
      }, {
        x: 5
      }] as X[];

      let sortedIndexByArray: number = sortedIndexBy(objects, {
        'x': 4
      }, (o: X) => {
        return o.x;
      });

      let endTime64 = new Date().getTime()
      console.info('appInfoTest xts sortedIndexByTest01 endTime:' + endTime64 + "us")
      let averageTime64 = endTime64 - startTime64
      console.info('appInfoTest xts sortedIndexByTest01 averageTime:' + averageTime64 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        sortedIndexBy(objects, {
          'x': 4
        }, (o: X) => {
          return o.x;
        });
      }
      endTime(startTime, 'sortedIndexByTest01')
      expect(sortedIndexByArray).assertEqual(0);
    })


    it('sortedIndexByTest02', 0, () => {
      let startTime65 = new Date().getTime()
      console.info('appInfoTest xts sortedIndexByTest02 startTime:' + startTime65 + "us")
      let objects = [{
        x: 4
      }, {
        x: 5
      }] as X[];

      let sortedIndexByArray: number = sortedIndexBy(objects, {
        'x': 4
      }, 'x');

      let endTime65 = new Date().getTime()
      console.info('appInfoTest xts sortedIndexByTest02 endTime:' + endTime65 + "us")
      let averageTime65 = endTime65 - startTime65
      console.info('appInfoTest xts sortedIndexByTest02 averageTime:' + averageTime65 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        sortedIndexBy(objects, {
          'x': 4
        }, 'x');
      }
      endTime(startTime, 'sortedIndexByTest02')
      expect(sortedIndexByArray).assertEqual(0);
    })


    it('sortedIndexOfTest01', 0, () => {
      let startTime66 = new Date().getTime()
      console.info('appInfoTest xts sortedIndexOfTest01 startTime:' + startTime66 + "us")
      let sortedIndexByArray: number = sortedIndexOf([4, 5, 5, 5, 6], 5);

      let endTime66 = new Date().getTime()
      console.info('appInfoTest xts sortedIndexOfTest01 endTime:' + endTime66 + "us")
      let averageTime66 = endTime66 - startTime66
      console.info('appInfoTest xts sortedIndexOfTest01 averageTime:' + averageTime66 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        sortedIndexOf([4, 5, 5, 5, 6], 5);
      }
      endTime(startTime, 'sortedIndexOfTest01')
      expect(sortedIndexByArray).assertEqual(1);
    })


    it('sortedIndexOfTest02', 0, () => {
      let startTime67 = new Date().getTime()
      console.info('appInfoTest xts sortedIndexOfTest02 startTime:' + startTime67 + "us")
      let sortedIndexByArray: number = sortedIndexOf([1, 5, 7, 0, 9, 5, 6], 0);

      let endTime67 = new Date().getTime()
      console.info('appInfoTest xts sortedIndexOfTest02 endTime:' + endTime67 + "us")
      let averageTime67 = endTime67 - startTime67
      console.info('appInfoTest xts sortedIndexOfTest02 averageTime:' + averageTime67 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        sortedIndexOf([1, 5, 7, 0, 9, 5, 6], 0);
      }
      endTime(startTime, 'sortedIndexOfTest02')
      expect(sortedIndexByArray).assertEqual(-1);
    })


    it('sortedLastIndexTest01', 0, () => {
      let startTime68 = new Date().getTime()
      console.info('appInfoTest xts sortedLastIndexTest01 startTime:' + startTime68 + "us")
      let sortedLastIndexArray: number = sortedLastIndex([4, 5, 5, 5, 6], 5);

      let endTime68 = new Date().getTime()
      console.info('appInfoTest xts sortedLastIndexTest01 endTime:' + endTime68 + "us")
      let averageTime68 = endTime68 - startTime68
      console.info('appInfoTest xts sortedLastIndexTest01 averageTime:' + averageTime68 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        sortedLastIndex([4, 5, 5, 5, 6], 5);
      }
      endTime(startTime, 'sortedLastIndexTest01')
      expect(sortedLastIndexArray).assertEqual(4);
    })


    it('sortedLastIndexTest02', 0, () => {
      let startTime69 = new Date().getTime()
      console.info('appInfoTest xts sortedLastIndexTest02 startTime:' + startTime69 + "us")
      let sortedLastIndexArray: number = sortedLastIndex([4, 5, 9, 4, 20, , 34, 0, 11], 7);

      let endTime69 = new Date().getTime()
      console.info('appInfoTest xts sortedLastIndexTest02 endTime:' + endTime69 + "us")
      let averageTime69 = endTime69 - startTime69
      console.info('appInfoTest xts sortedLastIndexTest02 averageTime:' + averageTime69 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        sortedLastIndex([4, 5, 9, 4, 20, , 34, 0, 11], 7);
      }
      endTime(startTime, 'sortedLastIndexTest02')
      expect(sortedLastIndexArray).assertEqual(2);
    })


    it('sortedLastIndexByTest01', 0, () => {
      let startTime70 = new Date().getTime()
      console.info('appInfoTest xts sortedLastIndexByTest01 startTime:' + startTime70 + "us")
      let objects = [{
        x: 4
      }, {
        x: 5
      }] as X[];

      let sortedLastIndexByArray: number = sortedLastIndexBy(objects, {
        'x': 4
      }, (o: X) => {
        return o.x;
      });

      let endTime70 = new Date().getTime()
      console.info('appInfoTest xts sortedLastIndexByTest01 endTime:' + endTime70 + "us")
      let averageTime70 = endTime70 - startTime70
      console.info('appInfoTest xts sortedLastIndexByTest01 averageTime:' + averageTime70 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        sortedLastIndexBy(objects, {
          'x': 4
        }, (o: X) => {
          return o.x;
        });
      }
      endTime(startTime, 'sortedLastIndexByTest01')
      expect(sortedLastIndexByArray).assertEqual(1);
    })


    it('sortedLastIndexByTest02', 0, () => {
      let startTime71 = new Date().getTime()
      console.info('appInfoTest xts sortedLastIndexByTest02 startTime:' + startTime71 + "us")
      let objects = [{
        x: 4
      }, {
        x: 5
      }] as X[];

      let sortedLastIndexByArray: number = sortedLastIndexBy(objects, {
        'x': 4
      }, 'x');

      let endTime71 = new Date().getTime()
      console.info('appInfoTest xts sortedLastIndexByTest02 endTime:' + endTime71 + "us")
      let averageTime71 = endTime71 - startTime71
      console.info('appInfoTest xts sortedLastIndexByTest02 averageTime:' + averageTime71 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        sortedLastIndexBy(objects, {
          'x': 4
        }, 'x');
      }
      endTime(startTime, 'sortedLastIndexByTest02')
      expect(sortedLastIndexByArray).assertEqual(1);
    })


    it('sortedLastIndexOfTest01', 0, () => {
      let startTime72 = new Date().getTime()
      console.info('appInfoTest xts sortedLastIndexOfTest01 startTime:' + startTime72 + "us")
      let sortedLastIndexOfArray: number = sortedLastIndexOf([4, 5, 5, 5, 6], 5);

      let endTime72 = new Date().getTime()
      console.info('appInfoTest xts sortedLastIndexOfTest01 endTime:' + endTime72 + "us")
      let averageTime72 = endTime72 - startTime72
      console.info('appInfoTest xts sortedLastIndexOfTest01 averageTime:' + averageTime72 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        sortedLastIndexOf([4, 5, 5, 5, 6], 5);
      }
      endTime(startTime, 'sortedLastIndexOfTest01')
      expect(sortedLastIndexOfArray).assertEqual(3);
    })


    it('sortedLastIndexOfTest02', 0, () => {
      let startTime73 = new Date().getTime()
      console.info('appInfoTest xts sortedLastIndexOfTest02 startTime:' + startTime73 + "us")
      let sortedLastIndexOfArray: number = sortedLastIndexOf([4, 5, 5, 5, 6], 5);

      let endTime73 = new Date().getTime()
      console.info('appInfoTest xts sortedLastIndexOfTest02 endTime:' + endTime73 + "us")
      let averageTime73 = endTime73 - startTime73
      console.info('appInfoTest xts sortedLastIndexOfTest02 averageTime:' + averageTime73 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        sortedLastIndexOf([4, 5, 5, 5, 6], 5);
      }
      endTime(startTime, 'sortedLastIndexOfTest02')
      expect(sortedLastIndexOfArray).assertEqual(3);
    })


    it('sortedUniqTest01', 0, () => {
      let startTime74 = new Date().getTime()
      console.info('appInfoTest xts sortedUniqTest01 startTime:' + startTime74 + "us")
      let sortedUniqArray: number[] = sortedUniq([1, 1, 2]);

      let endTime74 = new Date().getTime()
      console.info('appInfoTest xts sortedUniqTest01 endTime:' + endTime74 + "us")
      let averageTime74 = endTime74 - startTime74
      console.info('appInfoTest xts sortedUniqTest01 averageTime:' + averageTime74 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        sortedUniq([1, 1, 2]);
      }
      endTime(startTime, 'sortedUniqTest01')
      expect(JSON.stringify(sortedUniqArray)).assertEqual('[1,2]');
    })


    it('sortedUniqTest02', 0, () => {
      let startTime75 = new Date().getTime()
      console.info('appInfoTest xts sortedUniqTest02 startTime:' + startTime75 + "us")
      let sortedUniqArray: number[] = sortedUniq([1, 1, 2, 3, 5, 6, 7, 10, 3, 5, 5]);

      let endTime75 = new Date().getTime()
      console.info('appInfoTest xts sortedUniqTest02 endTime:' + endTime75 + "us")
      let averageTime75 = endTime75 - startTime75
      console.info('appInfoTest xts sortedUniqTest02 averageTime:' + averageTime75 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        sortedUniq([1, 1, 2, 3, 5, 6, 7, 10, 3, 5, 5]);
      }
      endTime(startTime, 'sortedUniqTest02')
      expect(JSON.stringify(sortedUniqArray)).assertEqual('[1,2,3,5,6,7,10,3,5]');
    })


    it('sortedUniqByTest01', 0, () => {
      let startTime76 = new Date().getTime()
      console.info('appInfoTest xts sortedUniqByTest01 startTime:' + startTime76 + "us")
      let sortedUniqByArray: number[] = sortedUniqBy([1.1, 1.2, 2.3, 2.4], Math.floor);

      let endTime76 = new Date().getTime()
      console.info('appInfoTest xts sortedUniqByTest01 endTime:' + endTime76 + "us")
      let averageTime76 = endTime76 - startTime76
      console.info('appInfoTest xts sortedUniqByTest01 averageTime:' + averageTime76 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        sortedUniqBy([1.1, 1.2, 2.3, 2.4], Math.floor);
      }
      endTime(startTime, 'sortedUniqByTest01')
      expect(JSON.stringify(sortedUniqByArray)).assertEqual('[1.1,2.3]');
    })


    it('sortedUniqByTest02', 0, () => {
      let startTime77 = new Date().getTime()
      console.info('appInfoTest xts sortedUniqByTest02 startTime:' + startTime77 + "us")
      let sortedUniqByArray: number[] = sortedUniqBy([0.1, 0.3, 1.1, 1.2, 2.3, 2.4, 7.1, 7.7], Math.floor);

      let endTime77 = new Date().getTime()
      console.info('appInfoTest xts sortedUniqByTest02 endTime:' + endTime77 + "us")
      let averageTime77 = endTime77 - startTime77
      console.info('appInfoTest xts sortedUniqByTest02 averageTime:' + averageTime77 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        sortedUniqBy([0.1, 0.3, 1.1, 1.2, 2.3, 2.4, 7.1, 7.7], Math.floor);
      }
      endTime(startTime, 'sortedUniqByTest02')
      expect(JSON.stringify(sortedUniqByArray)).assertEqual('[0.1,1.1,2.3,7.1]');
    })


    it('tailTest01', 0, () => {
      let startTime78 = new Date().getTime()
      console.info('appInfoTest xts tailTest01 startTime:' + startTime78 + "us")
      let tailArray: number[] = tail([1, 2, 3]);

      let endTime78 = new Date().getTime()
      console.info('appInfoTest xts tailTest01 endTime:' + endTime78 + "us")
      let averageTime78 = endTime78 - startTime78
      console.info('appInfoTest xts tailTest01 averageTime:' + averageTime78 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        tail([1, 2, 3]);
      }
      endTime(startTime, 'tailTest01')
      expect(JSON.stringify(tailArray)).assertEqual('[2,3]');
    })


    it('tailTest02', 0, () => {
      let startTime79 = new Date().getTime()
      console.info('appInfoTest xts tailTest02 startTime:' + startTime79 + "us")
      let tailArray: Array<ESObject> = tail(['A', 'b', 3, 56, 5]);

      let endTime79 = new Date().getTime()
      console.info('appInfoTest xts tailTest02 endTime:' + endTime79 + "us")
      let averageTime79 = endTime79 - startTime79
      console.info('appInfoTest xts tailTest02 averageTime:' + averageTime79 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        tail(['A', 'b', 3, 56, 5]);
      }
      endTime(startTime, 'tailTest02')
      expect(JSON.stringify(tailArray)).assertEqual('["b",3,56,5]');
    })


    it('takeTest01', 0, () => {
      let startTime80 = new Date().getTime()
      console.info('appInfoTest xts takeTest01 startTime:' + startTime80 + "us")
      let takeArray: number[] = take([1, 2, 3]);

      let endTime80 = new Date().getTime()
      console.info('appInfoTest xts takeTest01 endTime:' + endTime80 + "us")
      let averageTime80 = endTime80 - startTime80
      console.info('appInfoTest xts takeTest01 averageTime:' + averageTime80 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        take([1, 2, 3]);
      }
      endTime(startTime, 'takeTest01')
      expect(JSON.stringify(takeArray)).assertEqual('[1]');
    })


    it('takeTest02', 0, () => {
      let startTime81 = new Date().getTime()
      console.info('appInfoTest xts takeTest02 startTime:' + startTime81 + "us")
      let takeArray: number[] = take([1, 2, 3], 5);

      let endTime81 = new Date().getTime()
      console.info('appInfoTest xts takeTest02 endTime:' + endTime81 + "us")
      let averageTime81 = endTime81 - startTime81
      console.info('appInfoTest xts takeTest02 averageTime:' + averageTime81 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        take([1, 2, 3], 5);
      }
      endTime(startTime, 'takeTest02')
      expect(JSON.stringify(takeArray)).assertEqual('[1,2,3]');
    })


    it('takeRightTest01', 0, () => {
      let startTime82 = new Date().getTime()
      console.info('appInfoTest xts takeRightTest01 startTime:' + startTime82 + "us")
      let takeRightArray: number[] = takeRight([1, 2, 3]);

      let endTime82 = new Date().getTime()
      console.info('appInfoTest xts takeRightTest01 endTime:' + endTime82 + "us")
      let averageTime82 = endTime82 - startTime82
      console.info('appInfoTest xts takeRightTest01 averageTime:' + averageTime82 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        takeRight([1, 2, 3]);
      }
      endTime(startTime, 'takeRightTest01')
      expect(JSON.stringify(takeRightArray)).assertEqual('[3]');
    })


    it('takeRightTest02', 0, () => {
      let startTime83 = new Date().getTime()
      console.info('appInfoTest xts takeRightTest02 startTime:' + startTime83 + "us")
      let takeRightArray: number[] = takeRight([1, 2, 3], 0);

      let endTime83 = new Date().getTime()
      console.info('appInfoTest xts takeRightTest02 endTime:' + endTime83 + "us")
      let averageTime83 = endTime83 - startTime83
      console.info('appInfoTest xts takeRightTest02 averageTime:' + averageTime83 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        takeRight([1, 2, 3], 0);
      }
      endTime(startTime, 'takeRightTest02')
      expect(JSON.stringify(takeRightArray)).assertEqual('[]');
    })


    it('takeRightWhileTest01', 0, () => {
      let startTime84 = new Date().getTime()
      console.info('appInfoTest xts takeRightWhileTest01 startTime:' + startTime84 + "us")
      let users: User[] = [

        {
          user: 'barney', active: true
        },

        {
          user: 'fred', active: false
        },

        {
          user: 'pebbles', active: false
        }

      ];

      let takeRightWhileArray: object = takeRightWhile(users, (o: User) => {
        return !o.active;
      });

      let endTime84 = new Date().getTime()
      console.info('appInfoTest xts takeRightWhileTest01 endTime:' + endTime84 + "us")
      let averageTime84 = endTime84 - startTime84
      console.info('appInfoTest xts takeRightWhileTest01 averageTime:' + averageTime84 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        takeRightWhile(users, (o: User) => {
          return !o.active;
        });
      }
      endTime(startTime, 'takeRightWhileTest01')
      expect(JSON.stringify(takeRightWhileArray))
        .assertEqual('[{"user":"fred","active":false},{"user":"pebbles","active":false}]');
    })


    it('takeRightWhileTest02', 0, () => {
      let startTime85 = new Date().getTime()
      console.info('appInfoTest xts takeRightWhileTest02 startTime:' + startTime85 + "us")
      let users: User[] = [

        {
          user: 'barney', active: true
        },

        {
          user: 'fred', active: false
        },

        {
          user: 'pebbles', active: false
        }

      ];

      let takeRightWhileArray: object = takeRightWhile(users, ['active', false]);

      let endTime85 = new Date().getTime()
      console.info('appInfoTest xts takeRightWhileTest02 endTime:' + endTime85 + "us")
      let averageTime85 = endTime85 - startTime85
      console.info('appInfoTest xts takeRightWhileTest02 averageTime:' + averageTime85 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        takeRightWhile(users, ['active', false]);
      }
      endTime(startTime, 'takeRightWhileTest02')
      expect(JSON.stringify(takeRightWhileArray))
        .assertEqual('[{"user":"fred","active":false},{"user":"pebbles","active":false}]');
    })


    it('takeWhileTest01', 0, () => {
      let startTime86 = new Date().getTime()
      console.info('appInfoTest xts takeWhileTest01 startTime:' + startTime86 + "us")
      let users: User[] = [

        {
          user: 'barney', active: true
        },

        {
          user: 'fred', active: false
        },

        {
          user: 'pebbles', active: false
        }

      ];

      let takeWhileArray: number[] = takeWhile(users, {
        'user': 'barney', 'active': false
      });

      let endTime86 = new Date().getTime()
      console.info('appInfoTest xts takeWhileTest01 endTime:' + endTime86 + "us")
      let averageTime86 = endTime86 - startTime86
      console.info('appInfoTest xts takeWhileTest01 averageTime:' + averageTime86 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        takeWhile(users, {
          'user': 'barney', 'active': false
        });
      }
      endTime(startTime, 'takeWhileTest01')
      expect(JSON.stringify(takeWhileArray)).assertEqual('[]');
    })


    it('takeWhileTest02', 0, () => {
      let startTime87 = new Date().getTime()
      console.info('appInfoTest xts takeWhileTest02 startTime:' + startTime87 + "us")
      let users: User[] = [

        {
          user: 'barney', active: true
        },

        {
          user: 'fred', active: false
        },

        {
          user: 'pebbles', active: false
        }

      ];

      let takeWhileArray: number[] = takeWhile(users, ['active', false]);

      let endTime87 = new Date().getTime()
      console.info('appInfoTest xts takeWhileTest02 endTime:' + endTime87 + "us")
      let averageTime87 = endTime87 - startTime87
      console.info('appInfoTest xts takeWhileTest02 averageTime:' + averageTime87 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        takeWhile(users, ['active', false]);
      }
      endTime(startTime, 'takeWhileTest02')
      expect(JSON.stringify(takeWhileArray)).assertEqual('[]');
    })


    it('unionTest01', 0, () => {
      let startTime88 = new Date().getTime()
      console.info('appInfoTest xts unionTest01 startTime:' + startTime88 + "us")
      let unionArray: number[] = union([2], [1, 2]);

      let endTime88 = new Date().getTime()
      console.info('appInfoTest xts unionTest01 endTime:' + endTime88 + "us")
      let averageTime88 = endTime88 - startTime88
      console.info('appInfoTest xts unionTest01 averageTime:' + averageTime88 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        union([2], [1, 2]);
      }
      endTime(startTime, 'unionTest01')
      expect(JSON.stringify(unionArray)).assertEqual('[2,1]');
    })


    it('unionTest02', 0, () => {
      let startTime89 = new Date().getTime()
      console.info('appInfoTest xts unionTest02 startTime:' + startTime89 + "us")
      let unionArray: Array<ESObject> = union([2], [1, 2], ['a'], ['56']);

      let endTime89 = new Date().getTime()
      console.info('appInfoTest xts unionTest02 endTime:' + endTime89 + "us")
      let averageTime89 = endTime89 - startTime89
      console.info('appInfoTest xts unionTest02 averageTime:' + averageTime89 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        union([2], [1, 2], ['a'], ['56']);
      }
      endTime(startTime, 'unionTest02')
      expect(JSON.stringify(unionArray)).assertEqual('[2,1,"a","56"]');
    })


    it('unionWithTest01', 0, () => {
      let startTime90 = new Date().getTime()
      console.info('appInfoTest xts unionWithTest01 startTime:' + startTime90 + "us")
      let objects = [{
        x: 1, y: 2
      }, {
        x: 2, y: 1
      }] as XY[];

      let others = [{
        x: 1, y: 1
      }, {
        x: 1, y: 2
      }] as XY[];

      let unionWithArray: object = unionWith(objects, others, isEqual);

      let endTime90 = new Date().getTime()
      console.info('appInfoTest xts unionWithTest01 endTime:' + endTime90 + "us")
      let averageTime90 = endTime90 - startTime90
      console.info('appInfoTest xts unionWithTest01 averageTime:' + averageTime90 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        unionWith(objects, others, isEqual);
      }
      endTime(startTime, 'unionWithTest01')
      expect(JSON.stringify(unionWithArray)).assertEqual('[{"x":1,"y":2},{"x":2,"y":1},{"x":1,"y":1}]');
    })


    it('unionWithTest02', 0, () => {
      let startTime91 = new Date().getTime()
      console.info('appInfoTest xts unionWithTest02 startTime:' + startTime91 + "us")
      let objects = [{
        a: 12, b: 23
      } as AB, {
        c: 2, d: 11
      } as CD];

      let others = [{
        x: 1, y: 1
      } as XY, {
        a: 12, b: 23
      } as AB];

      let unionWithArray: object = unionWith(objects, others, isEqual);

      let endTime91 = new Date().getTime()
      console.info('appInfoTest xts unionWithTest02 endTime:' + endTime91 + "us")
      let averageTime91 = endTime91 - startTime91
      console.info('appInfoTest xts unionWithTest02 averageTime:' + averageTime91 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        unionWith(objects, others, isEqual);
      }
      endTime(startTime, 'unionWithTest02')
      expect(JSON.stringify(unionWithArray)).assertEqual('[{"a":12,"b":23},{"c":2,"d":11},{"x":1,"y":1}]');
    })


    it('uniqTest01', 0, () => {
      let startTime92 = new Date().getTime()
      console.info('appInfoTest xts uniqTest01 startTime:' + startTime92 + "us")
      let uniqArray: number = uniq([2, 1, 2]);

      let endTime92 = new Date().getTime()
      console.info('appInfoTest xts uniqTest01 endTime:' + endTime92 + "us")
      let averageTime92 = endTime92 - startTime92
      console.info('appInfoTest xts uniqTest01 averageTime:' + averageTime92 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        uniq([2, 1, 2]);
      }
      endTime(startTime, 'uniqTest01')
      expect(JSON.stringify(uniqArray)).assertEqual('[2,1]');
    })


    it('uniqTest02', 0, () => {
      let startTime93 = new Date().getTime()
      console.info('appInfoTest xts uniqTest02 startTime:' + startTime93 + "us")
      let uniqArray: Array<ESObject> = uniq([1, , 3, 3, 2, 4, 5, 6, 76, 6, 3, 2, 22, 1, 2]);

      let endTime93 = new Date().getTime()
      console.info('appInfoTest xts uniqTest02 endTime:' + endTime93 + "us")
      let averageTime93 = endTime93 - startTime93
      console.info('appInfoTest xts uniqTest02 averageTime:' + averageTime93 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        uniq([1, , 3, 3, 2, 4, 5, 6, 76, 6, 3, 2, 22, 1, 2]);
      }
      endTime(startTime, 'uniqTest02')
      expect(JSON.stringify(uniqArray)).assertEqual('[1,null,3,2,4,5,6,76,22]');
    })


    it('unzipTest01', 0, () => {
      let startTime94 = new Date().getTime()
      console.info('appInfoTest xts unzipTest01 startTime:' + startTime94 + "us")
      let zipped: number[] = zip(['fred', 'barney'], [30, 40], [true, false]);

      let unzipArray: ESObject = unzip(zipped);

      let endTime94 = new Date().getTime()
      console.info('appInfoTest xts unzipTest01 endTime:' + endTime94 + "us")
      let averageTime94 = endTime94 - startTime94
      console.info('appInfoTest xts unzipTest01 averageTime:' + averageTime94 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        unzip(zipped)
      }
      endTime(startTime, 'unzipTest01')
      expect(JSON.stringify(unzipArray)).assertEqual('[["fred","barney"],[30,40],[true,false]]');
    })


    it('unzipTest02', 0, () => {
      let startTime95 = new Date().getTime()
      console.info('appInfoTest xts unzipTest02 startTime:' + startTime95 + "us")
      let zipped: number[] = zip(['fred', 'world'], [2, 11], [null]);

      let unzipArray: number[] = unzip(zipped);

      let endTime95 = new Date().getTime()
      console.info('appInfoTest xts unzipTest02 endTime:' + endTime95 + "us")
      let averageTime95 = endTime95 - startTime95
      console.info('appInfoTest xts unzipTest02 averageTime:' + averageTime95 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        unzip(zipped)
      }
      endTime(startTime, 'unzipTest02')
      expect(JSON.stringify(unzipArray)).assertEqual('[["fred","world"],[2,11],[null,null]]');
    })


    it('withoutTest01', 0, () => {
      let startTime96 = new Date().getTime()
      console.info('appInfoTest xts withoutTest01 startTime:' + startTime96 + "us")
      let withoutArray: number[] = without([2, 1, 2, 3], 1, 2);

      let endTime96 = new Date().getTime()
      console.info('appInfoTest xts withoutTest01 endTime:' + endTime96 + "us")
      let averageTime96 = endTime96 - startTime96
      console.info('appInfoTest xts withoutTest01 averageTime:' + averageTime96 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        without([2, 1, 2, 3], 1, 2);
      }
      endTime(startTime, 'withoutTest01')
      expect(JSON.stringify(withoutArray)).assertEqual('[3]');
    })


    it('withoutTest02', 0, () => {
      let startTime97 = new Date().getTime()
      console.info('appInfoTest xts withoutTest02 startTime:' + startTime97 + "us")
      let withoutArray: number[] = without([5, 7, 7, 9, 4, 1, 2, 3], 7, 3);

      let endTime97 = new Date().getTime()
      console.info('appInfoTest xts withoutTest02 endTime:' + endTime97 + "us")
      let averageTime97 = endTime97 - startTime97
      console.info('appInfoTest xts withoutTest02 averageTime:' + averageTime97 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        without([5, 7, 7, 9, 4, 1, 2, 3], 7, 3);
      }
      endTime(startTime, 'withoutTest02')
      expect(JSON.stringify(withoutArray)).assertEqual('[5,9,4,1,2]');
    })


    it("xorTest01", 0, () => {
      let startTime98 = new Date().getTime()
      console.info('appInfoTest xts withoutTest02 startTime:' + startTime98 + "us")
      let xorArray: number[] = xor([2, 1], [2, 3]);

      let endTime98 = new Date().getTime()
      console.info('appInfoTest xts withoutTest02 endTime:' + endTime98 + "us")
      let averageTime98 = endTime98 - startTime98
      console.info('appInfoTest xts withoutTest02 averageTime:' + averageTime98 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        xor([2, 1], [2, 3]);
      }
      endTime(startTime, 'xorTest01')
      expect(JSON.stringify(xorArray)).assertEqual('[1,3]');
    })


    it("xorTest02", 0, () => {
      let startTime99 = new Date().getTime()
      console.info('appInfoTest xts withoutTest02 startTime:' + startTime99 + "us")
      let xorArray: number[] = xor([5, 3, 1, 6, 9], [1, 5, 2, 3, 7]);

      let endTime99 = new Date().getTime()
      console.info('appInfoTest xts withoutTest02 endTime:' + endTime99 + "us")
      let averageTime99 = endTime99 - startTime99
      console.info('appInfoTest xts withoutTest02 averageTime:' + averageTime99 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        xor([5, 3, 1, 6, 9], [1, 5, 2, 3, 7]);
      }
      endTime(startTime, 'xorTest02')
      expect(JSON.stringify(xorArray)).assertEqual('[6,9,2,7]');
    })


    it("xorByTest01", 0, () => {
      let startTime100 = new Date().getTime()
      console.info('appInfoTest xts withoutTest02 startTime:' + startTime100 + "us")
      let xorByArray: number[] = xorBy([2.1, 1.2], [2.3, 3.4], Math.floor);

      let endTime100 = new Date().getTime()
      console.info('appInfoTest xts withoutTest02 endTime:' + endTime100 + "us")
      let averageTime100 = endTime100 - startTime100
      console.info('appInfoTest xts withoutTest02 averageTime:' + averageTime100 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        xorBy([2.1, 1.2], [2.3, 3.4], Math.floor);
      }
      endTime(startTime, 'xorByTest01')
      expect(JSON.stringify(xorByArray)).assertEqual('[1.2,3.4]');
    })


    it("xorByTest02", 0, () => {
      let startTime101 = new Date().getTime()
      console.info('appInfoTest xts withoutTest02 startTime:' + startTime101 + "us")
      let xorByArray: object = xorBy([{
        'x': 1
      }], [{
        'x': 2
      }, {
        'x': 1
      }], 'x');

      let endTime101 = new Date().getTime()
      console.info('appInfoTest xts withoutTest02 endTime:' + endTime101 + "us")
      let averageTime101 = endTime101 - startTime101
      console.info('appInfoTest xts withoutTest02 averageTime:' + averageTime101 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        xorBy([{
          'x': 1
        }], [{
          'x': 2
        }, {
          'x': 1
        }], 'x');
      }
      endTime(startTime, 'xorByTest02')
      expect(JSON.stringify(xorByArray)).assertEqual('[{"x":2}]');
    })


    it("xorWithTest01", 0, () => {
      let startTime102 = new Date().getTime()
      console.info('appInfoTest xts withoutTest02 startTime:' + startTime102 + "us")
      let objects = [{
        x: 1, y: 2
      }, {
        x: 2, y: 1
      }] as XY[];

      let others = [{
        x: 1, y: 1
      }, {
        x: 1, y: 2
      }] as XY[];


      let xorWithArray: object = xorWith(objects, others, isEqual);

      let endTime102 = new Date().getTime()
      console.info('appInfoTest xts withoutTest02 endTime:' + endTime102 + "us")
      let averageTime102 = endTime102 - startTime102
      console.info('appInfoTest xts withoutTest02 averageTime:' + averageTime102 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        xorWith(objects, others, isEqual);
      }
      endTime(startTime, 'xorWithTest01')
      expect(JSON.stringify(xorWithArray)).assertEqual('[{"x":2,"y":1},{"x":1,"y":1}]');
    })


    it("xorWithTest02", 0, () => {
      let startTime103 = new Date().getTime()
      console.info('appInfoTest xts withoutTest02 startTime:' + startTime103 + "us")
      let objects = [{
        a: 12, b: 23
      } as AB, {
        c: 2, d: 11
      } as CD];

      let others = [{
        x: 1, y: 1
      } as XY, {
        a: 12, b: 23
      } as AB];


      let xorWithArray: object = xorWith(objects, others, isEqual);

      let endTime103 = new Date().getTime()
      console.info('appInfoTest xts withoutTest02 endTime:' + endTime103 + "us")
      let averageTime103 = endTime103 - startTime103
      console.info('appInfoTest xts withoutTest02 averageTime:' + averageTime103 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        xorWith(objects, others, isEqual);
      }
      endTime(startTime, 'xorWithTest02')
      expect(JSON.stringify(xorWithArray)).assertEqual('[{"c":2,"d":11},{"x":1,"y":1}]');
    })


    it("zipObjectTest01", 0, () => {
      let startTime104 = new Date().getTime()
      console.info('appInfoTest xts withoutTest02 startTime:' + startTime104 + "us")
      let zipObjectArray: object = zipObject(['a', 'b'], [1, 2]);

      let endTime104 = new Date().getTime()
      console.info('appInfoTest xts withoutTest02 endTime:' + endTime104 + "us")
      let averageTime104 = endTime104 - startTime104
      console.info('appInfoTest xts withoutTest02 averageTime:' + averageTime104 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        zipObject(['a', 'b'], [1, 2]);
      }
      endTime(startTime, 'zipObjectTest01')
      expect(JSON.stringify(zipObjectArray)).assertEqual('{"a":1,"b":2}');
    })


    it("zipObjectTest02", 0, () => {
      let startTime105 = new Date().getTime()
      console.info('appInfoTest xts withoutTest02 startTime:' + startTime105 + "us")
      let zipObjectArray: object = zipObject(['a', 'b', 'c', 'd'], [5, 3, 6, 4]);

      let endTime105 = new Date().getTime()
      console.info('appInfoTest xts withoutTest02 endTime:' + endTime105 + "us")
      let averageTime105 = endTime105 - startTime105
      console.info('appInfoTest xts withoutTest02 averageTime:' + averageTime105 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        zipObject(['a', 'b', 'c', 'd'], [5, 3, 6, 4]);
      }
      endTime(startTime, 'zipObjectTest02')
      expect(JSON.stringify(zipObjectArray)).assertEqual('{"a":5,"b":3,"c":6,"d":4}');
    })


    it("zipObjectDeepTest01", 0, () => {
      let startTime106 = new Date().getTime()
      console.info('appInfoTest xts withoutTest02 startTime:' + startTime106 + "us")
      let zipObjectDeepArray: object = zipObjectDeep(['a.b[0].c', 'a.b[1].d'], [1, 2]);

      let endTime106 = new Date().getTime()
      console.info('appInfoTest xts withoutTest02 endTime:' + endTime106 + "us")
      let averageTime106 = endTime106 - startTime106
      console.info('appInfoTest xts withoutTest02 averageTime:' + averageTime106 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        zipObjectDeep(['a.b[0].c', 'a.b[1].d'], [1, 2]);
      }
      endTime(startTime, 'zipObjectDeepTest01')
      expect(JSON.stringify(zipObjectDeepArray)).assertEqual('{"a":{"b":[{"c":1},{"d":2}]}}');
    })


    it("zipObjectDeepTest02", 0, () => {
      let startTime107 = new Date().getTime()
      console.info('appInfoTest xts withoutTest02 startTime:' + startTime107 + "us")
      let zipObjectDeepArray: object = zipObjectDeep(['a.b[0].c', 'a.b[1].d'], [7, 8]);

      let endTime107 = new Date().getTime()
      console.info('appInfoTest xts withoutTest02 endTime:' + endTime107 + "us")
      let averageTime107 = endTime107 - startTime107
      console.info('appInfoTest xts withoutTest02 averageTime:' + averageTime107 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        zipObjectDeep(['a.b[0].c', 'a.b[1].d'], [7, 8]);
      }
      endTime(startTime, 'zipObjectDeepTest02')
      expect(JSON.stringify(zipObjectDeepArray)).assertEqual('{"a":{"b":[{"c":7},{"d":8}]}}');
    })


    it("zipWithTest01", 0, () => {
      let startTime108 = new Date().getTime()
      console.info('appInfoTest xts withoutTest02 startTime:' + startTime108 + "us")
      let zipWithArray: number[] = zipWith([1, 2], [10, 20], [100, 200], (a: number, b: number, c: number) => {

        return a + b + c;

      });

      let endTime108 = new Date().getTime()
      console.info('appInfoTest xts withoutTest02 endTime:' + endTime108 + "us")
      let averageTime108 = endTime108 - startTime108
      console.info('appInfoTest xts withoutTest02 averageTime:' + averageTime108 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        zipWith([1, 2], [10, 20], [100, 200], (a: number, b: number, c: number) => {
          return a + b + c;
        });
      }
      endTime(startTime, 'zipWithTest01')
      expect(JSON.stringify(zipWithArray)).assertEqual('[111,222]');
    })


    it("zipWithTest02", 0, () => {
      let startTime109 = new Date().getTime()
      console.info('appInfoTest xts withoutTest02 startTime:' + startTime109 + "us")
      let zipWithArray: number[] = zipWith([4, 6], [65, 86], [324, 246], (a: number, b: number, c: number) => {
        return a + b + c;
      });
      let endTime109 = new Date().getTime()
      console.info('appInfoTest xts withoutTest02 endTime:' + endTime109 + "us")
      let averageTime109 = endTime109 - startTime109
      console.info('appInfoTest xts withoutTest02 averageTime:' + averageTime109 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        zipWith([4, 6], [65, 86], [324, 246], (a: number, b: number, c: number) => {
          return a + b + c;
        });
      }
      endTime(startTime, 'zipWithTest02')
      expect(JSON.stringify(zipWithArray)).assertEqual('[393,338]');
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