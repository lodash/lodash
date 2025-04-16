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

import { forEach, sample, flatMap } from "lodash";

@Entry
@Component
struct Index {
  @State resultArray: number[] = [];
  @State sampleArray: number[] = [];
  // @State resultArray: number[] = [];
  getResourceString(res: Resource) {
    return getContext().resourceManager.getStringSync(res.id)
  }
  build() {
    Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center }) {
      Button($r('app.string.Traverse_every_element'))
        .onClick(() => {
          forEach([1, 2, 'a', 'b'], (value: number) =>
          console.log("forEach:" + value)
          )
        }).margin(10)

      Text(this.getResourceString($r('app.string.Display_a_random')) + JSON.stringify(this.sampleArray))
      Button($r('app.string.Obtain_a_random'))
        .onClick(() => {
          this.sampleArray = sample([0, undefined, 1, false, 2, 'string', 3, true, null])
          console.log('sample:' + JSON.stringify(this.sampleArray))
        }).margin(10)

      Text($r('app.string.Display_new_flattened') + JSON.stringify(this.resultArray))
      Button($r('app.string.Display_the_newy'))
        .onClick(() => {
          let duplicate: (n: number) => void = (n: number): number[] => {
             return [n, n]
          }
          this.resultArray = flatMap([1, 2], duplicate)
          console.log('flatMap:' + JSON.stringify(this.resultArray))
        }).margin(10)
    }
    .width('100%')
    .height('100%')
  }
}
