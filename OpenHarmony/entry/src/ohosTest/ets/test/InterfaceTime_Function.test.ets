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
import { after, ary, before, bind, bindKey, curry, curryRight, debounce, defer,
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
  throttle,
  unary,
  wrap,
  sum
} from 'lodash';

export default function InterfaceTime_Function() {
  describe('interfaceTime_Function', () => {

    const BASE_COUNT = 2000
    const BASELINE_CREATEHTTP = 2000

    class User {
      Name: string = ''
      Address: string = ''
    }
    class Greet{
      user: string = ''
      greet: (a: string, b: string) => string = (a: string, b: string) => {return ''}
    }

    it('afterTest',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let saves = ['profile', 'settings'];
      for (let index = 0; index < BASE_COUNT; index++) {
        after(saves.length, ()=> {
          console.log('done saving!');
        });
      }
      let endTime = new Date().getTime()
      console.log("afterTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("afterTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('aryTest',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        map(['6', '8', '10'], ary(parseInt, 1));
      }
      let endTime = new Date().getTime()
      console.log("aryTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("aryTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('beforeTest',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        before(1, () => {
          console.log('Saved');
        });
      }
      let endTime = new Date().getTime()
      console.log("beforeTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("beforeTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('bindTest',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let obj: User = {
        Name:"NJ",
        Address:"NONE"
      };
      let fun: () => string = () => {
        return 'Welcome to ' + obj.Name + ' '
          + 'Address:' + obj.Address
      };
      for (let index = 0; index < BASE_COUNT; index++) {
        bind(fun, obj);
      }
      let endTime = new Date().getTime()
      console.log("bindTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("bindTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('bindKey',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let object: Greet = {
        user: 'fred',
        greet: (greeting: string, punctuation: string)=> {
          return greeting + ' ' + object.user + punctuation;
        }
      };
      for (let index = 0; index < BASE_COUNT; index++) {
        bindKey(object, 'greet', 'hi');
      }
      let endTime = new Date().getTime()
      console.log("bindKey endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("bindKey averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('bindKeyTest',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let object: Greet = {
        user: 'fred',
        greet: (greeting: string, punctuation: string)=> {
          return greeting + ' ' + object.user + punctuation;
        }
      };
      for (let index = 0; index < BASE_COUNT; index++) {
        bindKey(object, 'greet', 'hi');
        object.greet = (greeting: string, punctuation: string)=> {
          return greeting + 'ya ' + object.user + punctuation;
        };
      }
      let endTime = new Date().getTime()
      console.log("bindKeyTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("bindKeyTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('curryTest',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let abc = (a: number, b: number, c: number)=> {
        return [a, b, c];
      };
      for (let index = 0; index < BASE_COUNT; index++) {
        curry(abc);
      }
      let endTime = new Date().getTime()
      console.log("curryTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("curryTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('curryRightTest',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let abc = (a: number, b: number, c: number)=> {
        return [a, b, c];
      };
      for (let index = 0; index < BASE_COUNT; index++) {
        curryRight(abc);
      }
      let endTime = new Date().getTime()
      console.log("curryRightTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("curryRightTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('debounceTest',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        debounce(() => {
          console.log('Function debounced after 1000ms!');
        }, 1000);
      }
      let endTime = new Date().getTime()
      console.log("debounceTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("debounceTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('deferTest',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        defer((text: string)=> {
          console.log(text);
        }, 'deferred');
      }
      let endTime = new Date().getTime()
      console.log("deferTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("deferTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('flipTest',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let Func: (a: string, b: string, c: string) => void = (a: string, b: string, c: string) => {
        return a + '~' + b + '~' + c + '!';
      }
      for (let index = 0; index < BASE_COUNT; index++) {
        flip(Func);
      }
      let endTime = new Date().getTime()
      console.log("flipTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("flipTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('memoizeTest',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        memoize( (n: number): number=> {
          return n < 1 ? n:n + sum(n - 1);
        })
      }
      let endTime = new Date().getTime()
      console.log("memoizeTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("memoizeTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('negateTest',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let isEven: (n: number) => void = (n: number): boolean => {
        return n % 2 == 0;
      }
      for (let index = 0; index < BASE_COUNT; index++) {
        filter([1, 2, 3, 4, 5, 6], negate(isEven));
      }
      let endTime = new Date().getTime()
      console.log("negateTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("negateTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('onceTest',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let count = 0;
      for (let index = 0; index < BASE_COUNT; index++) {
        once(()=> {
          return ++count;
        });
      }
      let endTime = new Date().getTime()
      console.log("onceTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("onceTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('overArgsTest',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let doubled: (n: number) => void = (n: number): number => {
        return n * 2;
      }
      let square: (n: number) => void = (n: number): number => {
        return n * n;
      }
      for (let index = 0; index < BASE_COUNT; index++) {
        overArgs((x: number, y: number)=> {
          return [x, y];
        }, [square, doubled]);
      }
      let endTime = new Date().getTime()
      console.log("overArgsTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("overArgsTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('partialTest',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let greet = (greeting: string, name: string)=> {
        return greeting + ' ' + name;
      };
      for (let index = 0; index < BASE_COUNT; index++) {
        partial(greet, 'hello');
      }
      let endTime = new Date().getTime()
      console.log("partialTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("partialTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('partial',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let greet = (greeting: string, name: string)=> {
        return greeting + ' ' + name;
      };
      for (let index = 0; index < BASE_COUNT; index++) {
        partial(greet, 'GeeksforGeeks');
      }
      let endTime = new Date().getTime()
      console.log("partial endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("partial averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('partialRightTest',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let greet = (greeting: string, name: string)=> {
        return greeting + ' ' + name;
      };
      for (let index = 0; index < BASE_COUNT; index++) {
        partialRight(greet, 'fred');
      }
      let endTime = new Date().getTime()
      console.log("partialRightTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("partialRightTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('partialRight',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let greet = (greeting: string, name: string)=> {
        return greeting + ' ' + name;
      };
      for (let index = 0; index < BASE_COUNT; index++) {
        partialRight(greet, 'GeeksforGeeks');
      }
      let endTime = new Date().getTime()
      console.log("partialRight endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("partialRight averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('reargTest',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        rearg((a: string, b: string, c: string)=> {
          return [a, b, c];
        }, [2, 0, 1]);
      }
      let endTime = new Date().getTime()
      console.log("reargTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("reargTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('rearg',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        rearg((a: string, b: string, c: string)=> {
          return [a, b, c];
        }, [2, 5, 8]);
      }
      let endTime = new Date().getTime()
      console.log("rearg endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("rearg averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('restTest',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        rest((what: string, names: string)=> {
          return what + ' ' + initial(names).join(', ') +
            (size(names) > 1 ? ', & ' : '') + last(names);
        });
      }
      let endTime = new Date().getTime()
      console.log("restTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("restTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('spread',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        rest((who: string, what: string)=> {
          return who + ' says ' + what;
        });
      }
      let endTime = new Date().getTime()
      console.log("spread endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("spread averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('throttleTest',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        throttle(identity, 32)
      }
      let endTime = new Date().getTime()
      console.log("throttleTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("throttleTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('unaryTest',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        map(['6', '8', '10'], unary(parseInt));
      }
      let endTime = new Date().getTime();
      console.log("unaryTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("unaryTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('wrapTest',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let args: number[] = [];
      for (let index = 0; index < BASE_COUNT; index++) {
        let wrapped: (a: number, b: number, c: number)=>void = wrap(()=> {}, ()=> {
          args || (args = slice.call(arguments));
        });
        wrapped(1, 2, 3);
      }
      let endTime = new Date().getTime();
      console.log("wrapTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("wrapTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })
  })
}