# lodash


## 简介
本项目是OpenHarmony系统下使用lodash的示例，lodash是一个提供拓展功能的JavaScript实用工具库


## 下载安装

```shell
ohpm install lodash
ohpm install @types/lodash --save-dev //import lodash 的时候语法报错.其原因是lodash包内不含类型声明,需要 @types/lodash 下载这个包的声明文件,从而解决语法的报错.

```
OpenHarmony ohpm环境配置等更多内容，请参考 [如何安装OpenHarmony ohpm包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md) 。

## 使用说明
```javascript
    //导入lodash相关接口
    import { camelCase, capitalize } from 'lodash'
    let camelCaseString = camelCase('__FOO_BAR__');
    // => 'fooBar'
    console.log('转换字符串为驼峰写法为：' + camelCaseString);
    let capitalizeString = capitalize('FRED');
    // => 'Fred'
    console.log('转换字符串首字母为大写，剩下为小写为：' + capitalizeString);
```
更多api的使用可参考ArrayTest.ets,FunctionTest.ets,NumberTest.ets,CollectionTest.ets,DateTest.ets,LangTest.ets,MathTest.ets,ObjectTest.ets,StringTest.ets,UtilTest.ets

## 接口说明
常用模块如下：

|模块名 | 功能 |
|---|---|
| array | 数组相关的拓展api，比如截取，比较，组合等操作 |
| collection | 集合相关的拓展api，比如过滤，查找，排序等操作 |
| math | 数学运算相关的拓展api，比如四舍五入，求和，比大小等操作 |
| string | 字符串相关的拓展api，比如替换，截取，转大小写等操作 |
| util | 常用工具集，比如转驼峰命名，生成唯一id等操作 |

更多模块的使用可参考[官方文档](https://lodash.com/docs/4.17.15)
## 约束与限制

在下述版本验证通过：

- DevEco Studio 版本： 4.1 Canary(4.1.3.317)

- OpenHarmony SDK:API11 (4.1.0.36)

## 贡献代码

使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues) 给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/pulls) 。

## 开源协议

该项目基于 [MIT License](https://github.com/lodash/lodash/blob/master/LICENSE) ，请自由地享受和参与开源。