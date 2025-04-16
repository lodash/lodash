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

import { conforms, filter, defaultTo, identity, nthArg, stubObject, times } from "lodash";

class conformsObject {
  a: number = 0
  b: number = 0
}

class identityObject {
  name: string = ''
  age: number = 0
  active: boolean = true
}
@Entry
@Component
struct Index {

  build() {
    Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center }) {
      Button($r('app.string.Get_corresponding_content'))
        .onClick(() => {
          let objects: conformsObject[] = [
            { a: 2, b: 1 },
            { a: 1, b: 2 }
          ];
          let result: number[] = filter(objects, conforms({ 'b': (n: number) => {
            return n > 1;
          } }));
          // => [{ 'a': 1, 'b': 2 }]
          console.log('conforms：' + JSON.stringify(result));
        }).margin(10);

      Button($r('app.string.Check_be_returned'))
        .onClick(() => {
          let isDefault: ESObject = defaultTo(undefined, 10);
          // => 10
          console.log('如果检查值为NaN, null, 或者 undefined，返回默认值，否则返回检查值：' + JSON.stringify(isDefault));
        }).margin(10)

      Button($r('app.string.Get_parameter_received'))
        .onClick(() => {
          let user: identityObject[] = [
            { name:'XXXX', age: 36, active:true },
            { name:'YYYY', age: 40, active:false }
          ];
          let parameter: ESObject = identity(user);
          console.log('获取接收的第一个参数:' + JSON.stringify(parameter));
        }).margin(10)

      Button($r('app.string.Create_function_parameter'))
        .onClick(() => {
          let func: ESObject = nthArg(2);
          // 'c'
          console.log('创建一个函数，这个函数返回第n个参数为:' + JSON.stringify(func('a', 'b', 'c', 'd')));
        }).margin(10)

      Button($r('app.string.Get_an_empty_object'))
        .onClick(() => {
          let objects: ESObject = times(2, stubObject);
          // => [{}, {}]
          console.log('返回一个空对象为:' + JSON.stringify(objects));
        }).margin(10)
    }
    .width('100%')
    .height('100%')
  }
}
