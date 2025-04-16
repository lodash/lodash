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

import { map, ary, curry, debounce, delay } from "lodash";

@Entry
@Component
struct Index {

  build() {
    Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center }) {
      Button($r('app.string.Return_upper_limit'))
        .onClick(() => {
          //[6,8,10]
          let array: number[] = map(['6', '8', '10'], ary(parseInt, 1))
          console.log('返回新的有上限的函数' + JSON.stringify(array));
        }).margin(10);

      Button($r('app.string.Return_curry_function'))
        .onClick(() => {
          let abc = (a: number, b: number ,c: number) => {
            return [a, b, c];
          };
          let curried: ESObject = curry(abc);
          //[1,2,3]
          let curryFunction: number[] = curried(1)(2)(3);
          console.log('返回新的柯里化（curry）函数' + JSON.stringify(curryFunction));
        }).margin(10)

      Button($r('app.string.Return_debounce_function'))
        .onClick(() => {
          let debounce_fun: Function = debounce( ()=>{
            console.log('去抖动函数: Function debounced after 1000ms!');
          }, 1000);
          debounce_fun()
        }).margin(10)

      Button($r('app.string.Call_func_after'))
        .onClick(() => {
          let delayId: number = delay( (text: string) => {
            console.log('一秒后输出参数: '+text);
          }, 1000, 'later');
          console.log('延迟1000毫秒后调用func,返回计时器id: ' + delayId);
        }).margin(10)
    }
    .width('100%')
    .height('100%')
  }
}

