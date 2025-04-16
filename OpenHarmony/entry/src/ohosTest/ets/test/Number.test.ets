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
  clamp,
  inRange,
  random } from 'lodash';

const BASE_COUNT: number = 2000;

export default function numberTest() {
  describe('NumberTest', () => {
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
    it('clampTest01', 0, () => {
      let startTime0 = new Date().getTime()
      console.info('appInfoTest xts clampTest01 startTime:' + startTime0 + "us")
      expect(clamp(-10, -5, 5)).assertEqual(-5);
      let endTime0 = new Date().getTime()
      console.info('appInfoTest xts clampTest01 endTime:' + endTime0 + "us")
      let averageTime0 = endTime0 - startTime0
      console.info('appInfoTest xts clampTest01 averageTime:' + averageTime0 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        clamp(-10, -5, 5)
      }
      endTime(startTime, 'clampTest01');
    })

    it('clampTest02', 0, () => {
      let startTime1 = new Date().getTime()
      console.info('appInfoTest xts clampTest02 startTime:' + startTime1 + "us")
      expect(clamp(10, -5, 5)).assertEqual(5);
      let endTime1 = new Date().getTime()
      console.info('appInfoTest xts clampTest02 endTime:' + endTime1 + "us")
      let averageTime1 = endTime1 - startTime1
      console.info('appInfoTest xts clampTest02 averageTime:' + averageTime1 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        clamp(10, -5, 5)
      }
      endTime(startTime, 'clampTest02');
    })

    it('inRangeTest01', 0, () => {
      let startTime2 = new Date().getTime()
      console.info('appInfoTest xts inRangeTest01 startTime:' + startTime2 + "us")
      expect(inRange(3, 2, 4)).assertTrue();
      let endTime2 = new Date().getTime()
      console.info('appInfoTest xts inRangeTest01 endTime:' + endTime2 + "us")
      let averageTime2 = endTime2 - startTime2
      console.info('appInfoTest xts inRangeTest01 averageTime:' + averageTime2 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        inRange(3, 2, 4)
      }
      endTime(startTime, 'inRangeTest01');
    })

    it('inRangeTest02', 0, () => {
      let startTime3 = new Date().getTime()
      console.info('appInfoTest xts inRangeTest02 startTime:' + startTime3 + "us")
      expect(inRange(2, 2)).assertFalse();
      let endTime3 = new Date().getTime()
      console.info('appInfoTest xts inRangeTest02 endTime:' + endTime3 + "us")
      let averageTime3 = endTime3 - startTime3
      console.info('appInfoTest xts inRangeTest02 averageTime:' + averageTime3 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        inRange(2, 2)
      }
      endTime(startTime, 'inRangeTest02');
    })

    it('randomTest01', 0, () => {
      let startTime4 = new Date().getTime()
      console.info('appInfoTest xts randomTest01 startTime:' + startTime4 + "us")
      let actual: number[] = [
        random(Number.MIN_VALUE, Number.MIN_VALUE),
        random('1', '1'),
        random(Math.PI, Math.PI)
      ];

      let endTime4 = new Date().getTime()
      console.info('appInfoTest xts randomTest01 endTime:' + endTime4 + "us")
      let averageTime4 = endTime4 - startTime4
      console.info('appInfoTest xts randomTest01 averageTime:' + averageTime4 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        random(Math.PI, Math.PI)
      }
      endTime(startTime, 'randomTest01');
      expect(JSON.stringify(actual)).assertEqual('[5e-324,1,3.141592653589793]');
    })

    it('randomTest02', 0, () => {
      let startTime5 = new Date().getTime()
      console.info('appInfoTest xts randomTest02 startTime:' + startTime5 + "us")
      let actual: number[] = [
        random(Number.MIN_VALUE, Number.MIN_VALUE),
      ];

      let endTime5 = new Date().getTime()
      console.info('appInfoTest xts randomTest02 endTime:' + endTime5 + "us")
      let averageTime5 = endTime5 - startTime5
      console.info('appInfoTest xts randomTest02 averageTime:' + averageTime5 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        random(Number.MIN_VALUE, Number.MIN_VALUE)
      }
      endTime(startTime, 'randomTest02');
      expect(JSON.stringify(actual)).assertEqual('[5e-324]');
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