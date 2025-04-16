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
import { add,
  ceil,
  divide,
  floor,
  max, maxBy, mean, meanBy, min, minBy, multiply,
  round, subtract, sum,
  sumBy } from 'lodash';

export default function InterfaceTime_Math() {
  describe('interfaceTime_Math', () => {

    const BASE_COUNT = 2000
    const BASELINE_CREATEHTTP = 2000

    class N{
      n: number = 0
    }
    it('add',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        add(1, 3);
      }
      let endTime = new Date().getTime()
      console.log("add endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("add averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('ceil',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        ceil(4.006);
      }
      let endTime = new Date().getTime()
      console.log("ceil endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("ceil averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('divideTest',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        divide(6, 4);
      }
      let endTime = new Date().getTime()
      console.log("divide endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("divide averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('floor',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        floor(4.006);
      }
      let endTime = new Date().getTime()
      console.log("floor endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("floor averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('floorTest',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        floor(0.046, 2);
      }
      let endTime = new Date().getTime()
      console.log("floorTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("floorTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('max',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        max([4, 2, 8, 6]);
      }
      let endTime = new Date().getTime()
      console.log("max endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("max averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('maxByTest',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let objects: N[] = [{ n: 1 }, { n: 2 }];
      for (let index = 0; index < BASE_COUNT; index++) {
        maxBy(objects,(o: N)=> { return o.n; });
      }
      let endTime = new Date().getTime()
      console.log("maxByTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("maxByTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('maxBy',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let objects: N[] = [{ n: 1 }, { n: 2 }];
      for (let index = 0; index < BASE_COUNT; index++) {
        maxBy(objects, 'n');
      }
      let endTime = new Date().getTime()
      console.log("maxBy endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("maxBy averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('mean',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        mean([4, 2, 8, 6])
      }
      let endTime = new Date().getTime()
      console.log("mean endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("mean averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('meanBy',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let objects: N[] = [{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }];
      for (let index = 0; index < BASE_COUNT; index++) {
        meanBy(objects, (o: N)=> { return o.n; });
      }
      let endTime = new Date().getTime()
      console.log("meanBy endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("meanBy averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('min',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        min([4, 2, 8, 6])
      }
      let endTime = new Date().getTime()
      console.log("min endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("min averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('minByTest',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let objects: N[] = [{ n: 1 }, { n: 2 }];
      for (let index = 0; index < BASE_COUNT; index++) {
        minBy(objects, (o: N)=> { return o.n; });
      }
      let endTime = new Date().getTime()
      console.log("minByTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("minByTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('multiply',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        multiply(6, 4)
      }
      let endTime = new Date().getTime()
      console.log("multiply endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("multiply averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('roundTest',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        round(4.006)
      }
      let endTime = new Date().getTime()
      console.log("roundTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("roundTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('round',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        round(4060, -2)
      }
      let endTime = new Date().getTime()
      console.log("round endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("round averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('subtract',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        subtract(6, 4)
      }
      let endTime = new Date().getTime()
      console.log("subtract endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("subtract averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('sumTest',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        sum([6, 4])
      }
      let endTime = new Date().getTime()
      console.log("sumTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("sumTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('sumByTest',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      let objects: N[] = [{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }];
      for (let index = 0; index < BASE_COUNT; index++) {
        sumBy(objects, (o: N)=> { return o.n; });
      }
      let endTime = new Date().getTime()
      console.log("sumByTest endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("sumByTest averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })
  })
}