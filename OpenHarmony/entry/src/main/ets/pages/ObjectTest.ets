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

import { assignIn, findKey, forIn, keys, get, invert } from "lodash";

class C {
  c: number = 0
}
class B {
  b: C | ESObject
}
class Objects {
  a: B[] = []
}
class ABC {
  a: string = ''
  b: string = ''
  c: string = ''
}

class Info{
  Name: string = ''
  password: string = ''
  username: string = ''
}
@Entry
@Component
struct Index {
  @State a: number = 0;
  @State b: number = 0;
  @State c: number = 0;
  @State d: number = 0;

  build() {
    Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center }) {
      Button($r('app.string.Traverse_target_object'))
        .onClick(() => {
          let object: object = assignIn( { a:4 }, {b: 1}, {c: 3});
          // => {"a":4,"b":1,"c":3}
          console.log('遍历并继承分配来源对象的可枚举属性到目标对象上：' + JSON.stringify(object));
        }).margin(10);

      Button($r('app.string.Accessing_certain_conditions'))
        .onClick(() => {
          class User {
            salary: number = 0
            active: boolean = true
          }
          class MeetuS {
            meetu: User | ESObject
            teetu: User | ESObject
            seetu: User | ESObject
          }
          let users: MeetuS = {
            meetu:  { salary:36000, active:true },
            teetu:  { salary:40000, active:false },
            seetu:  { salary:10000, active:true }
          };

          let found_elem: number = findKey(users, (o: ESObject) => {
            return o.salary < 40000;
          });
          console.log('访问集合的每个值,在一定条件下获取匹配的元素为：' + found_elem);
        }).margin(10)

      Button($r('app.string.Traverse_objects'))
        .onClick(() => {
          let object: ABC = {a: 'a', b: 'b', c: 'c'}
          let item: string = forIn(object, (value: ESObject, key: ESObject) => {
            console.log(key);
          });
          console.log('遍历的对象:' + JSON.stringify(item));
        }).margin(10)

      Button($r('app.string.Create_enumerable_properties'))
        .onClick(() => {
          let obj: Info = {
            Name:"Geeks for Geeks",
            password:"@1234",
            username:"your_geeks"
          }
          // => ["Name","password","username"]
          console.log('创建一个object自身和继承的可枚举属性名为数组:' + JSON.stringify(keys(obj)));
        }).margin(10)

      Button($r('app.string.Obtain_values_based_object'))
        .onClick(() => {
          let object: Objects = { a: [{ b: { c: 3 } }] };

          let get1: object = get(object, 'a[0].b.c');
          // => 3

          let get2: object = get(object, ['a', '0', 'b', 'c']);
          // => 3

          let get3: object = get(object, 'a.b.c', 'default');
          // => 'default'
          console.log('根据对象的path路径获取值:' + get1 + ' ' + get2 + ' ' + get3);
        }).margin(10)

      Button($r('app.string.Create_key_values'))
        .onClick(() => {
          class AObject {
            a: number = 0
            b: number = 0
            c: number = 0
          }
          let object: AObject = { a: 1, b: 2, c: 1 };

          let invertObject: object = invert(object);
          // => { '1': 'c', '2': 'b' }
          console.log('创建一个object键值倒置后的对象:' + JSON.stringify(invertObject));
        }).margin(10)
    }
    .width('100%')
    .height('100%')
  }
}

