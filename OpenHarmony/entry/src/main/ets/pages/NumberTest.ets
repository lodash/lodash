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

import { clamp, inRange, random } from "lodash";

@Entry
@Component
struct Index {

  build() {
    Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center }) {
      Button($r('app.string.Get_values_limited'))
        .onClick(() => {
          let numberClamp: number = clamp(10, -5, 5);
          // => 5
          console.log('限制在一个区间之间的值：' + numberClamp);
        }).margin(10);

      Button($r('app.string.Check_certain_range'))
        .onClick(() => {
          let isRange: boolean = inRange(3, 2, 4);
          // => true
          console.log('检查一个数值是否在某一区间之内：' + isRange);
        }).margin(10)

      Button($r('app.string.Generate_certain_intervals'))
        .onClick(() => {
          let randomNumber: number = random(0, 5);
          // => an integer between 0 and 5
          console.log('产生一个包括某一区间之间的数:' + randomNumber);
        }).margin(10)
    }
    .width('100%')
    .height('100%')
  }
}

