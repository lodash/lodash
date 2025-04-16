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
import { camelCase, capitalize, deburr, endsWith, escape, escapeRegExp, kebabCase, lowerCase, lowerFirst,
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

export default function InterfaceTime_String() {
  describe('interfaceTime_String', () => {

    const BASE_COUNT = 2000
    const BASELINE_CREATEHTTP = 2000
    
    it('camelCase',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        camelCase('Foo Bar')
      }
      let endTime = new Date().getTime()
      console.log("camelCase endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("camelCase averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('capitalize',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        capitalize('FRED')
      }
      let endTime = new Date().getTime()
      console.log("capitalize endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("capitalize averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('deburr',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        deburr('déjà vu')
      }
      let endTime = new Date().getTime()
      console.log("deburr endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("deburr averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('endsWith',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        endsWith('abc', 'c')
      }
      let endTime = new Date().getTime()
      console.log("endsWith endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("endsWith averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('escape',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        escape('fred, barney, & pebbles')
      }
      let endTime = new Date().getTime()
      console.log("escape endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("escape averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('escapeRegExp',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        escapeRegExp('[lodash]+(HELLO)')
      }
      let endTime = new Date().getTime()
      console.log("escapeRegExp endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("escapeRegExp averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('kebabCase',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        kebabCase('Foo Bar')
      }
      let endTime = new Date().getTime()
      console.log("kebabCase endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("kebabCase averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('lowerCase',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        lowerCase('Foo Bar')
      }
      let endTime = new Date().getTime()
      console.log("lowerCase endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("lowerCase averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('lowerFirst',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        lowerFirst('Fred')
      }
      let endTime = new Date().getTime()
      console.log("lowerFirst endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("lowerFirst averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('pad',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        pad('abc', 8)
      }
      let endTime = new Date().getTime()
      console.log("pad endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("pad averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('padEnd',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        padEnd('abc', 6)
      }
      let endTime = new Date().getTime()
      console.log("padEnd endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("padEnd averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('padStart',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        padStart('abc', 6)
      }
      let endTime = new Date().getTime()
      console.log("padStart endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("padStart averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('parseInt',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        parseInt('08')
      }
      let endTime = new Date().getTime()
      console.log("parseInt endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("parseInt averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('repeat',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        repeat('*', 3)
      }
      let endTime = new Date().getTime()
      console.log("repeat endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("repeat averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('replace',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        replace('Hi Fred', 'Fred', 'Barney')
      }
      let endTime = new Date().getTime()
      console.log("replace endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("replace averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('snakeCase',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        snakeCase('Foo Bar')
      }
      let endTime = new Date().getTime()
      console.log("snakeCase endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("snakeCase averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('split',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        split('a-b-c', '-', 2)
      }
      let endTime = new Date().getTime()
      console.log("split endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("split averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('startCase',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        startCase('--foo-bar--')
      }
      let endTime = new Date().getTime()
      console.log("startCase endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("startCase averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('startsWith',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        startsWith('abc', 'a')
      }
      let endTime = new Date().getTime()
      console.log("startsWith endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("startsWith averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('toLower',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        toLower('--Foo-Bar--')
      }
      let endTime = new Date().getTime()
      console.log("toLower endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("toLower averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('toUpper',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        toUpper('--foo-bar--')
      }
      let endTime = new Date().getTime()
      console.log("toUpper endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("toUpper averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('trim',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        trim('  abc  ')
      }
      let endTime = new Date().getTime()
      console.log("trim endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("trim averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('trimEnd',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        trimEnd('  abc  ')
      }
      let endTime = new Date().getTime()
      console.log("trimEnd endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("trimEnd averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('trimStart',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        trimStart('  abc  ')
      }
      let endTime = new Date().getTime()
      console.log("trimStart endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("trimStart averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('truncate',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        truncate('hi-diddly-ho there, neighborino')
      }
      let endTime = new Date().getTime()
      console.log("truncate endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("truncate averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('unescape',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        unescape('fred, barney, &amp; pebbles')
      }
      let endTime = new Date().getTime()
      console.log("unescape endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("unescape averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('upperCase',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        upperCase('--foo-bar')
      }
      let endTime = new Date().getTime()
      console.log("upperCase endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("upperCase averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('upperFirst',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        upperFirst('fred')
      }
      let endTime = new Date().getTime()
      console.log("upperFirst endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("upperFirst averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })

    it('words',TestType.PERFORMANCE, async (done: Function) => {
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        words('fred, barney, & pebbles')
      }
      let endTime = new Date().getTime()
      console.log("words endTime:" + endTime);
      let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT
      console.log("words averageTime:" + averageTime + "μs");
      expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
      done()
    })
  })
}