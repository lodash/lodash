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

import { add, ceil, meanBy } from "lodash";

class Objects {
  n: number = 0
}
@Entry
@Component
struct Index {
  @State augend: number = 0
  @State addend: number = 0
  @State ceilNumber: number = 0
  @State precision: number = 0
  @State mean: number = 0
  getResourceString(res: Resource) {
    return getContext().resourceManager.getStringSync(res.id)
  }
  build() {
    Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center }) {

      Button($r('app.string.Perform_addition'))
        .onClick(() => {
          let additionCount: number = add(10, 7);
          console.log('additionCount（10+7）:' + Math.round(additionCount))
        }).margin(5)

      Button($r('app.string.Perform_rounding'))
        .onClick(() => {
          let ceilCount: number = ceil(6.004, 2);
          console.log('ceil number:' + ceilCount)
        }).margin(5)

      Text(this.getResourceString($r('app.string.Average_value'))  + this.mean)
      Button($r('app.string.Calculate_the'))
        .onClick(() => {
          let sampleObjects: Objects[] = [{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }];
          this.mean = meanBy(sampleObjects, (o: Objects) => { return o.n; })
          console.log('mean:' + this.mean)
        }).margin(5)
    }
    .width('100%')
    .height('100%')
  }
}
