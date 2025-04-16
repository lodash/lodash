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
import { after, ary, before, bind, bindKey, curry, curryRight, debounce, defer, delay,
  filter,
  flip,
  identity,
  initial,
  last,
  map,
  memoize,
  negate,
  once,
  overArgs,
  partial,
  partialRight,
  rearg,
  rest,
  size,
  slice,
  spread,
  throttle,
  unary,
  wrap,
  escape
} from 'lodash';

const BASE_COUNT: number = 2000;

export default function functionTest() {
  describe('FunctionTest', () => {
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
      Name: string = ''
      Address: string = ''
    }
    class users {
      user: string = ''
    }
    class Greet {
      user: string = ''
      greet: (a: string, b: string) => string = (a: string, b: string) => {
        return ''
      }
    }

    it('afterTest01', 0, () => {
      let startTime0 = new Date().getTime()
      console.info('appInfoTest xts afterTest01 startTime:' + startTime0 + "us")
      let saves = ['profile', 'settings'];

      let done: () => void = after(saves.length, () => {

        console.log('done saving!');

      });

      let endTime0 = new Date().getTime()
      console.info('appInfoTest xts afterTest01 endTime:' + endTime0 + "us")
      let averageTime0 = endTime0 - startTime0
      console.info('appInfoTest xts afterTest01 averageTime:' + averageTime0 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        after(saves.length, () => {
          console.log('done saving!');
        });
      }
      endTime(startTime, 'afterTest01');
      expect(done()).assertUndefined()
    })


    it('afterTest02', 0, () => {
      let startTime1 = new Date().getTime()
      console.info('appInfoTest xts afterTest02 startTime:' + startTime1 + "us")
      let done: () => void = after(0, () => {

      });

      let endTime1 = new Date().getTime()
      console.info('appInfoTest xts afterTest02 endTime:' + endTime1 + "us")
      let averageTime1 = endTime1 - startTime1
      console.info('appInfoTest xts afterTest02 averageTime:' + averageTime1 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        after(0, () => {

        });
      }
      endTime(startTime, 'afterTest02');
      expect(done()).assertUndefined()
    })


    it('aryTest01', 0, () => {
      let startTime2 = new Date().getTime()
      console.info('appInfoTest xts aryTest01 startTime:' + startTime2 + "us")
      let aryArray: number[] = map(['6', '8', '10'], ary(parseInt, 1));

      let endTime2 = new Date().getTime()
      console.info('appInfoTest xts aryTest01 endTime:' + endTime2 + "us")
      let averageTime2 = endTime2 - startTime2
      console.info('appInfoTest xts aryTest01 averageTime:' + averageTime2 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        map(['6', '8', '10'], ary(parseInt, 1));
      }
      endTime(startTime, 'aryTest01');
      expect(JSON.stringify(aryArray)).assertEqual('[6,8,10]');
    })


    it('aryTest02', 0, () => {
      let startTime3 = new Date().getTime()
      console.info('appInfoTest xts aryTest02 startTime:' + startTime3 + "us")
      let aryArray: number[] = map(['7', '0', '34'], ary(parseInt, 1));

      let endTime3 = new Date().getTime()
      console.info('appInfoTest xts aryTest02 endTime:' + endTime3 + "us")
      let averageTime3 = endTime3 - startTime3
      console.info('appInfoTest xts aryTest02 averageTime:' + averageTime3 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        map(['7', '0', '34'], ary(parseInt, 1));
      }
      endTime(startTime, 'aryTest02');
      expect(JSON.stringify(aryArray)).assertEqual('[7,0,34]');
    })


    it('beforeTest01', 0, () => {
      let startTime4 = new Date().getTime()
      console.info('appInfoTest xts beforeTest01 startTime:' + startTime4 + "us")
      let befores: () => void = before(1, () => {
        console.log('Saved');

      });

      let endTime4 = new Date().getTime()
      console.info('appInfoTest xts beforeTest01 endTime:' + endTime4 + "us")
      let averageTime4 = endTime4 - startTime4
      console.info('appInfoTest xts beforeTest01 averageTime:' + averageTime4 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        before(1, () => {
          console.log('Saved');
        });
      }
      endTime(startTime, 'beforeTest01');
      expect(befores()).assertUndefined();
    })


    it('beforeTest02', 0, () => {
      let startTime5 = new Date().getTime()
      console.info('appInfoTest xts beforeTest02 startTime:' + startTime5 + "us")
      let befores: () => void = before(3, () => {
      });

      let endTime5 = new Date().getTime()
      console.info('appInfoTest xts beforeTest02 endTime:' + endTime5 + "us")
      let averageTime5 = endTime5 - startTime5
      console.info('appInfoTest xts beforeTest02 averageTime:' + averageTime5 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        before(3, () => {
        });
      }
      endTime(startTime, 'beforeTest02');
      expect(befores()).assertUndefined();
    })


    it('bindTest01', 0, () => {
      let startTime6 = new Date().getTime()
      console.info('appInfoTest xts bindTest01 startTime:' + startTime6 + "us")
      let obj: User = {
        Name: "NJ",

        Address: "NONE"
      };

      let fun: () => string = () => {
        return 'Welcome to ' + obj.Name + ' '

          + 'Address:' + obj.Address

      };

      let bound: () => void = bind(fun, obj);

      let endTime6 = new Date().getTime()
      console.info('appInfoTest xts bindTest01 endTime:' + endTime6 + "us")
      let averageTime6 = endTime6 - startTime6
      console.info('appInfoTest xts bindTest01 averageTime:' + averageTime6 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        bind(fun, obj);
      }
      endTime(startTime, 'bindTest01');
      expect(JSON.stringify(bound())).assertEqual('"Welcome to NJ Address:NONE"');
    })


    it('bindTest02', 0, () => {
      let startTime7 = new Date().getTime()
      console.info('appInfoTest xts bindTest02 startTime:' + startTime7 + "us")
      let object: users = {
        user: 'fred'
      };

      let greet: (a: string, b: string) => string = (greeting: string, punctuation: string) => {

        return greeting + ' ' + object.user + punctuation;

      };

      let bound: (a: string) => void = bind(greet, object, '!');

      let endTime7 = new Date().getTime()
      console.info('appInfoTest xts bindTest02 endTime:' + endTime7 + "us")
      let averageTime7 = endTime7 - startTime7
      console.info('appInfoTest xts bindTest02 averageTime:' + averageTime7 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        bind(greet, object, '!');
      }
      endTime(startTime, 'bindTest02');
      expect(JSON.stringify(bound('hi'))).assertEqual('"! fredhi"');
    })


    it('bindKeyTest01', 0, () => {
      let startTime8 = new Date().getTime()
      console.info('appInfoTest xts bindKeyTest01 startTime:' + startTime8 + "us")
      let object: Greet = {
        user: 'fred',

        greet: (greeting: string, punctuation: string) => {

          return greeting + ' ' + object.user + punctuation;

        }
      };

      let bound: (a: string) => void = bindKey(object, 'greet', 'hi');

      bound('!');

      let endTime8 = new Date().getTime()
      console.info('appInfoTest xts bindKeyTest01 endTime:' + endTime8 + "us")
      let averageTime8 = endTime8 - startTime8
      console.info('appInfoTest xts bindKeyTest01 averageTime:' + averageTime8 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        bindKey(object, 'greet', 'hi');
      }
      endTime(startTime, 'bindKeyTest01');
      expect(bound('!')).assertEqual('hi fred!');
    })


    it('bindKeyTest02', 0, () => {
      let startTime9 = new Date().getTime()
      console.info('appInfoTest xts bindKeyTest02 startTime:' + startTime9 + "us")
      let object: Greet = {
        user: 'fred',

        greet: (greeting: string, punctuation: string) => {

          return greeting + ' ' + object.user + punctuation;

        }
      };

      let bound: (a: string) => void = bindKey(object, 'greet', 'hi');

      object.greet = (greeting: string, punctuation: string) => {

        return greeting + 'ya ' + object.user + punctuation;

      };

      let endTime9 = new Date().getTime()
      console.info('appInfoTest xts bindKeyTest02 endTime:' + endTime9 + "us")
      let averageTime9 = endTime9 - startTime9
      console.info('appInfoTest xts bindKeyTest02 averageTime:' + averageTime9 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        bindKey(object, 'greet', 'hi');
        object.greet = (greeting: string, punctuation: string) => {
          return greeting + 'ya ' + object.user + punctuation;
        };
      }
      endTime(startTime, 'bindKeyTest02');
      expect(bound('!')).assertEqual('hiya fred!');
    })


    it('curryTest01', 0, () => {
      let startTime10 = new Date().getTime()
      console.info('appInfoTest xts curryTest01 startTime:' + startTime10 + "us")
      let abc = (a: number, b: number, c: number) => {

        return [a, b, c];

      };

      let curried: ESObject = curry(abc);

      let endTime10 = new Date().getTime()
      console.info('appInfoTest xts curryTest01 endTime:' + endTime10 + "us")
      let averageTime10 = endTime10 - startTime10
      console.info('appInfoTest xts curryTest01 averageTime:' + averageTime10 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        curry(abc);
      }
      endTime(startTime, 'curryTest01');
      expect(JSON.stringify(curried(1)(2)(3))).assertEqual('[1,2,3]');
    })


    it('curryTest02', 0, () => {
      let startTime11 = new Date().getTime()
      console.info('appInfoTest xts curryTest02 startTime:' + startTime11 + "us")
      let abc = (a: number, b: number, c: number) => {

        return [a, b, c];

      };

      let curried: ESObject = curry(abc);

      let endTime11 = new Date().getTime()
      console.info('appInfoTest xts curryTest02 endTime:' + endTime11 + "us")
      let averageTime11 = endTime11 - startTime11
      console.info('appInfoTest xts curryTest02 averageTime:' + averageTime11 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        curry(abc);
      }
      endTime(startTime, 'curryTest02');
      expect(JSON.stringify(curried(1, 2)(3))).assertEqual('[1,2,3]');
    })


    it('curryRightTest01', 0, () => {
      let startTime12 = new Date().getTime()
      console.info('appInfoTest xts curryRightTest01 startTime:' + startTime12 + "us")
      let abc = (a: number, b: number, c: number) => {

        return [a, b, c];

      };

      let curried: ESObject = curryRight(abc);

      let endTime12 = new Date().getTime()
      console.info('appInfoTest xts curryRightTest01 endTime:' + endTime12 + "us")
      let averageTime12 = endTime12 - startTime12
      console.info('appInfoTest xts curryRightTest01 averageTime:' + averageTime12 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        curryRight(abc);
      }
      endTime(startTime, 'curryRightTest01');
      expect(JSON.stringify(curried(1)(2)(3))).assertEqual('[3,2,1]');
    })


    it('curryRightTest02', 0, () => {
      let startTime13 = new Date().getTime()
      console.info('appInfoTest xts curryRightTest02 startTime:' + startTime13 + "us")
      let abc = (a: number, b: number, c: number) => {

        return [a, b, c];

      };

      let curried: (a: number, b: number, c: number) => void = curryRight(abc);

      let endTime13 = new Date().getTime()
      console.info('appInfoTest xts curryRightTest02 endTime:' + endTime13 + "us")
      let averageTime13 = endTime13 - startTime13
      console.info('appInfoTest xts curryRightTest02 averageTime:' + averageTime13 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        curryRight(abc);
      }
      endTime(startTime, 'curryRightTest02');
      expect(JSON.stringify(curried(1, 2, 3))).assertEqual('[1,2,3]');
    })


    it('debounceTest01', 0, () => {
      let startTime14 = new Date().getTime()
      console.info('appInfoTest xts debounceTest01 startTime:' + startTime14 + "us")
      let debounced: boolean = debounce(() => {
        console.log('Function debounced after 1000ms!');

      }, 1000);

      let endTime14 = new Date().getTime()
      console.info('appInfoTest xts debounceTest01 endTime:' + endTime14 + "us")
      let averageTime14 = endTime14 - startTime14
      console.info('appInfoTest xts debounceTest01 averageTime:' + averageTime14 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        debounce(() => {
          console.log('Function debounced after 1000ms!');
        }, 1000);
      }
      endTime(startTime, 'debounceTest01');
      expect(JSON.stringify(debounced)).assertUndefined();
    })


    it('debounceTest02', 0, () => {
      let startTime15 = new Date().getTime()
      console.info('appInfoTest xts debounceTest02 startTime:' + startTime15 + "us")
      let debounced: boolean = debounce(() => {
        console.log('Function debounced after 1000ms!');

      }, 0);

      let endTime15 = new Date().getTime()
      console.info('appInfoTest xts debounceTest02 endTime:' + endTime15 + "us")
      let averageTime15 = endTime15 - startTime15
      console.info('appInfoTest xts debounceTest02 averageTime:' + averageTime15 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        debounce(() => {
          console.log('Function debounced after 1000ms!');
        }, 0);
      }
      endTime(startTime, 'debounceTest02');
      expect(JSON.stringify(debounced)).assertUndefined();
    })


    it('deferTest01', 0, () => {
      let startTime16 = new Date().getTime()
      console.info('appInfoTest xts deferTest01 startTime:' + startTime16 + "us")
      let pass = false;
      defer(() => {
        pass = true;
        let endTime16 = new Date().getTime()
        console.info('appInfoTest xts deferTest01 endTime:' + endTime16 + "us")
        let averageTime16 = endTime16 - startTime16
        console.info('appInfoTest xts deferTest01 averageTime:' + averageTime16 + "us")
      });

      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        defer(() => {
          pass = true;
        });
      }
      endTime(startTime, 'deferTest01');
      setTimeout(() => {
        expect(pass).assertTrue();
      }, 32);
    })


    it('deferTest02', 0, () => {
      let startTime17 = new Date().getTime()
      console.info('appInfoTest xts deferTest02 startTime:' + startTime17 + "us")
      let pass = true;
      let timerId:number = defer(() => {
        pass = false;
        let endTime17 = new Date().getTime()
        console.info('appInfoTest xts deferTest02 endTime:' + endTime17 + "us")
        let averageTime17 = endTime17 - startTime17
        console.info('appInfoTest xts deferTest02 averageTime:' + averageTime17 + "us")
      });
      clearTimeout(timerId);
      setTimeout(() => {
        expect(pass).assertTrue();
      }, 32);
    })


    it('delayTest', 0, () => {
      let startTime18 = new Date().getTime()
      console.info('appInfoTest xts delayTest startTime:' + startTime18 + "us")
      delay((text: string) => {

        let endTime18 = new Date().getTime()
        console.info('appInfoTest xts delayTest endTime:' + endTime18 + "us")
        let averageTime18 = endTime18 - startTime18
        console.info('appInfoTest xts delayTest averageTime:' + averageTime18 + "us")
        expect(text).assertEqual('later');
        console.log(text);

      }, 1000, 'later');

      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        delay((text: string) => { }, 0, 'later');
      }
      endTime(startTime, 'delayTest');
    })


    it('flipTest01', 0, () => {
      let startTime19 = new Date().getTime()
      console.info('appInfoTest xts flipTest01 startTime:' + startTime19 + "us")
      let Func: (a: string, b: string, c: string) => void = (a: string, b: string, c: string) => {

        return a + '~' + b + '~' + c + '!';

      }

      let flipped: ESObject = flip(Func)

      let endTime19 = new Date().getTime()
      console.info('appInfoTest xts flipTest01 endTime:' + endTime19 + "us")
      let averageTime19 = endTime19 - startTime19
      console.info('appInfoTest xts flipTest01 averageTime:' + averageTime19 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        flip(Func)
      }
      endTime(startTime, 'flipTest01');
      expect(flipped('a', 'b', 'c')).assertEqual('c~b~a!');
    })


    it('flipTest02', 0, () => {
      let startTime20 = new Date().getTime()
      console.info('appInfoTest xts flipTest02 startTime:' + startTime20 + "us")
      let Func: (a: string, b: string) => void = (a: string, b: string) => {

        return b + " ? " + a;

      }

      let flipped: ESObject = flip(Func)

      let endTime20 = new Date().getTime()
      console.info('appInfoTest xts flipTest02 endTime:' + endTime20 + "us")
      let averageTime20 = endTime20 - startTime20
      console.info('appInfoTest xts flipTest02 averageTime:' + averageTime20 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        flip(Func)
      }
      endTime(startTime, 'flipTest02');
      expect(flipped('hello', 'world')).assertEqual('hello ? world');
    })


    it('memoizeTest01', 0, () => {
      let startTime44 = new Date().getTime()
      console.info('appInfoTest xts memoizeTest01 startTime:' + startTime44 + "us")
      let sum: (a: number)=> number = memoize( (n: number): number=> {
        return n < 1 ? n:n + sum(n - 1);
      })
      let endTime44 = new Date().getTime()
      console.info('appInfoTest xts memoizeTest01 endTime:' + endTime44 + "us")
      let averageTime44 = endTime44 - startTime44
      console.info('appInfoTest xts memoizeTest01 averageTime:' + averageTime44 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        memoize( (n: number): number=> {
          return n < 1 ? n:n + sum(n - 1);
        })
      }
      endTime(startTime, 'memoizeTest01');
      expect(sum(6)).assertEqual(21);
    })


    it('memoizeTest02', 0, () => {
      let startTime21 = new Date().getTime()
      console.info('appInfoTest xts memoizeTest02 startTime:' + startTime21 + "us")
      let sum: (a: number) => number = memoize((n: number): number => {

        return n < 1 ? n : n + sum(n - 1);

      })

      let endTime21 = new Date().getTime()
      console.info('appInfoTest xts memoizeTest02 endTime:' + endTime21 + "us")
      let averageTime21 = endTime21 - startTime21
      console.info('appInfoTest xts memoizeTest02 averageTime:' + averageTime21 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        memoize((n: number): number => {
          return n < 1 ? n : n + sum(n - 1);
        })
      }
      endTime(startTime, 'memoizeTest02');
      expect(sum(1)).assertEqual(1);
    })


    it('negateTest01', 0, () => {
      let startTime22 = new Date().getTime()
      console.info('appInfoTest xts negateTest01 startTime:' + startTime22 + "us")
      let isEven: (n: number) => void = (n: number): boolean => {

        return n % 2 == 0;

      }

      let filterArray: number[] = filter([1, 2, 3, 4, 5, 6], negate(isEven));

      let endTime22 = new Date().getTime()
      console.info('appInfoTest xts negateTest01 endTime:' + endTime22 + "us")
      let averageTime22 = endTime22 - startTime22
      console.info('appInfoTest xts negateTest01 averageTime:' + averageTime22 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        filter([1, 2, 3, 4, 5, 6], negate(isEven));
      }
      endTime(startTime, 'negateTest01');
      expect(JSON.stringify(filterArray)).assertEqual('[1,3,5]');
    })


    it('negateTest02', 0, () => {
      let startTime23 = new Date().getTime()
      console.info('appInfoTest xts negateTest02 startTime:' + startTime23 + "us")
      let isEven: (n: number) => void = (n: number): boolean => {

        return n % 2 == 1;

      }

      let filterArray: number[] = filter([9, 31, 23, 3, 3, 2, 12, 24, 4, 46, 9, 13], negate(isEven));

      let endTime23 = new Date().getTime()
      console.info('appInfoTest xts negateTest02 endTime:' + endTime23 + "us")
      let averageTime23 = endTime23 - startTime23
      console.info('appInfoTest xts negateTest02 averageTime:' + averageTime23 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        filter([9, 31, 23, 3, 3, 2, 12, 24, 4, 46, 9, 13], negate(isEven));
      }
      endTime(startTime, 'negateTest02');
      expect(JSON.stringify(filterArray)).assertEqual('[2,12,24,4,46]');
    })


    it('onceTest01', 0, () => {
      let startTime24 = new Date().getTime()
      console.info('appInfoTest xts onceTest01 startTime:' + startTime24 + "us")
      let count = 0;

      let onces: () => number = once(() => {

        onces();

        return ++count;

      });

      let endTime24 = new Date().getTime()
      console.info('appInfoTest xts onceTest01 endTime:' + endTime24 + "us")
      let averageTime24 = endTime24 - startTime24
      console.info('appInfoTest xts onceTest01 averageTime:' + averageTime24 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        let ones: () => number = once(() => {
          ones();
          return 0;
        });
      }
      endTime(startTime, 'onceTest01');
      expect(onces()).assertEqual(1);
    })


    it('onceTest02', 0, () => {
      let startTime25 = new Date().getTime()
      console.info('appInfoTest xts onceTest02 startTime:' + startTime25 + "us")
      let count = 0;
      let onces: () => number = once(() => {
        onces();
        return ++count;
      });
      let endTime25 = new Date().getTime()
      console.info('appInfoTest xts onceTest02 endTime:' + endTime25 + "us")
      let averageTime25 = endTime25 - startTime25
      console.info('appInfoTest xts onceTest02 averageTime:' + averageTime25 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        let ones: () => number = once(() => {
          ones();
          return 0;
        });
      }
      endTime(startTime, 'onceTest02');
      expect(count).assertEqual(0);
    })


    it('overArgsTest01', 0, () => {
      let startTime26 = new Date().getTime()
      console.info('appInfoTest xts overArgsTest01 startTime:' + startTime26 + "us")
      let doubled: (n: number) => void = (n: number): number => {
        return n * 2;
      }
      let square: (n: number) => void = (n: number): number => {
        return n * n;
      }

      let func: (a: number, b: number) => number[] = overArgs((x: number, y: number) => {
        return [x, y];
      }, [square, doubled]);

      let endTime26 = new Date().getTime()
      console.info('appInfoTest xts overArgsTest01 endTime:' + endTime26 + "us")
      let averageTime26 = endTime26 - startTime26
      console.info('appInfoTest xts overArgsTest01 averageTime:' + averageTime26 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        overArgs((x: number, y: number) => {
          return [x, y];
        }, [square, doubled]);
      }
      endTime(startTime, 'overArgsTest01');
      expect(JSON.stringify(func(9, 3))).assertEqual('[81,6]');
    })


    it('overArgsTest02', 0, () => {
      let startTime27 = new Date().getTime()
      console.info('appInfoTest xts overArgsTest02 startTime:' + startTime27 + "us")
      let doubled: (n: number) => void = (n: number): number => {
        return n * 2;
      }
      let square: (n: number) => void = (n: number): number => {
        return n * n;
      }

      let func: (a: number, b: number) => number[] = overArgs((x: number, y: number) => {
        return [x, y];
      }, [square, doubled]);

      let endTime27 = new Date().getTime()
      console.info('appInfoTest xts overArgsTest02 endTime:' + endTime27 + "us")
      let averageTime27 = endTime27 - startTime27
      console.info('appInfoTest xts overArgsTest02 averageTime:' + averageTime27 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        overArgs((x: number, y: number) => {
          return [x, y];
        }, [square, doubled]);
      }
      endTime(startTime, 'overArgsTest02');
      expect(JSON.stringify(func(10, 5))).assertEqual('[100,10]');
    })


    it('partialTest01', 0, () => {
      let startTime28 = new Date().getTime()
      console.info('appInfoTest xts partialTest01 startTime:' + startTime28 + "us")
      let greet = (greeting: string, name: string) => {
        return greeting + ' ' + name;
      };
      let sayHelloTo: (a: string) => string = partial(greet, 'hello');

      let endTime28 = new Date().getTime()
      console.info('appInfoTest xts partialTest01 endTime:' + endTime28 + "us")
      let averageTime28 = endTime28 - startTime28
      console.info('appInfoTest xts partialTest01 averageTime:' + averageTime28 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        partial(greet, 'hello');
      }
      endTime(startTime, 'partialTest01');
      expect(sayHelloTo('fred')).assertEqual('hello fred');
    })


    it('partialTest02', 0, () => {
      let startTime29 = new Date().getTime()
      console.info('appInfoTest xts partialTest02 startTime:' + startTime29 + "us")
      let greet = (greeting: string, name: string) => {

        return greeting + ' ' + name;

      };

      let greetFred: (a: string) => string = partial(greet, 'GeeksforGeeks');

      let endTime29 = new Date().getTime()
      console.info('appInfoTest xts partialTest02 endTime:' + endTime29 + "us")
      let averageTime29 = endTime29 - startTime29
      console.info('appInfoTest xts partialTest02 averageTime:' + averageTime29 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        partial(greet, 'GeeksforGeeks');
      }
      endTime(startTime, 'partialTest02');
      expect(greetFred('is a computer science portal for geeks'))
        .assertEqual('GeeksforGeeks is a computer science portal for geeks');
    })


    it('partialRightTest01', 0, () => {
      let startTime30 = new Date().getTime()
      console.info('appInfoTest xts partialRightTest01 startTime:' + startTime30 + "us")
      let greet = (greeting: string, name: string) => {

        return greeting + ' ' + name;

      };

      let greetFred: (a: string) => string = partialRight(greet, 'fred');

      let endTime30 = new Date().getTime()
      console.info('appInfoTest xts partialRightTest01 endTime:' + endTime30 + "us")
      let averageTime30 = endTime30 - startTime30
      console.info('appInfoTest xts partialRightTest01 averageTime:' + averageTime30 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        partialRight(greet, 'fred');
      }
      endTime(startTime, 'partialRightTest01');
      expect(greetFred('hi')).assertEqual('hi fred');
    })


    it('partialRightTest02', 0, () => {
      let startTime31 = new Date().getTime()
      console.info('appInfoTest xts partialRightTest02 startTime:' + startTime31 + "us")
      let greet = (greeting: string, name: string) => {

        return greeting + ' ' + name;

      };

      let greetFred: (a: string) => string = partialRight(greet, 'GeeksforGeeks');

      let endTime31 = new Date().getTime()
      console.info('appInfoTest xts partialRightTest02 endTime:' + endTime31 + "us")
      let averageTime31 = endTime31 - startTime31
      console.info('appInfoTest xts partialRightTest02 averageTime:' + averageTime31 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        partialRight(greet, 'GeeksforGeeks');
      }
      endTime(startTime, 'partialRightTest02');
      expect(greetFred('is a computer science portal for geeks'))
        .assertEqual('is a computer science portal for geeks GeeksforGeeks');
    })


    it('reargTest01', 0, () => {
      let startTime32 = new Date().getTime()
      console.info('appInfoTest xts reargTest01 startTime:' + startTime32 + "us")
      let rearged: (a: string, b: string, c: string) => string = rearg((a: string, b: string, c: string) => {

        return [a, b, c];

      }, [2, 0, 1]);

      let endTime32 = new Date().getTime()
      console.info('appInfoTest xts reargTest01 endTime:' + endTime32 + "us")
      let averageTime32 = endTime32 - startTime32
      console.info('appInfoTest xts reargTest01 averageTime:' + averageTime32 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        rearg((a: string, b: string, c: string) => {
          return [a, b, c];
        }, [2, 0, 1]);
      }
      endTime(startTime, 'reargTest01');
      expect(JSON.stringify(rearged('b', 'c', 'a'))).assertEqual('["a","b","c"]');
    })


    it('reargTest02', 0, () => {
      let startTime33 = new Date().getTime()
      console.info('appInfoTest xts reargTest02 startTime:' + startTime33 + "us")
      let rearged: (a: string, b: string, c: string) => string = rearg((a: string, b: string, c: string) => {

        return [a, b, c];

      }, [2, 5, 8]);

      let endTime33 = new Date().getTime()
      console.info('appInfoTest xts reargTest02 endTime:' + endTime33 + "us")
      let averageTime33 = endTime33 - startTime33
      console.info('appInfoTest xts reargTest02 averageTime:' + averageTime33 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        rearg((a: string, b: string, c: string) => {
          return [a, b, c];
        }, [2, 5, 8]);
      }
      endTime(startTime, 'reargTest02');
      expect(JSON.stringify(rearged('hello', 'world', '!'))).assertEqual('["!",null,null]');
    })


    it('restTest01', 0, () => {
      let startTime34 = new Date().getTime()
      console.info('appInfoTest xts restTest01 startTime:' + startTime34 + "us")
      let say: (a: string, b: string, c: string, d: string) => string = rest((what: string, names: string) => {

        return what + ' ' + initial(names).join(', ') +

          (size(names) > 1 ? ', & ' : '') + last(names);

      });

      let endTime34 = new Date().getTime()
      console.info('appInfoTest xts restTest01 endTime:' + endTime34 + "us")
      let averageTime34 = endTime34 - startTime34
      console.info('appInfoTest xts restTest01 averageTime:' + averageTime34 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        rest((what: string, names: string) => {
          return what + ' ' + initial(names).join(', ') +
            (size(names) > 1 ? ', & ' : '') + last(names);
        });
      }
      endTime(startTime, 'restTest01');
      expect(say('hello', 'fred', 'barney', 'pebbles')).assertEqual('hello fred, barney, & pebbles');
    })


    it('restTest02', 0, () => {
      let startTime35 = new Date().getTime()
      console.info('appInfoTest xts restTest02 startTime:' + startTime35 + "us")
      let say: (a: string, b: string, c: string, d: string, e: string) => string = rest((what: string, names: string) => {

        return what + ' ' + initial(names).join(', ') +

          (size(names) > 1 ? ', & ' : '') + last(names);

      });

      let endTime35 = new Date().getTime()
      console.info('appInfoTest xts restTest02 endTime:' + endTime35 + "us")
      let averageTime35 = endTime35 - startTime35
      console.info('appInfoTest xts restTest02 averageTime:' + averageTime35 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        rest((what: string, names: string) => {
          return what + ' ' + initial(names).join(', ') +
            (size(names) > 1 ? ', & ' : '') + last(names);
        });
      }
      endTime(startTime, 'restTest02');
      expect(say('hello', '!', 'world', '&', 'pebbles')).assertEqual('hello !, world, &, & pebbles');
    })


    it('spreadTest01', 0, () => {
      let startTime36 = new Date().getTime()
      console.info('appInfoTest xts spreadTest01 startTime:' + startTime36 + "us")
      let say: (a: string, b: string) => string = rest((who: string, what: string) => {

        return who + ' says ' + what;

      });

      let endTime36 = new Date().getTime()
      console.info('appInfoTest xts spreadTest01 endTime:' + endTime36 + "us")
      let averageTime36 = endTime36 - startTime36
      console.info('appInfoTest xts spreadTest01 averageTime:' + averageTime36 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        rest((who: string, what: string) => {
          return who + ' says ' + what;
        });
      }
      endTime(startTime, 'spreadTest01');
      expect(say('fred', 'hello')).assertEqual('fred says hello');
    })


    it('spreadTest02', 0, () => {
      let startTime37 = new Date().getTime()
      console.info('appInfoTest xts spreadTest02 startTime:' + startTime37 + "us")
      let numbers = Promise.all([
        Promise.resolve(40),
        Promise.resolve(36)
      ]);
      let spreadString = numbers.then(spread((x: number, y: number) => {
        return x + y;
      }));
      let endTime37 = new Date().getTime()
      console.info('appInfoTest xts spreadTest02 endTime:' + endTime37 + "us")
      let averageTime37 = endTime37 - startTime37
      console.info('appInfoTest xts spreadTest02 averageTime:' + averageTime37 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        numbers.then(spread((x: number, y: number) => {
          return x + y;
        }));
      }
      endTime(startTime, 'spreadTest02');
      expect(JSON.stringify(spreadString)).assertEqual('{}');
    })


    it('throttleTest01', 0, () => {
      let startTime38 = new Date().getTime()
      console.info('appInfoTest xts throttleTest01 startTime:' + startTime38 + "us")
      let throttled: (a: string) => string = throttle(identity, 32),

        results: string[] = [throttled('a'), throttled('b')];

      let endTime38 = new Date().getTime()
      console.info('appInfoTest xts throttleTest01 endTime:' + endTime38 + "us")
      let averageTime38 = endTime38 - startTime38
      console.info('appInfoTest xts throttleTest01 averageTime:' + averageTime38 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        throttled('a')
      }
      endTime(startTime, 'throttleTest01');
      expect(JSON.stringify(results)).assertEqual('["a","a"]');
    })


    it('throttleTest02', 0, (done: Function) => {
      let startTime43 = new Date().getTime()
      console.info('appInfoTest xts throttleTest02 startTime:' + startTime43 + "us")
      let callCount = 0,
        throttled: ()=> void = throttle(()=> { callCount++; }, 32, {});
      throttled();
      throttled();
      let endTime43 = new Date().getTime()
      console.info('appInfoTest xts throttleTest02 endTime:' + endTime43 + "us")
      let averageTime43 = endTime43 - startTime43
      console.info('appInfoTest xts throttleTest02 averageTime:' + averageTime43 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        throttled();
      }
      endTime(startTime, 'throttleTest02');
      expect(callCount).assertEqual(1);
      setTimeout(()=> {
        expect(callCount).assertEqual(2);
        done();
      }, 128);
    })

    it('unaryTest01', 0, () => {
      let startTime39 = new Date().getTime()
      console.info('appInfoTest xts unaryTest01 startTime:' + startTime39 + "us")
      let unaryArray: number[] = map(['6', '8', '10'], unary(parseInt));

      let endTime39 = new Date().getTime()
      console.info('appInfoTest xts unaryTest01 endTime:' + endTime39 + "us")
      let averageTime39 = endTime39 - startTime39
      console.info('appInfoTest xts unaryTest01 averageTime:' + averageTime39 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        map(['6', '8', '10'], unary(parseInt));
      }
      endTime(startTime, 'unaryTest01');
      expect(JSON.stringify(unaryArray)).assertEqual('[6,8,10]');
    })

    it('unaryTest02', 0, () => {
      let startTime40 = new Date().getTime()
      console.info('appInfoTest xts unaryTest02 startTime:' + startTime40 + "us")
      let unaryArray: number = map(['231', '1', '99'], unary(parseInt));
      let endTime40 = new Date().getTime()
      console.info('appInfoTest xts unaryTest02 endTime:' + endTime40 + "us")
      let averageTime40 = endTime40 - startTime40
      console.info('appInfoTest xts unaryTest02 averageTime:' + averageTime40 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        map(['231', '1', '99'], unary(parseInt));
      }
      endTime(startTime, 'unaryTest02');
      expect(JSON.stringify(unaryArray)).assertEqual('[231,1,99]');
    })


    it('wrapTest01', 0, () => {
      let startTime41 = new Date().getTime()
      console.info('appInfoTest xts wrapTest01 startTime:' + startTime41 + "us")
      let args: number[] = [];
      let wrapped: (a: number, b: number, c: number) => void = wrap(() => {
      }, () => {
        args || (args = slice.call(arguments));
      });
      wrapped(1, 2, 3);
      let endTime41 = new Date().getTime()
      console.info('appInfoTest xts wrapTest01 endTime:' + endTime41 + "us")
      let averageTime41 = endTime41 - startTime41
      console.info('appInfoTest xts wrapTest01 averageTime:' + averageTime41 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        let wrapped: (a: number, b: number, c: number) => void = wrap(() => {
        }, () => {
          args || (args = slice.call(arguments));
        });
        wrapped(1, 2, 3);
      }
      endTime(startTime, 'wrapTest01');
      expect(JSON.stringify(args)).assertEqual('[]');
    })


    it('wrapTest02', 0, () => {
      let startTime42 = new Date().getTime()
      console.info('appInfoTest xts wrapTest02 startTime:' + startTime42 + "us")
      let p: (a: string) => string = wrap(escape, (func: Function, text: number) => {
        return '<p>' + func(text) + '</p>';
      });
      let endTime42 = new Date().getTime()
      console.info('appInfoTest xts wrapTest02 endTime:' + endTime42 + "us")
      let averageTime42 = endTime42 - startTime42
      console.info('appInfoTest xts wrapTest02 averageTime:' + averageTime42 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        wrap(escape, (func: Function, text: number) => {
          return '<p>' + func(text) + '</p>';
        });
      }
      endTime(startTime, 'wrapTest02');
      expect(p('fred, barney, & pebbles')).assertEqual('<p>fred, barney, &amp; pebbles</p>');
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