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

import { camelCase, capitalize, escape, kebabCase, pad, parseInt, map } from "lodash";

@Entry
@Component
struct Index {

  build() {
    Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center }) {
      Button($r('app.string.Convert_string'))
        .onClick(() => {
          let camelCaseString: string = camelCase('__FOO_BAR__');
          // => 'fooBar'
          console.log('转换字符串为驼峰写法为：' + JSON.stringify(camelCaseString));
        }).margin(10);

      Button($r('app.string.Convert_rest_to_lowercase'))
        .onClick(() => {
          let capitalizeString: string = capitalize('FRED');
          // => 'Fred'
          console.log('转换字符串首字母为大写，剩下为小写为：' + JSON.stringify(capitalizeString));
        }).margin(10)

      Button($r('app.string.Convert_the_characters'))
        .onClick(() => {
          let escapeString: string = escape('fred, barney, & pebbles');
          // => 'fred, barney, &amp; pebbles'
          console.log('转换为:' + JSON.stringify(escapeString));
        }).margin(10)

      Button($r('app.string.Convert_kebab_case'))
        .onClick(() => {
          let kebabCaseString: string = kebabCase('__FOO_BAR__');
          // => 'foo-bar'
          console.log('转换字符串为kebab case为:' + JSON.stringify(kebabCaseString));
        }).margin(10)

      Button($r('app.string.Fill_right_sides'))
        .onClick(() => {
          let paddingString: string = pad('abc', 8, '_-');
          // => '_-abc_-_'
          console.log('如果字符串长度小于length则从左侧和右侧填充字符为:' + JSON.stringify(paddingString));
        }).margin(10)

      Button($r('app.string.Convert_cardinality'))
        .onClick(() => {
          let array: number[] = map(['6', '08', '10'], parseInt);
          // => [6, 8, 10]
          console.log('转换字符串为指定基数的整为:' + JSON.stringify(array));
        }).margin(10)
    }
    .width('100%')
    .height('100%')
  }
}
