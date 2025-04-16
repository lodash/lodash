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

import { castArray, clone, eq, isArrayBuffer, isNumber } from "lodash"

class cloneObject {
  a: number = 0
}

class bObject {
  b: number = 0
}

class A {
  a: number = 0
}
@Entry
@Component
struct Index {

  build() {
    Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center }) {
      Button($r('app.string.Force_non_array'))
        .onClick(() => {
          let array1: number[] = castArray({ 'a': 1 });
          // => [{ 'a': 1 }]

          let array2: number[] = castArray('abc');
          // => ['abc']
          console.log('强制转化后的型数组:' + JSON.stringify(array1)+ ' ' + JSON.stringify(array2));
        }).margin(10);

      Button($r('app.string.Obtain_the_copied'))
        .onClick(() => {
          let objects = [{ a: 1 } as cloneObject, { b: 2 } as bObject];
          let shallow: ESObject = clone(objects);
          console.log('拷贝后的值：' + JSON.stringify(shallow));
        }).margin(10)

      Button($r('app.string.Compare_the_values'))
        .onClick(() => {
          let object: A = { a: 1 };
          let other: A = { a: 1 };
          let eqs1: boolean = eq(object, object);
          // => true

          let eqs2: boolean = eq(object, other);
          // => false
          console.log('比较两者的值,两个值相等返回true,否则返回false: ' + eqs1+ ' ' + eqs2);
        }).margin(10)

      Button($r('app.string.Check_if_the_value'))
        .onClick(() => {
          let arrayBuffer: boolean = isArrayBuffer(new ArrayBuffer(2));
          // => true
          console.log('检查值是否是ArrayBuffer对象: ' + arrayBuffer);
        }).margin(10)

      Button($r('app.string.Check_an_object'))
        .onClick(() => {
          let isNumber1: boolean = isNumber(3);
          // => true

          let isNumber2: boolean = isNumber('3');
          // => false
          console.log('检查值是否是原始Number数值型或者对象: ' + isNumber1+ ' ' + isNumber2);
        }).margin(10)
    }
    .width('100%')
    .height('100%')
  }
}

