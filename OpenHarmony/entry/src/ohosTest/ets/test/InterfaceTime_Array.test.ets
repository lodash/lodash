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
  chunk, compact, concat, difference, differenceBy, differenceWith, drop, dropRight,
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

export default function InterfaceTime_Array() {
  describe('interfaceTime_Array', () => {

    const BASE_COUNT = 2000
    const BASELINE_CREATEHTTP = 2000

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

    it('chunkTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        chunk(['a', 'b', 'c', 'd'], 2);
      }
      let endTime = new Date().getTime()
      console.log("chunk endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("chunk averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('compactTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        compact([0, 1, false, 2, '', 3]);
      }
      let endTime = new Date().getTime()
      console.log("compact endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("compact averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('concatTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let array: number[] = [1];
      for (let index = 0; index < BASE_COUNT; index++) {
        concat(array, 2, [3], [[4]]);
      }
      let endTime = new Date().getTime()
      console.log("concat endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("concat averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })
  
    it('differenceTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        difference([3, 2, 1], [4, 2]);
      }
      let endTime = new Date().getTime()
      console.log("difference endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("difference averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('differenceByTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        differenceBy([3.1, 2.2, 1.3], [4.4, 2.5], Math.floor);
      }
      let endTime = new Date().getTime()
      console.log("differenceBy endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("differenceBy averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('differenceWithTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let objects = [{
        x: 1, y: 2
      } as XY, {
        x: 2, y: 1
      } as XY];
      for (let index = 0; index < BASE_COUNT; index++) {
        differenceWith(objects, [{
          'x': 1, 'y': 2
        }], isEqual);
      }
      let endTime = new Date().getTime()
      console.log("differenceWith endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("differenceWith averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('dropTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        drop([1, 2, 3]);
      }
      let endTime = new Date().getTime()
      console.log("drop endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("drop averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('dropRightTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        dropRight([1, 2, 3]);
      }
      let endTime = new Date().getTime()
      console.log("dropRight endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("dropRight averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('dropRightWhileTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
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
      for (let index = 0; index < BASE_COUNT; index++) {
        dropRightWhile(users, (o: User) => {
          return !o.active;
        });
      }
      let endTime = new Date().getTime()
      console.log("dropRightWhile endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("dropRightWhile averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('dropWhileTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
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
      for (let index = 0; index < BASE_COUNT; index++) {
        dropWhile(users, (o: User) => {
          return !o.active;
        });
      }
      let endTime = new Date().getTime()
      console.log("dropWhile endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("dropWhile averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('fillTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let array = [1, 2, 3];
      for (let index = 0; index < BASE_COUNT; index++) {
        fill(array, 'a');
      }
      let endTime = new Date().getTime()
      console.log("fill endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("fill averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('findIndexTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
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
      for (let index = 0; index < BASE_COUNT; index++) {
        findIndex(users, (o: User) => {
          return o.user == 'barney';
        });
      }
      let endTime = new Date().getTime()
      console.log("findIndex endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("findIndex averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('findLastIndexTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
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
      for (let index = 0; index < BASE_COUNT; index++) {
        findLastIndex(users, (o: User) => {
          return o.user == 'pebbles';
        });
      }
      let endTime = new Date().getTime()
      console.log("findLastIndex endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("findLastIndex averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('headTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        head([1, 2, 3]);
      }
      let endTime = new Date().getTime()
      console.log("head endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("head averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('indexOfTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        indexOf([1, 2, 1, 2], 2);
      }
      let endTime = new Date().getTime()
      console.log("indexOf endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("indexOf averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('initialTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        initial([1, 2, 3]);
      }
      let endTime = new Date().getTime()
      console.log("initial endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("initial averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('intersectionTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        intersection([2, 1], [4, 2], [1, 2]);
      }
      let endTime = new Date().getTime()
      console.log("intersection endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("intersection averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('intersectionByTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        intersectionBy([2.1, 1.2], [4.3, 2.4], Math.floor);
      }
      let endTime = new Date().getTime()
      console.log("intersectionBy endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("intersectionBy averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('intersectionWithTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
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
      for (let index = 0; index < BASE_COUNT; index++) {
        intersectionWith(objects, others, isEqual);
      }
      let endTime = new Date().getTime()
      console.log("intersectionWith endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("intersectionWith averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('joinTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        join(['a', 'b', 'c'], '~');
      }
      let endTime = new Date().getTime()
      console.log("join endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("join averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('lastTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        last([1, 2, 3]);
      }
      let endTime = new Date().getTime()
      console.log("last endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("last averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('lastIndexOfTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        lastIndexOf([1, 2, 1, 2], 2);
      }
      let endTime = new Date().getTime()
      console.log("lastIndexOf endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("lastIndexOf averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('nthTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let array = ['a', 'b', 'c', 'd'];
      for (let index = 0; index < BASE_COUNT; index++) {
        nth(array, 1);
      }
      let endTime = new Date().getTime()
      console.log("nth endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("nth averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('pullTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let array = [1, 2, 3, 1, 2, 3];
      for (let index = 0; index < BASE_COUNT; index++) {
        pull(array, 2, 3);
      }
      let endTime = new Date().getTime()
      console.log("pull endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("pull averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('pullAllTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let array = ['a', 'b', 3, 1, 2, 3, 'c'];
      for (let index = 0; index < BASE_COUNT; index++) {
        pullAll(array, ['a', 3]);
      }
      let endTime = new Date().getTime()
      console.log("pullAll endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("pullAll averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('pullAllByTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let array = [{
        x: 1
      }, {
        x: 2
      }, {
        x: 3
      }, {
        x: 1
      }] as XY[];

      for (let index = 0; index < BASE_COUNT; index++) {
        pullAllBy(array, [{
          'x': 1
        }, {
          'x': 3
        }], 'x');
      }
      let endTime = new Date().getTime()
      console.log("pullAllBy endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("pullAllBy averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('pullAllWithTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let array = [{
        x: 1, y: 2
      }, {
        x: 3, y: 4
      }, {
        x: 5, y: 6
      }] as XY[];
      for (let index = 0; index < BASE_COUNT; index++) {
        pullAllWith(array, [{
          'x': 3, 'y': 4
        }], isEqual);
      }
      let endTime = new Date().getTime()
      console.log("pullAllWith endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("pullAllWith averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('pullAtTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let array = [5, 10, 15, 20];
      for (let index = 0; index < BASE_COUNT; index++) {
        pullAt(array, 1, 3);
      }
      let endTime = new Date().getTime()
      console.log("pullAt endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("pullAt averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('removeTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let array = [1, 2, 3, 4];
      for (let index = 0; index < BASE_COUNT; index++) {
        remove(array, (n: number) => {
          return n % 2 == 0;
        });
      }
      let endTime = new Date().getTime()
      console.log("remove endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("remove averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('reverseTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let array = [1, 2, 3];
      for (let index = 0; index < BASE_COUNT; index++) {
        reverse(array);
      }
      let endTime = new Date().getTime()
      console.log("reverse endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("reverse averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('sliceTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let array = [[1, 12], [12, 8], 7, 8]
      for (let index = 0; index < BASE_COUNT; index++) {
        slice(array, 1, 3);
      }
      let endTime = new Date().getTime()
      console.log("slice endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("slice averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('sortedIndexTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        sortedIndex([30, 50], 40);
      }
      let endTime = new Date().getTime()
      console.log("sortedIndex endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("sortedIndex averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('sortedIndexByTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let objects = [{
        x: 4
      }, {
        x: 5
      }] as X[];
      for (let index = 0; index < BASE_COUNT; index++) {
        sortedIndexBy(objects, {
          'x': 4
        }, (o: X) => {
          return o.x;
        });
      }
      let endTime = new Date().getTime()
      console.log("sortedIndexBy endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("sortedIndexBy averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('sortedIndexOfTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        sortedIndexOf([4, 5, 5, 5, 6], 5);
      }
      let endTime = new Date().getTime()
      console.log("sortedIndexOfTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("sortedIndexOfTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('sortedLastIndexTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        sortedLastIndex([4, 5, 5, 5, 6], 5);
      }
      let endTime = new Date().getTime()
      console.log("sortedLastIndexTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("sortedLastIndexTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('sortedLastIndexTest0', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        sortedLastIndex([4, 5, 9, 4, 20, , 34, 0, 11], 7);
      }
      let endTime = new Date().getTime()
      console.log("sortedLastIndexTest0 endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("sortedLastIndexTest0 averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('sortedLastIndexByTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let objects = [{
        x: 4
      }, {
        x: 5
      }] as X[];
      for (let index = 0; index < BASE_COUNT; index++) {
        sortedLastIndexBy(objects, {
          'x': 4
        }, (o: X) => {
          return o.x;
        });
      }
      let endTime = new Date().getTime()
      console.log("sortedLastIndexByTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("sortedLastIndexByTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('sortedLastIndexByTest0', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let objects = [{
        x: 4
      }, {
        x: 5
      }] as X[];
      for (let index = 0; index < BASE_COUNT; index++) {
        sortedLastIndexBy(objects, {
          'x': 4
        }, 'x');
      }
      let endTime = new Date().getTime()
      console.log("sortedLastIndexByTest0 endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("sortedLastIndexByTest0 averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('sortedLastIndexOfTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        sortedLastIndexOf([4, 5, 5, 5, 6], 5);
      }
      let endTime = new Date().getTime()
      console.log("sortedLastIndexOfTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("sortedLastIndexOfTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('sortedUniqTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        sortedUniq([1, 1, 2]);
      }
      let endTime = new Date().getTime()
      console.log("sortedUniqTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("sortedUniqTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('sortedUniqTest0', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        sortedUniq([1, 1, 2, 3, 5, 6, 7, 10, 3, 5, 5]);
      }
      let endTime = new Date().getTime()
      console.log("sortedUniqTest0 endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("sortedUniqTest0 averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('sortedUniqByTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        sortedUniqBy([1.1, 1.2, 2.3, 2.4], Math.floor);
      }
      let endTime = new Date().getTime()
      console.log("sortedUniqByTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("sortedUniqByTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('sortedUniqByTest0', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        sortedUniqBy([0.1, 0.3, 1.1, 1.2, 2.3, 2.4, 7.1, 7.7], Math.floor);
      }
      let endTime = new Date().getTime()
      console.log("sortedUniqByTest0 endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("sortedUniqByTest0 averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('tailTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        tail([1, 2, 3]);
      }
      let endTime = new Date().getTime()
      console.log("tailTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("tailTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('takeTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        take([1, 2, 3]);
      }
      let endTime = new Date().getTime()
      console.log("take endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("take averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('takeRightTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        takeRight([1, 2, 3]);
      }
      let endTime = new Date().getTime()
      console.log("takeRightTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("takeRightTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('takeRightWhileTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
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
      for (let index = 0; index < BASE_COUNT; index++) {
        takeRightWhile(users, (o: User) => {
          return !o.active;
        });
      }
      let endTime = new Date().getTime()
      console.log("takeRightWhileTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("takeRightWhileTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('takeWhileTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
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
      for (let index = 0; index < BASE_COUNT; index++) {
        takeWhile(users, { 'user': 'barney', 'active': false });
      }
      let endTime = new Date().getTime()
      console.log("takeWhileTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("takeWhileTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('unionTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        union([2], [1, 2]);
      }
      let endTime = new Date().getTime()
      console.log("unionTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("unionTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('unionWithTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
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
      for (let index = 0; index < BASE_COUNT; index++) {
        unionWith(objects, others, isEqual);
      }
      let endTime = new Date().getTime()
      console.log("unionWithTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("unionWithTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('uniqTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        uniq([2, 1, 2]);
      }
      let endTime = new Date().getTime()
      console.log("uniqTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("uniqTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('unzipTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let zipped: number[] = zip(['fred', 'barney'], [30, 40], [true, false]);
      for (let index = 0; index < BASE_COUNT; index++) {
        unzip(zipped);
      }
      let endTime = new Date().getTime()
      console.log("unzipTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("unzipTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('unzipTest0', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let zipped: number[] = zip(['fred', 'world'], [2, 11], [null]);
      for (let index = 0; index < BASE_COUNT; index++) {
        unzip(zipped);
      }
      let endTime = new Date().getTime()
      console.log("unzipTest0 endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("unzipTest0 averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('withoutTest', TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        without([2, 1, 2, 3], 1, 2);
      }
      let endTime = new Date().getTime()
      console.log("withoutTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("withoutTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it("xorTest", TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        xor([2, 1], [2, 3]);
      }
      let endTime = new Date().getTime()
      console.log("xorTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("xorTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it("xorByTest", TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        xorBy([2.1, 1.2], [2.3, 3.4], Math.floor);
      }
      let endTime = new Date().getTime()
      console.log("xorByTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("xorByTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it("xorWithTest", TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
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
      for (let index = 0; index < BASE_COUNT; index++) {
        xorWith(objects, others, isEqual);
      }
      let endTime = new Date().getTime()
      console.log("xorWithTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("xorWithTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it("xorWithTest0", TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
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
      for (let index = 0; index < BASE_COUNT; index++) {
        xorWith(objects, others, isEqual);
      }
      let endTime = new Date().getTime()
      console.log("xorWithTest0 endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("xorWithTest0 averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })


    it("zipObjectTest", TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        zipObject(['a', 'b'], [1, 2]);
      }
      let endTime = new Date().getTime()
      console.log("zipObjectTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("zipObjectTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it("zipObjectDeepTest", TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        zipObjectDeep(['a.b[0].c', 'a.b[1].d'], [1, 2]);
      }
      let endTime = new Date().getTime()
      console.log("zipObjectDeepTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("zipObjectDeepTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it("zipWithTest", TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        zipWith([1, 2], [10, 20], [100, 200], (a: number, b: number, c: number) => {
          return a + b + c;
        });
      }
      let endTime = new Date().getTime()
      console.log("zipWithTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("zipWithTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })
  })
}