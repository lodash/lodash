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

export default function InterfaceTime_Collection() {
  describe('interfaceTime_Collection', () => {

    const BASE_COUNT = 2000
    const BASELINE_CREATEHTTP = 2000

    class User {
      user: string = ''
      active: boolean = true
      age: number = 0
    }

    class Age {
      user: string = ''
      age: number = 0
    }

    class Array {
      dir: string = ''
      code: number = 0
    }

    it('countByTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        countBy([6.1, 4.2, 6.3], Math.floor);
      }
      let endTime = new Date().getTime()
      console.log("countByTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("countByTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('everyTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        every([true, 1, null, 'yes'], Boolean);
      }
      let endTime = new Date().getTime()
      console.log("everyTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("everyTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('filterTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let users: User[] = [

        {
          user: 'barney', age: 36, active: true
        },

        {
          user: 'fred', age: 40, active: false
        }

      ];
      for (let index = 0; index < BASE_COUNT; index++) {
        filter(users, (o: User) => {
          return !o.active;
        });
      }
      let endTime = new Date().getTime()
      console.log("filterTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("filterTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('findTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
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
      for (let index = 0; index < BASE_COUNT; index++) {
        find(users, (o: User) => { return o.age < 40; });
      }
      let endTime = new Date().getTime()
      console.log("findTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("findTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('findLastTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        findLast([1, 2, 3, 4], (n: number) => {
          return n % 2 == 1;
        });
      }
      let endTime = new Date().getTime()
      console.log("findLastTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("findLastTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('flatMapTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let duplicate: (n: number) => void = (n: number): number[] => {

        return [n, n];

      }
      for (let index = 0; index < BASE_COUNT; index++) {
        flatMap([43, 62], duplicate);
      }
      let endTime = new Date().getTime()
      console.log("flatMapTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("flatMapTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('flatMapDeepTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let duplicate: (n: number) => void = (n: number): [[number, number]][] => {

        return [[[n, n]]];

      }
      for (let index = 0; index < BASE_COUNT; index++) {
        flatMapDeep([1, 2], duplicate);
      }
      let endTime = new Date().getTime()
      console.log("flatMapDeepTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("flatMapDeepTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('flatMapDepthTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let duplicate: (n: number) => void = (n: number): [[number, number]][] => {

        return [[[n, n]]];

      }
      for (let index = 0; index < BASE_COUNT; index++) {
        flatMapDepth([1, 2], duplicate, 2);
      }
      let endTime = new Date().getTime()
      console.log("flatMapDepthTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("flatMapDepthTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('groupByTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        groupBy([6.1, 4.2, 6.3], Math.floor);
      }
      let endTime = new Date().getTime()
      console.log("groupByTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("groupByTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('includesTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        includes([1, 2, 3], 1);
      }
      let endTime = new Date().getTime()
      console.log("includesTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("includesTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('invokeMapTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        invokeMap([123, 456], '');
      }
      let endTime = new Date().getTime()
      console.log("invokeMapTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("invokeMapTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('keyByTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let array: Array[] = [

        {
          dir: 'left', code: 97
        },

        {
          dir: 'right', code: 100
        }

      ];
      for (let index = 0; index < BASE_COUNT; index++) {
        keyBy(array, (o: Array) => {

          return String.fromCharCode(o.code);

        });
      }
      let endTime = new Date().getTime()
      console.log("keyByTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("keyByTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('mapTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let square: (n: number) => void = (n: number): number => {

        return n * n;

      }
      for (let index = 0; index < BASE_COUNT; index++) {
        map([4, 8], square);
      }
      let endTime = new Date().getTime()
      console.log("mapTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("mapTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('orderByTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
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
      for (let index = 0; index < BASE_COUNT; index++) {
        orderBy(users, ['user', 'age'], ['asc', 'desc']);
      }
      let endTime = new Date().getTime()
      console.log("orderByTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("orderByTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('partitionTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
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
      for (let index = 0; index < BASE_COUNT; index++) {
        partition(users, (o: User) => {
          return o.active;
        });
      }
      let endTime = new Date().getTime()
      console.log("partitionTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("partitionTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('reduceTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        reduce([1, 2], (sum: number, n: number) => {

          return sum + n;

        }, 0);
      }
      let endTime = new Date().getTime()
      console.log("reduceTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("reduceTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('reduceRightTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let array = [[0, 1], [2, 3], [4, 5]];
      for (let index = 0; index < BASE_COUNT; index++) {
        reduceRight(array, (flattened: number[], other: number[]) => {

          return flattened.concat(other);

        }, []);
      }
      let endTime = new Date().getTime()
      console.log("reduceRightTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("reduceRightTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('rejectTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let users: User[] = [

        {
          user: 'barney', age: 36, active: false
        },

        {
          user: 'fred', age: 40, active: true
        }

      ];
      for (let index = 0; index < BASE_COUNT; index++) {
        reject(users, (o: User) => {
          return !o.active;
        });
      }
      let endTime = new Date().getTime()
      console.log("rejectTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("rejectTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('sizeTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        size([1, 2, 3]);
      }
      let endTime = new Date().getTime()
      console.log("sizeTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("sizeTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('someTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        some([null, 0, 'yes', false], Boolean);
      }
      let endTime = new Date().getTime()
      console.log("someTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("someTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('sortByTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
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
      for (let index = 0; index < BASE_COUNT; index++) {
        sortBy(users, (o: Age) => {
          return o.user;
        });
      }
      let endTime = new Date().getTime()
      console.log("sortByTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("sortByTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })
  })
}