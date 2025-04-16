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
import { camelCase, capitalize, deburr, endsWith, escape, escapeRegExp, kebabCase, lowerCase, lowerFirst,
  map,
  pad,
  padEnd,
  padStart,
  repeat,
  replace,
  snakeCase,
  split,
  startCase,
  startsWith,
  toLower,
  toUpper,
  trim,
  trimEnd,
  trimStart,
  truncate,
  unescape,
  upperCase,
  upperFirst,
  words,
  parseInt
} from 'lodash'

const BASE_COUNT: number = 2000;

export default function stringTest() {
  describe('StringTest', () => {
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
    it('camelCaseTest01', 0, () => {
      let startTime0 = new Date().getTime()
      console.info('appInfoTest xts camelCaseTest01 startTime:' + startTime0 + "us")
      expect(camelCase('Foo Bar')).assertEqual('fooBar');
      let endTime0 = new Date().getTime()
      console.info('appInfoTest xts camelCaseTest01 endTime:' + endTime0 + "us")
      let averageTime0 = endTime0 - startTime0
      console.info('appInfoTest xts camelCaseTest01 averageTime:' + averageTime0 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        camelCase('Foo Bar')
      }
      endTime(startTime, 'camelCaseTest01');
    })


    it('camelCaseTest02', 0, () => {
      let startTime1 = new Date().getTime()
      console.info('appInfoTest xts camelCaseTest02 startTime:' + startTime1 + "us")
      expect(camelCase('--foo-bar--')).assertEqual('fooBar');
      let endTime1 = new Date().getTime()
      console.info('appInfoTest xts camelCaseTest02 endTime:' + endTime1 + "us")
      let averageTime1 = endTime1 - startTime1
      console.info('appInfoTest xts camelCaseTest02 averageTime:' + averageTime1 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        camelCase('--foo-bar--')
      }
      endTime(startTime, 'camelCaseTest02');
    })


    it('capitalizeTest01', 0, () => {
      let startTime2 = new Date().getTime()
      console.info('appInfoTest xts capitalizeTest01 startTime:' + startTime2 + "us")
      expect(capitalize('FRED')).assertEqual('Fred');
      let endTime2 = new Date().getTime()
      console.info('appInfoTest xts capitalizeTest01 endTime:' + endTime2 + "us")
      let averageTime2 = endTime2 - startTime2
      console.info('appInfoTest xts capitalizeTest01 averageTime:' + averageTime2 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        capitalize('FRED')
      }
      endTime(startTime, 'capitalizeTest01');
    })


    it('capitalizeTest02', 0, () => {
      let startTime3 = new Date().getTime()
      console.info('appInfoTest xts capitalizeTest02 startTime:' + startTime3 + "us")
      expect(capitalize('hello')).assertEqual('Hello');
      let endTime3 = new Date().getTime()
      console.info('appInfoTest xts capitalizeTest02 endTime:' + endTime3 + "us")
      let averageTime3 = endTime3 - startTime3
      console.info('appInfoTest xts capitalizeTest02 averageTime:' + averageTime3 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        capitalize('hello')
      }
      endTime(startTime, 'capitalizeTest02');
    })


    it('deburrTest01', 0, () => {
      let startTime4 = new Date().getTime()
      console.info('appInfoTest xts deburrTest01 startTime:' + startTime4 + "us")
      expect(deburr('déjà vu')).assertEqual('deja vu');
      let endTime4 = new Date().getTime()
      console.info('appInfoTest xts deburrTest01 endTime:' + endTime4 + "us")
      let averageTime4 = endTime4 - startTime4
      console.info('appInfoTest xts deburrTest01 averageTime:' + averageTime4 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        deburr('déjà vu')
      }
      endTime(startTime, 'deburrTest01');
    })


    it('deburrTest02', 0, () => {
      let startTime5 = new Date().getTime()
      console.info('appInfoTest xts deburrTest02 startTime:' + startTime5 + "us")
      expect(deburr('ãäåæçè')).assertEqual('aaaaece');
      let endTime5 = new Date().getTime()
      console.info('appInfoTest xts deburrTest02 endTime:' + endTime5 + "us")
      let averageTime5 = endTime5 - startTime5
      console.info('appInfoTest xts deburrTest02 averageTime:' + averageTime5 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        deburr('ãäåæçè')
      }
      endTime(startTime, 'deburrTest02');
    })


    it('endsWithTest01', 0, () => {
      let startTime6 = new Date().getTime()
      console.info('appInfoTest xts endsWithTest01 startTime:' + startTime6 + "us")
      expect(endsWith('abc', 'c')).assertTrue();
      let endTime6 = new Date().getTime()
      console.info('appInfoTest xts endsWithTest01 endTime:' + endTime6 + "us")
      let averageTime6 = endTime6 - startTime6
      console.info('appInfoTest xts endsWithTest01 averageTime:' + averageTime6 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        endsWith('abc', 'c')
      }
      endTime(startTime, 'endsWithTest01');
    })


    it('endsWithTest02', 0, () => {
      let startTime7 = new Date().getTime()
      console.info('appInfoTest xts endsWithTest02 startTime:' + startTime7 + "us")
      expect(endsWith('abc', 'b', 2)).assertTrue();
      let endTime7 = new Date().getTime()
      console.info('appInfoTest xts endsWithTest02 endTime:' + endTime7 + "us")
      let averageTime7 = endTime7 - startTime7
      console.info('appInfoTest xts endsWithTest02 averageTime:' + averageTime7 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        endsWith('abc', 'b', 2)
      }
      endTime(startTime, 'endsWithTest02');
    })


    it('escapeTest01', 0, () => {
      let startTime8 = new Date().getTime()
      console.info('appInfoTest xts escapeTest01 startTime:' + startTime8 + "us")
      expect(escape('fred, barney, & pebbles')).assertEqual('fred, barney, &amp; pebbles');
      let endTime8 = new Date().getTime()
      console.info('appInfoTest xts escapeTest01 endTime:' + endTime8 + "us")
      let averageTime8 = endTime8 - startTime8
      console.info('appInfoTest xts escapeTest01 averageTime:' + averageTime8 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        escape('fred, barney, & pebbles')
      }
      endTime(startTime, 'escapeTest01');
    })


    it('escapeTest02', 0, () => {
      let startTime9 = new Date().getTime()
      console.info('appInfoTest xts escapeTest02 startTime:' + startTime9 + "us")
      expect(escape('hello, a&b, `world`')).assertEqual('hello, a&amp;b, `world`');
      let endTime9 = new Date().getTime()
      console.info('appInfoTest xts escapeTest02 endTime:' + endTime9 + "us")
      let averageTime9 = endTime9 - startTime9
      console.info('appInfoTest xts escapeTest02 averageTime:' + averageTime9 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        escape('hello, a&b, `world`')
      }
      endTime(startTime, 'escapeTest02');
    })


    it('escapeRegExpTest01', 0, () => {
      let startTime10 = new Date().getTime()
      console.info('appInfoTest xts escapeRegExpTest01 startTime:' + startTime10 + "us")
      expect(escapeRegExp('[lodash]+(HELLO)')).assertDeepEquals('\\[lodash\\]\\+\\(HELLO\\)');
      let endTime10 = new Date().getTime()
      console.info('appInfoTest xts escapeRegExpTest01 endTime:' + endTime10 + "us")
      let averageTime10 = endTime10 - startTime10
      console.info('appInfoTest xts escapeRegExpTest01 averageTime:' + averageTime10 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        escapeRegExp('[lodash]+(HELLO)')
      }
      endTime(startTime, 'escapeRegExpTest01');
    })


    it('escapeRegExpTest02', 0, () => {
      let startTime11 = new Date().getTime()
      console.info('appInfoTest xts escapeRegExpTest02 startTime:' + startTime11 + "us")
      expect(escapeRegExp('[hello],[($10000)]World!')).assertDeepEquals('\\[hello\\],\\[\\(\\$10000\\)\\]World!');
      let endTime11 = new Date().getTime()
      console.info('appInfoTest xts escapeRegExpTest02 endTime:' + endTime11 + "us")
      let averageTime11 = endTime11 - startTime11
      console.info('appInfoTest xts escapeRegExpTest02 averageTime:' + averageTime11 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        escapeRegExp('[hello],[($10000)]World!')
      }
      endTime(startTime, 'escapeRegExpTest02');
    })


    it('kebabCaseTest01', 0, () => {
      let startTime12 = new Date().getTime()
      console.info('appInfoTest xts kebabCaseTest01 startTime:' + startTime12 + "us")
      expect(kebabCase('Foo Bar')).assertEqual('foo-bar');
      let endTime12 = new Date().getTime()
      console.info('appInfoTest xts kebabCaseTest01 endTime:' + endTime12 + "us")
      let averageTime12 = endTime12 - startTime12
      console.info('appInfoTest xts kebabCaseTest01 averageTime:' + averageTime12 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        kebabCase('Foo Bar')
      }
      endTime(startTime, 'kebabCaseTest01');
    })


    it('kebabCaseTest02', 0, () => {
      let startTime13 = new Date().getTime()
      console.info('appInfoTest xts kebabCaseTest02 startTime:' + startTime13 + "us")
      expect(kebabCase('__FOO_BAR__')).assertEqual('foo-bar')
      let endTime13 = new Date().getTime()
      console.info('appInfoTest xts kebabCaseTest02 endTime:' + endTime13 + "us")
      let averageTime13 = endTime13 - startTime13
      console.info('appInfoTest xts kebabCaseTest02 averageTime:' + averageTime13 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        kebabCase('__FOO_BAR__')
      }
      endTime(startTime, 'kebabCaseTest02');
    })


    it('lowerCaseTest01', 0, () => {
      let startTime14 = new Date().getTime()
      console.info('appInfoTest xts lowerCaseTest01 startTime:' + startTime14 + "us")
      expect(lowerCase('Foo Bar')).assertEqual('foo bar');
      let endTime14 = new Date().getTime()
      console.info('appInfoTest xts lowerCaseTest01 endTime:' + endTime14 + "us")
      let averageTime14 = endTime14 - startTime14
      console.info('appInfoTest xts lowerCaseTest01 averageTime:' + averageTime14 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        lowerCase('Foo Bar')
      }
      endTime(startTime, 'lowerCaseTest01');
    })


    it('lowerCaseTest02', 0, () => {
      let startTime15 = new Date().getTime()
      console.info('appInfoTest xts lowerCaseTest02 startTime:' + startTime15 + "us")
      expect(lowerCase('__FOO_BAR__')).assertEqual('foo bar')
      let endTime15 = new Date().getTime()
      console.info('appInfoTest xts lowerCaseTest02 endTime:' + endTime15 + "us")
      let averageTime15 = endTime15 - startTime15
      console.info('appInfoTest xts lowerCaseTest02 averageTime:' + averageTime15 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        lowerCase('__FOO_BAR__')
      }
      endTime(startTime, 'lowerCaseTest02');
    })


    it('lowerFirstTest01', 0, () => {
      let startTime16 = new Date().getTime()
      console.info('appInfoTest xts lowerFirstTest01 startTime:' + startTime16 + "us")
      expect(lowerFirst('Fred')).assertEqual('fred');
      let endTime16 = new Date().getTime()
      console.info('appInfoTest xts lowerFirstTest01 endTime:' + endTime16 + "us")
      let averageTime16 = endTime16 - startTime16
      console.info('appInfoTest xts lowerFirstTest01 averageTime:' + averageTime16 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        lowerFirst('Fred')
      }
      endTime(startTime, 'lowerFirstTest01');
    })


    it('lowerFirstTest02', 0, () => {
      let startTime17 = new Date().getTime()
      console.info('appInfoTest xts lowerFirstTest02 startTime:' + startTime17 + "us")
      expect(lowerFirst('FRED')).assertEqual('fRED')
      let endTime17 = new Date().getTime()
      console.info('appInfoTest xts lowerFirstTest02 endTime:' + endTime17 + "us")
      let averageTime17 = endTime17 - startTime17
      console.info('appInfoTest xts lowerFirstTest02 averageTime:' + averageTime17 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        lowerFirst('FRED')
      }
      endTime(startTime, 'lowerFirstTest02');
    })


    it('padTest01', 0, () => {
      let startTime18 = new Date().getTime()
      console.info('appInfoTest xts padTest01 startTime:' + startTime18 + "us")
      expect(pad('abc', 8)).assertEqual('  abc   ');
      let endTime18 = new Date().getTime()
      console.info('appInfoTest xts padTest01 endTime:' + endTime18 + "us")
      let averageTime18 = endTime18 - startTime18
      console.info('appInfoTest xts padTest01 averageTime:' + averageTime18 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        pad('abc', 8)
      }
      endTime(startTime, 'padTest01');
    })


    it('padTest02', 0, () => {
      let startTime19 = new Date().getTime()
      console.info('appInfoTest xts padTest02 startTime:' + startTime19 + "us")
      expect(pad('abc', 8, '_-')).assertEqual('_-abc_-_')
      let endTime19 = new Date().getTime()
      console.info('appInfoTest xts padTest02 endTime:' + endTime19 + "us")
      let averageTime19 = endTime19 - startTime19
      console.info('appInfoTest xts padTest02 averageTime:' + averageTime19 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        pad('abc', 8, '_-')
      }
      endTime(startTime, 'padTest02');
    })


    it('padEndTest01', 0, () => {
      let startTime20 = new Date().getTime()
      console.info('appInfoTest xts padEndTest01 startTime:' + startTime20 + "us")
      expect(padEnd('abc', 6)).assertEqual('abc   ');
      let endTime20 = new Date().getTime()
      console.info('appInfoTest xts padEndTest01 endTime:' + endTime20 + "us")
      let averageTime20 = endTime20 - startTime20
      console.info('appInfoTest xts padEndTest01 averageTime:' + averageTime20 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        padEnd('abc', 6)
      }
      endTime(startTime, 'padEndTest01');
    })


    it('padEndTest02', 0, () => {
      let startTime21 = new Date().getTime()
      console.info('appInfoTest xts padEndTest02 startTime:' + startTime21 + "us")
      expect(padEnd('abc', 6, '_-')).assertEqual('abc_-_');
      let endTime21 = new Date().getTime()
      console.info('appInfoTest xts padEndTest02 endTime:' + endTime21 + "us")
      let averageTime21 = endTime21 - startTime21
      console.info('appInfoTest xts padEndTest02 averageTime:' + averageTime21 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        padEnd('abc', 6, '_-')
      }
      endTime(startTime, 'padEndTest02');
    })


    it('padStartTest01', 0, () => {
      let startTime22 = new Date().getTime()
      console.info('appInfoTest xts padStartTest01 startTime:' + startTime22 + "us")
      expect(padStart('abc', 6)).assertEqual('   abc');
      let endTime22 = new Date().getTime()
      console.info('appInfoTest xts padStartTest01 endTime:' + endTime22 + "us")
      let averageTime22 = endTime22 - startTime22
      console.info('appInfoTest xts padStartTest01 averageTime:' + averageTime22 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        padStart('abc', 6)
      }
      endTime(startTime, 'padStartTest01');
    })


    it('padStartTest02', 0, () => {
      let startTime23 = new Date().getTime()
      console.info('appInfoTest xts padStartTest02 startTime:' + startTime23 + "us")
      expect(padStart('abc', 3)).assertEqual('abc');
      let endTime23 = new Date().getTime()
      console.info('appInfoTest xts padStartTest02 endTime:' + endTime23 + "us")
      let averageTime23 = endTime23 - startTime23
      console.info('appInfoTest xts padStartTest02 averageTime:' + averageTime23 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        padStart('abc', 3)
      }
      endTime(startTime, 'padStartTest02');
    })


    it('parseIntTest01', 0, () => {
      let startTime24 = new Date().getTime()
      console.info('appInfoTest xts parseIntTest01 startTime:' + startTime24 + "us")
      expect(parseInt('08')).assertEqual(8);
      let endTime24 = new Date().getTime()
      console.info('appInfoTest xts parseIntTest01 endTime:' + endTime24 + "us")
      let averageTime24 = endTime24 - startTime24
      console.info('appInfoTest xts parseIntTest01 averageTime:' + averageTime24 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        parseInt('08')
      }
      endTime(startTime, 'parseIntTest01');
    })


    it('parseIntTest02', 0, () => {
      let startTime25 = new Date().getTime()
      console.info('appInfoTest xts parseIntTest02 startTime:' + startTime25 + "us")
      let parseArray: number[] = map(['6', '08', '10'], parseInt)

      let endTime25 = new Date().getTime()
      console.info('appInfoTest xts parseIntTest02 endTime:' + endTime25 + "us")
      let averageTime25 = endTime25 - startTime25
      console.info('appInfoTest xts parseIntTest02 averageTime:' + averageTime25 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        map(['6', '08', '10'], parseInt)
      }
      endTime(startTime, 'parseIntTest02');
      expect(JSON.stringify(parseArray)).assertEqual('[6,8,10]');
    })


    it('repeatTest01', 0, () => {
      let startTime26 = new Date().getTime()
      console.info('appInfoTest xts repeatTest01 startTime:' + startTime26 + "us")
      expect(repeat('*', 3)).assertEqual('***');
      let endTime26 = new Date().getTime()
      console.info('appInfoTest xts repeatTest01 endTime:' + endTime26 + "us")
      let averageTime26 = endTime26 - startTime26
      console.info('appInfoTest xts repeatTest01 averageTime:' + averageTime26 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        repeat('*', 3)
      }
      endTime(startTime, 'repeatTest01');
    })


    it('repeatTest02', 0, () => {
      let startTime27 = new Date().getTime()
      console.info('appInfoTest xts repeatTest02 startTime:' + startTime27 + "us")
      expect(repeat('abc', 2)).assertEqual('abcabc');
      let endTime27 = new Date().getTime()
      console.info('appInfoTest xts repeatTest02 endTime:' + endTime27 + "us")
      let averageTime27 = endTime27 - startTime27
      console.info('appInfoTest xts repeatTest02 averageTime:' + averageTime27 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        repeat('abc', 2)
      }
      endTime(startTime, 'repeatTest02');
    })


    it('replaceTest01', 0, () => {
      let startTime28 = new Date().getTime()
      console.info('appInfoTest xts replaceTest01 startTime:' + startTime28 + "us")
      expect(replace('Hi Fred', 'Fred', 'Barney')).assertEqual('Hi Barney');
      let endTime28 = new Date().getTime()
      console.info('appInfoTest xts replaceTest01 endTime:' + endTime28 + "us")
      let averageTime28 = endTime28 - startTime28
      console.info('appInfoTest xts replaceTest01 averageTime:' + averageTime28 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        replace('Hi Fred', 'Fred', 'Barney')
      }
      endTime(startTime, 'replaceTest01');
    })


    it('replaceTest02', 0, () => {
      let startTime29 = new Date().getTime()
      console.info('appInfoTest xts replaceTest02 startTime:' + startTime29 + "us")
      expect(replace('Stay In', 'In', 'Safe')).assertEqual('Stay Safe');
      let endTime29 = new Date().getTime()
      console.info('appInfoTest xts replaceTest02 endTime:' + endTime29 + "us")
      let averageTime29 = endTime29 - startTime29
      console.info('appInfoTest xts replaceTest02 averageTime:' + averageTime29 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        replace('Stay In', 'In', 'Safe')
      }
      endTime(startTime, 'replaceTest02');
    })


    it('snakeCaseTest01', 0, () => {
      let startTime30 = new Date().getTime()
      console.info('appInfoTest xts snakeCaseTest01 startTime:' + startTime30 + "us")
      expect(snakeCase('Foo Bar')).assertEqual('foo_bar');
      let endTime30 = new Date().getTime()
      console.info('appInfoTest xts snakeCaseTest01 endTime:' + endTime30 + "us")
      let averageTime30 = endTime30 - startTime30
      console.info('appInfoTest xts snakeCaseTest01 averageTime:' + averageTime30 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        snakeCase('Foo Bar')
      }
      endTime(startTime, 'snakeCaseTest01');
    })


    it('snakeCaseTest02', 0, () => {
      let startTime31 = new Date().getTime()
      console.info('appInfoTest xts snakeCaseTest02 startTime:' + startTime31 + "us")
      expect(snakeCase('--FOO-BAR--')).assertEqual('foo_bar');
      let endTime31 = new Date().getTime()
      console.info('appInfoTest xts snakeCaseTest02 endTime:' + endTime31 + "us")
      let averageTime31 = endTime31 - startTime31
      console.info('appInfoTest xts snakeCaseTest02 averageTime:' + averageTime31 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        snakeCase('--FOO-BAR--')
      }
      endTime(startTime, 'snakeCaseTest02');
    })


    it('splitTest01', 0, () => {
      let startTime32 = new Date().getTime()
      console.info('appInfoTest xts splitTest01 startTime:' + startTime32 + "us")
      expect(JSON.stringify(split('a-b-c', '-', 2))).assertEqual('["a","b"]');
      let endTime32 = new Date().getTime()
      console.info('appInfoTest xts splitTest01 endTime:' + endTime32 + "us")
      let averageTime32 = endTime32 - startTime32
      console.info('appInfoTest xts splitTest01 averageTime:' + averageTime32 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        split('a-b-c', '-', 2)
      }
      endTime(startTime, 'splitTest01');
    })


    it('splitTest02', 0, () => {
      let startTime33 = new Date().getTime()
      console.info('appInfoTest xts splitTest02 startTime:' + startTime33 + "us")
      expect(JSON.stringify(split('A#B#C', '#', 3))).assertEqual('["A","B","C"]');
      let endTime33 = new Date().getTime()
      console.info('appInfoTest xts splitTest02 endTime:' + endTime33 + "us")
      let averageTime33 = endTime33 - startTime33
      console.info('appInfoTest xts splitTest02 averageTime:' + averageTime33 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        split('A#B#C', '#', 3)
      }
      endTime(startTime, 'splitTest02');
    })


    it('startCaseTest01', 0, () => {
      let startTime34 = new Date().getTime()
      console.info('appInfoTest xts startCaseTest01 startTime:' + startTime34 + "us")
      expect(startCase('--foo-bar--')).assertEqual('Foo Bar');
      let endTime34 = new Date().getTime()
      console.info('appInfoTest xts startCaseTest01 endTime:' + endTime34 + "us")
      let averageTime34 = endTime34 - startTime34
      console.info('appInfoTest xts startCaseTest01 averageTime:' + averageTime34 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        startCase('--foo-bar--')
      }
      endTime(startTime, 'startCaseTest01');
    })


    it('startCaseTest02', 0, () => {
      let startTime35 = new Date().getTime()
      console.info('appInfoTest xts startCaseTest02 startTime:' + startTime35 + "us")
      expect(startCase('__FOO_BAR__')).assertEqual('FOO BAR');
      let endTime35 = new Date().getTime()
      console.info('appInfoTest xts startCaseTest02 endTime:' + endTime35 + "us")
      let averageTime35 = endTime35 - startTime35
      console.info('appInfoTest xts startCaseTest02 averageTime:' + averageTime35 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        startCase('__FOO_BAR__')
      }
      endTime(startTime, 'startCaseTest02');
    })


    it('startsWithTest01', 0, () => {
      let startTime36 = new Date().getTime()
      console.info('appInfoTest xts startsWithTest01 startTime:' + startTime36 + "us")
      expect(startsWith('abc', 'a')).assertTrue();
      let endTime36 = new Date().getTime()
      console.info('appInfoTest xts startsWithTest01 endTime:' + endTime36 + "us")
      let averageTime36 = endTime36 - startTime36
      console.info('appInfoTest xts startsWithTest01 averageTime:' + averageTime36 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        startsWith('abc', 'a')
      }
      endTime(startTime, 'startsWithTest01');
    })


    it('startsWithTest02', 0, () => {
      let startTime37 = new Date().getTime()
      console.info('appInfoTest xts startsWithTest02 startTime:' + startTime37 + "us")
      expect(startsWith('abc', 'b')).assertFalse();
      let endTime37 = new Date().getTime()
      console.info('appInfoTest xts startsWithTest02 endTime:' + endTime37 + "us")
      let averageTime37 = endTime37 - startTime37
      console.info('appInfoTest xts startsWithTest02 averageTime:' + averageTime37 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        startsWith('abc', 'b')
      }
      endTime(startTime, 'startsWithTest02');
    })


    it('toLowerTest01', 0, () => {
      let startTime38 = new Date().getTime()
      console.info('appInfoTest xts toLowerTest01 startTime:' + startTime38 + "us")
      expect(toLower('--Foo-Bar--')).assertEqual('--foo-bar--');
      let endTime38 = new Date().getTime()
      console.info('appInfoTest xts toLowerTest01 endTime:' + endTime38 + "us")
      let averageTime38 = endTime38 - startTime38
      console.info('appInfoTest xts toLowerTest01 averageTime:' + averageTime38 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        toLower('--Foo-Bar--')
      }
      endTime(startTime, 'toLowerTest01');
    })


    it('toLowerTest02', 0, () => {
      let startTime39 = new Date().getTime()
      console.info('appInfoTest xts toLowerTest02 startTime:' + startTime39 + "us")
      expect(toLower('__FOO_BAR__')).assertEqual('__foo_bar__');
      let endTime39 = new Date().getTime()
      console.info('appInfoTest xts toLowerTest02 endTime:' + endTime39 + "us")
      let averageTime39 = endTime39 - startTime39
      console.info('appInfoTest xts toLowerTest02 averageTime:' + averageTime39 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        toLower('__FOO_BAR__')
      }
      endTime(startTime, 'toLowerTest02');
    })


    it('toUpperTest01', 0, () => {
      let startTime40 = new Date().getTime()
      console.info('appInfoTest xts toUpperTest01 startTime:' + startTime40 + "us")
      expect(toUpper('--foo-bar--')).assertEqual('--FOO-BAR--');
      let endTime40 = new Date().getTime()
      console.info('appInfoTest xts toUpperTest01 endTime:' + endTime40 + "us")
      let averageTime40 = endTime40 - startTime40
      console.info('appInfoTest xts toUpperTest01 averageTime:' + averageTime40 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        toUpper('--foo-bar--')
      }
      endTime(startTime, 'toUpperTest01');
    })


    it('toUpperTest02', 0, () => {
      let startTime41 = new Date().getTime()
      console.info('appInfoTest xts toUpperTest02 startTime:' + startTime41 + "us")
      expect(toUpper('__foo_bar__')).assertEqual('__FOO_BAR__');
      let endTime41 = new Date().getTime()
      console.info('appInfoTest xts toUpperTest02 endTime:' + endTime41 + "us")
      let averageTime41 = endTime41 - startTime41
      console.info('appInfoTest xts toUpperTest02 averageTime:' + averageTime41 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        toUpper('__foo_bar__')
      }
      endTime(startTime, 'toUpperTest02');
    })


    it('trimTest01', 0, () => {
      let startTime42 = new Date().getTime()
      console.info('appInfoTest xts trimTest01 startTime:' + startTime42 + "us")
      expect(trim('  abc  ')).assertEqual('abc');
      let endTime42 = new Date().getTime()
      console.info('appInfoTest xts trimTest01 endTime:' + endTime42 + "us")
      let averageTime42 = endTime42 - startTime42
      console.info('appInfoTest xts trimTest01 averageTime:' + averageTime42 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        trim('  abc  ')
      }
      endTime(startTime, 'trimTest01');
    })


    it('trimTest02', 0, () => {
      let startTime43 = new Date().getTime()
      console.info('appInfoTest xts trimTest02 startTime:' + startTime43 + "us")
      expect(JSON.stringify(map(['  foo  ', '  bar  '], trim))).assertEqual('["foo","bar"]');
      let endTime43 = new Date().getTime()
      console.info('appInfoTest xts trimTest02 endTime:' + endTime43 + "us")
      let averageTime43 = endTime43 - startTime43
      console.info('appInfoTest xts trimTest02 averageTime:' + averageTime43 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        map(['  foo  ', '  bar  '], trim)
      }
      endTime(startTime, 'trimTest02');
    })


    it('trimEndTest01', 0, () => {
      let startTime44 = new Date().getTime()
      console.info('appInfoTest xts trimEndTest01 startTime:' + startTime44 + "us")
      expect(trimEnd('  abc  ')).assertEqual('  abc');
      let endTime44 = new Date().getTime()
      console.info('appInfoTest xts trimEndTest01 endTime:' + endTime44 + "us")
      let averageTime44 = endTime44 - startTime44
      console.info('appInfoTest xts trimEndTest01 averageTime:' + averageTime44 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        trimEnd('  abc  ')
      }
      endTime(startTime, 'trimEndTest01');
    })


    it('trimEndTest02', 0, () => {
      let startTime45 = new Date().getTime()
      console.info('appInfoTest xts trimEndTest02 startTime:' + startTime45 + "us")
      expect(trimEnd('-_-abc-_-', '_-')).assertEqual('-_-abc');
      let endTime45 = new Date().getTime()
      console.info('appInfoTest xts trimEndTest02 endTime:' + endTime45 + "us")
      let averageTime45 = endTime45 - startTime45
      console.info('appInfoTest xts trimEndTest02 averageTime:' + averageTime45 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        trimEnd('-_-abc-_-', '_-')
      }
      endTime(startTime, 'trimEndTest02');
    })


    it('trimStartTest01', 0, () => {
      let startTime46 = new Date().getTime()
      console.info('appInfoTest xts trimStartTest01 startTime:' + startTime46 + "us")
      expect(trimStart('  abc  ')).assertEqual('abc  ');
      let endTime46 = new Date().getTime()
      console.info('appInfoTest xts trimStartTest01 endTime:' + endTime46 + "us")
      let averageTime46 = endTime46 - startTime46
      console.info('appInfoTest xts trimStartTest01 averageTime:' + averageTime46 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        trimStart('  abc  ')
      }
      endTime(startTime, 'trimStartTest01');
    })


    it('trimStartTest02', 0, () => {
      let startTime47 = new Date().getTime()
      console.info('appInfoTest xts trimStartTest02 startTime:' + startTime47 + "us")
      expect(trimStart('-_-abc-_-', '_-')).assertEqual('abc-_-');
      let endTime47 = new Date().getTime()
      console.info('appInfoTest xts trimStartTest02 endTime:' + endTime47 + "us")
      let averageTime47 = endTime47 - startTime47
      console.info('appInfoTest xts trimStartTest02 averageTime:' + averageTime47 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        trimStart('-_-abc-_-', '_-')
      }
      endTime(startTime, 'trimStartTest02');
    })


    it('truncateTest01', 0, () => {
      let startTime48 = new Date().getTime()
      console.info('appInfoTest xts truncateTest01 startTime:' + startTime48 + "us")
      expect(truncate('hi-diddly-ho there, neighborino')).assertEqual('hi-diddly-ho there, neighbo...');
      let endTime48 = new Date().getTime()
      console.info('appInfoTest xts truncateTest01 endTime:' + endTime48 + "us")
      let averageTime48 = endTime48 - startTime48
      console.info('appInfoTest xts truncateTest01 averageTime:' + averageTime48 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        truncate('hi-diddly-ho there, neighborino')
      }
      endTime(startTime, 'truncateTest01');
    })


    it('truncateTest02', 0, () => {
      let startTime49 = new Date().getTime()
      console.info('appInfoTest xts truncateTest02 startTime:' + startTime49 + "us")
      let string: string = truncate('hi-diddly-ho there, neighborino', {
        'omission': ' [...]'
      });

      let endTime49 = new Date().getTime()
      console.info('appInfoTest xts truncateTest02 endTime:' + endTime49 + "us")
      let averageTime49 = endTime49 - startTime49
      console.info('appInfoTest xts truncateTest02 averageTime:' + averageTime49 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        truncate('hi-diddly-ho there, neighborino', {
          'omission': ' [...]'
        });
      }
      endTime(startTime, 'truncateTest02');
      expect(string).assertEqual('hi-diddly-ho there, neig [...]');
    })


    it('unescapeTest01', 0, () => {
      let startTime50 = new Date().getTime()
      console.info('appInfoTest xts unescapeTest01 startTime:' + startTime50 + "us")
      expect(unescape('fred, barney, &amp; pebbles')).assertEqual('fred, barney, & pebbles');
      let endTime50 = new Date().getTime()
      console.info('appInfoTest xts unescapeTest01 endTime:' + endTime50 + "us")
      let averageTime50 = endTime50 - startTime50
      console.info('appInfoTest xts unescapeTest01 averageTime:' + averageTime50 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        unescape('fred, barney, &amp; pebbles')
      }
      endTime(startTime, 'unescapeTest01');
    })


    it('unescapeTest02', 0, () => {
      let startTime51 = new Date().getTime()
      console.info('appInfoTest xts unescapeTest02 startTime:' + startTime51 + "us")
      expect(unescape('hello, &amp; &gt; world!')).assertEqual('hello, & > world!');
      let endTime51 = new Date().getTime()
      console.info('appInfoTest xts unescapeTest02 endTime:' + endTime51 + "us")
      let averageTime51 = endTime51 - startTime51
      console.info('appInfoTest xts unescapeTest02 averageTime:' + averageTime51 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        unescape('hello, &amp; &gt; world!')
      }
      endTime(startTime, 'unescapeTest02');
    })


    it('upperCaseTest01', 0, () => {
      let startTime52 = new Date().getTime()
      console.info('appInfoTest xts upperCaseTest01 startTime:' + startTime52 + "us")
      expect(upperCase('--foo-bar')).assertEqual('FOO BAR');
      let endTime52 = new Date().getTime()
      console.info('appInfoTest xts upperCaseTest01 endTime:' + endTime52 + "us")
      let averageTime52 = endTime52 - startTime52
      console.info('appInfoTest xts upperCaseTest01 averageTime:' + averageTime52 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        upperCase('--foo-bar')
      }
      endTime(startTime, 'upperCaseTest01');
    })


    it('upperCaseTest02', 0, () => {
      let startTime53 = new Date().getTime()
      console.info('appInfoTest xts upperCaseTest02 startTime:' + startTime53 + "us")
      expect(upperCase('__foo_bar__')).assertEqual('FOO BAR');
      let endTime53 = new Date().getTime()
      console.info('appInfoTest xts upperCaseTest02 endTime:' + endTime53 + "us")
      let averageTime53 = endTime53 - startTime53
      console.info('appInfoTest xts upperCaseTest02 averageTime:' + averageTime53 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        upperCase('__foo_bar__')
      }
      endTime(startTime, 'upperCaseTest02');
    })


    it('upperFirstTest01', 0, () => {
      let startTime54 = new Date().getTime()
      console.info('appInfoTest xts upperFirstTest01 startTime:' + startTime54 + "us")
      expect(upperFirst('fred')).assertEqual('Fred');
      let endTime54 = new Date().getTime()
      console.info('appInfoTest xts upperFirstTest01 endTime:' + endTime54 + "us")
      let averageTime54 = endTime54 - startTime54
      console.info('appInfoTest xts upperFirstTest01 averageTime:' + averageTime54 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        upperFirst('fred')
      }
      endTime(startTime, 'upperFirstTest01');
    })


    it('upperFirstTest02', 0, () => {
      let startTime55 = new Date().getTime()
      console.info('appInfoTest xts upperFirstTest02 startTime:' + startTime55 + "us")
      expect(upperFirst('FRED')).assertEqual('FRED');
      let endTime55 = new Date().getTime()
      console.info('appInfoTest xts upperFirstTest02 endTime:' + endTime55 + "us")
      let averageTime55 = endTime55 - startTime55
      console.info('appInfoTest xts upperFirstTest02 averageTime:' + averageTime55 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        upperFirst('FRED')
      }
      endTime(startTime, 'upperFirstTest02');
    })


    it('wordsTest01', 0, () => {
      let startTime56 = new Date().getTime()
      console.info('appInfoTest xts wordsTest01 startTime:' + startTime56 + "us")
      expect(JSON.stringify(words('fred, barney, & pebbles'))).assertEqual('["fred","barney","pebbles"]');
      let endTime56 = new Date().getTime()
      console.info('appInfoTest xts wordsTest01 endTime:' + endTime56 + "us")
      let averageTime56 = endTime56 - startTime56
      console.info('appInfoTest xts wordsTest01 averageTime:' + averageTime56 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        words('fred, barney, & pebbles')
      }
      endTime(startTime, 'wordsTest01');
    })


    it('wordsTest02', 0, () => {
      let startTime57 = new Date().getTime()
      console.info('appInfoTest xts wordsTest02 startTime:' + startTime57 + "us")
      expect(JSON.stringify(words('fred, barney, & pebbles', '&'))).assertEqual('["&"]');
      let endTime57 = new Date().getTime()
      console.info('appInfoTest xts wordsTest02 endTime:' + endTime57 + "us")
      let averageTime57 = endTime57 - startTime57
      console.info('appInfoTest xts wordsTest02 averageTime:' + averageTime57 + "us")
      let startTime = new Date().getTime();
      for (let index = 0; index < BASE_COUNT; index++) {
        words('fred, barney, & pebbles', '&')
      }
      endTime(startTime, 'wordsTest02');
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