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
import {add,camelCase,capitalize,ceil,chunk, compact,countBy,deburr,difference,divide,drop,endsWith,every,fill,filter,find,findIndex,flatMap,
  flatten,floor,forEach,fromPairs,groupBy,head,includes,indexOf,initial,intersection,invokeMap,join,keyBy,last,map,max,mean,min,multiply,nth,
  orderBy,partition,pull,reduce,reject,remove,reverse,round,sample,shuffle,size,some,sortBy,sortedIndex,subtract,sum,tail,take,union,uniq,unzip,without,xor,zip,
  escape,unescape,kebabCase,lowerCase,pad,repeat,replace,snakeCase,split,startCase,toLower,trim,toUpper,
  truncate,
  upperCase,
  words,
  defaultTo,
  over,
  range,
  times,
  toPath,
  uniqueId
} from 'lodash'
import router from '@ohos.router'

class finds {
  user: string = ''
  active: boolean = true
}

class User {
  user: string = ''
  age: number = 0
  active: boolean = true
}

class array {
  dir: string = ''
  code: number = 0
}

class order {
  user: string = ''
  age: number = 0
}
@Entry
@Component
struct Index {

  build() {
    Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center }) {
      Button() {
        Text('no args btn').fontSize(30).fontWeight(FontWeight.Bold)
      }.onClick((event: ClickEvent) => {
        this.onInit()
      }).margin(5).width(200);

      Button('Math Test').backgroundColor(0x2788D9)
        .onClick((event: ClickEvent) => {
          let path = 'pages/MathTest'
          router.pushUrl({
            url: path,
          });
        }).margin(5).width(200);

      Button('Array Test').backgroundColor(0x2788D9)
        .onClick((event: ClickEvent) => {
          let path = 'pages/ArrayTest'
          router.pushUrl({
            url: path,
          });
        }).margin(5).width(200);

      Button('CollectionTest Test').backgroundColor(0x2788D9)
        .onClick((event: ClickEvent) => {
          let path = 'pages/CollectionTest'
          router.pushUrl({
            url: path,
          });
        }).margin(5).width(200);

      Button('Date Test').backgroundColor(0x2788D9)
        .onClick((event: ClickEvent) => {
          let path = 'pages/DateTest'
          router.pushUrl({
            url: path,
          });
        }).margin(5).width(200);

      Button('Function Test').backgroundColor(0x2788D9)
        .onClick((event: ClickEvent) => {
          let path = 'pages/FunctionTest'
          router.pushUrl({
            url: path,
          });
        }).margin(5).width(200);

      Button('Lang Test').backgroundColor(0x2788D9)
        .onClick((event: ClickEvent) => {
          let path = 'pages/LangTest'
          router.pushUrl({
            url: path,
          });
        }).margin(5).width(200);

      Button('Number Test').backgroundColor(0x2788D9)
        .onClick((event: ClickEvent) => {
          let path = 'pages/NumberTest'
          router.pushUrl({
            url: path,
          });
        }).margin(5).width(200);

      Button('Object Test').backgroundColor(0x2788D9)
        .onClick((event: ClickEvent) => {
          let path = 'pages/ObjectTest'
          router.pushUrl({
            url: path,
          });
        }).margin(5).width(200);

      Button('String Test').backgroundColor(0x2788D9)
        .onClick((event: ClickEvent) => {
          let path = 'pages/StringTest'
          router.pushUrl({
            url: path,
          });
        }).margin(5).width(200);

      Button('Util Test').backgroundColor(0x2788D9)
        .onClick((event: ClickEvent) => {
          let path = 'pages/UtilTest'
          router.pushUrl({
            url: path,
          });
        }).margin(5).width(200);
    }
    .width('100%')
    .height('100%')
  }

  onInit() {
    //数组[Array]拓展模块
    //创建一个元素数组，该数组被分成大小长度的组。如果数组不能被平均分割，最后的块将是剩余的元素。
    // => [['a', 'b', 'c'], ['d']]
    console.info("chunk:" + chunk(['a', 'b', 'c', 'd'], 3));
    //创建一个删除所有错误值的数组。值 false、null、0、""、undefined 和 NaN 是错误的。ne't
    // => [1, 2, 3]
    console.info("compact:" + compact([0, 1, false, 2, '', 3]));
    //使用 SameValueZero 创建不包含在其他给定数组中的数组值数组以进行相等比较。结果值的顺序和引用由第一个数组确定。
    // => [1]
    console.info("difference:" + difference([2, 1], [2, 3]));
    //创建一个数组切片，其中从开头删除了 n 个元素
    // => [3]
    console.info("drop:" + drop([1, 2, 3], 2));
    //用从开始到结束的值填充数组的元素，但不包括结束。
    // => [4, '*', '*', 10]
    console.info("fill:" + fill([4, 6, 8, 10], '*', 1, 3));
    //此方法与 find 类似，只是它返回第一个元素的索引，谓词返回truthy for 而不是元素本身
    // => 0
    let users: finds[] = [
      { user: 'barney',  active: false },
      { user: 'fred',    active: false },
      { user: 'pebbles', active: true }
    ];
    console.info("findIndex:" + findIndex(users, (o: ESObject) => { return o.user == 'barney'; }));
    //将阵列展平单层深度。
    // => [1, 2, [3, [4]], 5]
    console.info("flatten:" + flatten([1, [2, [3, [4]], 5]]));
    //toPairs 的倒数；此方法返回一个由键值对组成的对象。
    // => { 'a': 1, 'b': 2 }
    //由于循环打印对象键值对不在本功能测试范畴，以下出现打印有object的可以自己编写循环打印代码验证，本人就不再赘述了
    let obj: ESObject = fromPairs([['a', 1], ['b', 2]]);
    for (let key = 0; key < obj.length; ++key) {
      console.info("fromPairs:" + key + ":" + obj[key]);
    }
    //获取数组的第一个元素
    // => 1
    console.info("head:" + head([1, 2, 3]));
    //获取使用 SameValueZero 进行相等比较的数组中第一次出现值的索引。如果 fromIndex 为负数，则用作距数组末尾的偏移量。
    // => 1
    console.info("indexOf:" + indexOf([1, 2, 1, 2], 2));
    //获取除数组的最后一个元素之外的所有元素。
    // => [1, 2]
    console.info("initial:" + initial([1, 2, 3]));
    //创建一个包含在所有给定数组中的唯一值数组，使用 SameValueZero 进行相等比较。结果值的顺序和引用由第一个数组确定。
    // => [2]
    console.info("intersection:" + intersection([2, 1], [2, 3]));
    //将数组中的所有元素转换为由分隔符分隔的字符串。
    // => 'a~b~c'
    console.info("join:" + join(['a', 'b', 'c'], '~'));
    //获取数组的最后一个元素。
    // => 3
    console.info("last:" + last([1, 2, 3]));
    //获取数组索引 n 处的元素。如果 n 为负数，则返回倒数第 n 个元素
    // => 'c';
    console.info("nth:" + nth(['a', 'b', 'c', 'd'], -2));
    //使用 SameValueZero 从数组中删除所有给定值以进行相等比较。
    // => ['b', 'b']
    console.info("pull:" + pull(['a', 'b', 'c', 'a', 'b', 'c'], 'a', 'c'));
    //从数组中删除所有谓词返回真值的元素，并返回已删除元素的数组。
    // => [2, 4]
    console.info("remove:" + remove([1, 2, 3, 4], (n: number) => {
      return n % 2 == 0;
    }));
    //反转数组，使第一个元素成为最后一个元素，第二个元素成为倒数第二个元素，依此类推。
    // => [3, 2, 1]
    console.info("reverse:" + reverse([1, 2, 3]));
    //使用二分搜索来确定应将值插入数组以保持其排序顺序的最低索引。
    // => 1
    console.info("sortedIndex:" + sortedIndex([30, 50], 40));
    //获取除数组的第一个元素之外的所有元素。
    // => [2, 3]
    console.info("tail:" + tail([1, 2, 3]));
    //创建一个数组切片，其中 n 个元素从头开始。
    // => [1, 2]
    console.info("take:" + take([1, 2, 3], 2));
    //使用 SameValueZero 从所有给定数组中按顺序创建唯一值数组以进行相等比较。
    // => [2, 1]
    console.info("union:" + union([2], [1, 2]));
    //创建数组的无重复版本，使用 SameValueZero 进行相等比较，其中仅保留每个元素的第一次出现。结果值的顺序由它们在数组中出现的顺序决定。
    // => [2, 1]
    console.info("uniq:" + uniq([2, 1, 2]));
    //此方法与 zip 类似，不同之处在于它接受一个分组元素数组并创建一个数组，将元素重新组合到它们的压缩前配置。
    // => [['a', 'b'], [1, 2], [true, false]]
    console.info("unzip:" + unzip([['a', 1, true], ['b', 2, false]]));
    //使用 SameValueZero 创建一个排除所有给定值的数组以进行相等比较。
    // => [3]
    console.info("without:" + without([2, 1, 2, 3], 1, 2));
    //创建一个唯一值数组，该数组是给定数组的对称差值。结果值的顺序由它们在数组中出现的顺序决定。
    // => [1, 3]
    console.info("xor:" + xor([2, 1], [2, 3]));
    //创建一个分组元素数组，其中第一个包含给定数组的第一个元素，第二个包含给定数组的第二个元素，依此类推。
    // => [['a', 1, true], ['b', 2, false]]
    console.info("zip:" + zip(['a', 'b'], [1, 2], [true, false]));

    //集合[Collection]拓展模块
    //创建一个由通过 iteratee 运行集合的每个元素的结果生成的键组成的对象。每个key对应的值就是iteratee返回key的次数。使用一个参数调用迭代对象：（值）。
    // => { '4': 1, '6': 2 }
    console.info("countBy:" + countBy([6.1, 4.2, 6.3], Math.floor));
    //检查谓词是否为集合的所有元素返回真值。一旦谓词返回错误，迭代就会停止。谓词使用三个参数调用：（值、索引|键、集合）。
    // => false
    console.info("every:" + every([true, 1, null, 'yes'], Boolean));
    //遍历集合的元素，返回一个包含所有元素的数组，谓词返回真值。谓词使用三个参数调用：（值、索引|键、集合）。
    // => objects for ['fred']
    let users1: User[] = [
      { user: 'barney', age: 36, active: true },
      { user: 'fred',   age: 40, active: false }
    ];
    console.info("filter:" + filter(users1, (o: User): boolean => { return !o.active; }));
    //迭代集合的元素，返回第一个元素谓词返回truthy for。谓词使用三个参数调用：（值、索引|键、集合）。
    // => object for 'barney'
    let users2: User[] = [
      { user: 'barney',  age: 36, active: true },
      { user: 'fred',    age: 40, active: false },
      { user: 'pebbles', age: 1,  active: true }
    ];
    console.info("find:" + find(users2, (o: User) => { return !o.active; }));
    //通过通过 iteratee 运行集合中的每个元素并展平映射的结果来创建展平的值数组。使用三个参数调用迭代对象：（值、索引|键、集合）。
    // => [1, 1, 2, 2]
    let duplicate: (n: number) => void = (n: number): number[] => {
      return [n, n];
    }
    console.info("flatMap:" + flatMap([1, 2], duplicate));
    //迭代集合的元素并为每个元素调用 iteratee。使用三个参数调用迭代对象：（值、索引|键、集合）。 Iteratee 函数可以通过显式返回 false 提前退出迭代。
    // => Logs `1` then `2`.
    forEach([1, 2], (value: number) => {
      console.info("forEach:" + value);
    });
    //创建一个由通过 iteratee 运行集合的每个元素的结果生成的键组成的对象。分组值的顺序由它们在集合中出现的顺序决定。每个键对应的值是负责生成键的元素数组。使用一个参数调用迭代对象：（值）。
    // => { '4': [4.2], '6': [6.1, 6.3] }
    console.info("groupBy:" + groupBy([6.1, 4.2, 6.3], Math.floor));
    //检查值是否在集合中。如果 collection 是一个字符串，则检查它的值的子字符串，否则 SameValueZero 用于相等比较。如果 fromIndex 为负数，则将其用作与集合末尾的偏移量。
    // => true
    console.info("includes:" + includes([1, 2, 3], 1));
    //在集合中每个元素的路径调用方法，返回每个调用方法的结果数组。为每个调用的方法提供任何附加参数。如果 path 是一个函数，它会被调用，并且 this 绑定到集合中的每个元素。
    // => [[1, 5, 7], [1, 2, 3]]
    console.info("invokeMap:" + invokeMap([[5, 1, 7], [3, 2, 1]], 'sort'));
    //创建一个由通过 iteratee 运行集合的每个元素的结果生成的键组成的对象。每个键对应的值是负责生成键的最后一个元素。使用一个参数调用迭代对象：（值）。
    // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
    let array1: array[] = [
      { dir: 'left', code: 97 },
      { dir: 'right', code: 100 }
    ];
    console.info("keyBy:" + keyBy(array1, (o: array) => {
      return String.fromCharCode(o.code);
    }));
    //通过 iteratee 运行集合中的每个元素来创建一个值数组。使用三个参数调用 iteratee：（值，索引|键，集合）。
    // => [16, 64]
    let square: (n: number) => void = (n: number): number => {
      return n * n;
    }
    console.info("map:" + map([4, 8], square));
    //此方法类似于 sortBy ，不同之处在于它允许指定要排序的迭代对象的排序顺序。如果未指定 orders，则所有值都按升序排序。否则，为相应值的降序指定“desc”或“asc”为升序排序。
    // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
    let users3: order[] = [
      { user: 'fred',   age: 48 },
      { user: 'barney', age: 34 },
      { user: 'fred',   age: 40 },
      { user: 'barney', age: 36 }
    ];
    console.info("orderBy:" + orderBy(users3, ['user', 'age'], ['asc', 'desc']));
    //创建一个元素数组，分成两组，第一组包含元素谓词返回真值，第二组包含元素谓词返回假值。谓词使用一个参数调用：（值）。
    // => objects for [['fred'], ['barney', 'pebbles']]
    let users4: User[] = [
      { user: 'barney',  age: 36, active: false },
      { user: 'fred',    age: 40, active: true },
      { user: 'pebbles', age: 1,  active: false }
    ];
    console.info("partition:" + partition(users4, (o: User) => { return !o.active; }));
    //将集合减少到一个值，该值是通过 iteratee 运行集合中每个元素的累积结果，其中每个连续调用都提供前一个的返回值。如果没有给出累加器，则将集合的第一个元素用作初始值。使用四个参数调用 iteratee：（累加器、值、索引|键、集合）。
    // => 3
    console.info("reduce:" + reduce([1, 2], (sum: number, n: number) => {
      return sum + n;
    }, 0));
    //filter 的反义词；此方法返回谓词不返回真值的集合元素。
    // => objects for ['fred']
    let users5: User[] = [
      { user: 'barney', age: 36, active: false },
      { user: 'fred',   age: 40, active: true }
    ];
    console.info("reject:" + reject(users5, (o: User) => { return !o.active; }));
    //从集合中获取随机元素。
    // => 2
    console.info("sample:" + sample([1, 2, 3, 4]));
    //使用 Fisher-Yates shuffle 的一个版本创建一个混洗值数组。
    // => [4, 1, 3, 2]
    console.info("shuffle:" + shuffle([1, 2, 3, 4]));
    //通过返回类数组值的长度或对象自己的可枚举字符串键控属性的数量来获取集合的大小。
    // => 3
    console.info("size:" + size([1, 2, 3]));
    //检查谓词是否为集合的任何元素返回真值。一旦谓词返回真值，迭代就会停止。谓词使用三个参数调用：（值、索引|键、集合）。
    // => true
    console.info("some:" + some([null, 0, 'yes', false], Boolean));
    //创建一个元素数组，按通过每个迭代器运行集合中的每个元素的结果按升序排序。此方法执行稳定排序，即保留相等元素的原始排序顺序。使用一个参数调用迭代器：（值）。
    // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
    let users6: order[] = [
      { user: 'fred',   age: 48 },
      { user: 'barney', age: 36 },
      { user: 'fred',   age: 40 },
      { user: 'barney', age: 34 }
    ];
    console.info("sortBy:" + sortBy(users6, [(o: order) => { return o.user; }]));

    //数学[Math]拓展模块
    //两个数字相加
    // => 10
    console.info("add:" + add(6, 4));
    //计算不小于当前数字的最小数字。
    // => 5
    console.info("ceil:" + ceil(4.006));
    //将两个数字相除。
    // => 1.5
    console.info("divide:" + divide(6, 4));
    //计算不大于当前数字的最大数字。
    // => 4
    console.info("floor:" + floor(4.006));
    //计算数组的最大值。如果数组为空或为假，则返回 undefined。
    // => 8
    console.info("max:" + max([4, 2, 8, 6]));
    //计算数组中值的平均值。
    // => 5
    console.info("mean:" + mean([4, 2, 8, 6]));
    //计算数组的最小值。如果数组为空或为假，则返回 undefined。
    // => 2
    console.info("min:" + min([4, 2, 8, 6]));
    //将两个数字相乘。
    // => 24
    console.info("multiply:" + multiply(6, 4));
    //计算四舍五入到精度的数字
    // => 4
    console.info("round:" + round(4.006));
    //两个数字相减。
    // => 2
    console.info("subtract:" + subtract(6, 4));
    //计算数组中值的总和。
    // => 20
    console.info("sum:" + sum([4, 2, 8, 6]));

    //字符串[String]拓展模块
    //将字符串转换为驼峰式大小写。
    // => 'fooBar'
    console.info("camelCase:" + camelCase('Foo Bar'));
    //将字符串的第一个字符转换为大写，将其余字符转换为小写。
    // => 'Fred'
    console.info("capitalize:" + capitalize('FRED'));
    //通过将 Latin-1 Supplement 和 Latin Extended-A 字母转换为基本拉丁字母并删除组合变音符号来去除字符串毛刺。
    // => 'deja vu'
    console.info("deburr:" + deburr('déjà vu'));
    //检查字符串是否以给定的目标字符串结尾。
    // => true
    console.info("endsWith:" + endsWith('abc', 'c'));
    //将字符串中的字符 "&"、"<"、">"、'"' 和 "'" 转换为其对应的 HTML 实体。
    // => 'fred, barney, &amp; pebbles'
    console.info("escape:" + escape('fred, barney, & pebbles'));
    //将字符串转换为 kebab 大小写。
    // => 'foo-bar'
    console.info("kebabCase:" + kebabCase('Foo Bar'));
    //将字符串（作为空格分隔的单词）转换为小写。
    // => 'foo bar'
    console.info("lowerCase:" + lowerCase('--Foo-Bar--'));
    //如果长度短于长度，则在左侧和右侧填充字符串。如果填充字符不能按长度均匀划分，则填充字符将被截断。
    // => '  abc   '
    console.info("pad:" + pad('abc', 8));
    //重复给定的字符串 n 次。
    // => '***'
    console.info("repeat:" + repeat('*', 3));
    //用替换替换字符串中模式的匹配项。
    // => 'Hi Barney'
    console.info("replace:" + replace('Hi Fred', 'Fred', 'Barney'));
    //将字符串转换为蛇形大小写。
    // => 'foo_bar'
    console.info("snakeCase:" + snakeCase('Foo Bar'));
    //按分隔符拆分字符串。
    // => ['a', 'b']
    console.info("split:" + split('a-b-c', '-', 2));
    //将字符串转换为起始大小写。
    // => 'Foo Bar'
    console.info("startCase:" + startCase('--foo-bar--'));
    //将字符串作为一个整体转换为小写，就像 String#toLowerCase 一样。
    // => '--foo-bar--'
    console.info("toLower:" + toLower('--Foo-Bar--'));
    //将字符串作为一个整体转换为大写，就像 String#toUpperCase 一样。
    // => '--FOO-BAR--'
    console.info("toUpper:" + toUpper('--foo-bar--'));
    //从字符串中删除前导和尾随空格或指定字符。
    // => 'abc'
    console.info("trim:" + trim('  abc  '));
    //如果字符串长于给定的最大字符串长度，则截断字符串。被截断的字符串的最后一个字符被替换为默认为“...”的省略字符串。
    // => 'hi-diddly-ho there, neighbo...'
    console.info("truncate:" + truncate('hi-diddly-ho there, neighborino'));
    //escape 的逆；此方法转换 HTML 实体 &amp;、&lt;、&gt;、&quot; 和 &#39;在字符串中为其对应的字符。
    // => 'fred, barney, & pebbles'
    console.info("unescape:" + unescape('fred, barney, &amp; pebbles'));
    //将字符串（作为空格分隔的单词）转换为大写。
    // => 'FOO BAR'
    console.info("upperCase:" + upperCase('--foo-bar'));
    //将字符串拆分为其单词的数组。
    // => ['fred', 'barney', 'pebbles']
    console.info("words:" + words('fred, barney, & pebbles'));

    //工具类[Util]拓展模块
    //检查 value 以确定是否应在其位置返回默认值。如果 value 为 NaN、null 或 undefined，则返回 defaultValue。
    // => 1
    console.info("defaultTo:" + defaultTo(1, 10));
    //创建一个函数，该函数使用它接收的参数调用迭代器并返回它们的结果。
    // => [4, 1]
    let func: ESObject = over([Math.max, Math.min]);
    console.info("over:" + func(1, 2, 3, 4));
    //创建一个数字数组（正数和/或负数），从开始到结束，但不包括结束。如果指定负开始而没有结束或步骤，则使用 -1 的步骤。如果未指定 end，则设置为从 start 开始，然后设置为 0。
    // => [0, 1, 2, 3]
    console.info("range:" + range(4));
    //调用迭代 n 次，返回每个调用结果的数组。 iteratee 用一个参数调用； （指数）。
    // => ['0', '1', '2']
    console.info("times:" + times(3, String));
    //将值转换为属性路径数组。
    // => ['a', 'b', 'c']
    console.info("toPath:" + toPath('a.b.c'));
    //生成唯一 ID。如果给出了前缀，则将 ID 附加到它上面。
    // => 'contact_1'
    console.info("uniqueId:" + uniqueId('contact_'));
    // => '2'
    console.info("uniqueId:" + uniqueId());
  }
}

