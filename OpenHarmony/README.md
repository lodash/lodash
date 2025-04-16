# lodash


## Introduction
This project demonstrates how to use lodash in OpenHarmony. Lodash is a JavaScript library that provides a wide range of helper functions.


## How to Install

```shell
ohpm install lodash
ohpm install @types/validator --save-dev // Install @types/lodash to prevent import syntax errors due to missing type declarations in the lodash package.

```
For details about the OpenHarmony ohpm environment configuration, see [OpenHarmony HAR](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.en.md).

## How to Use
```javascript
    // Import the lodash APIs.
    import { camelCase, capitalize } from 'lodash'
    let camelCaseString = camelCase('__FOO_BAR__');
    // => 'fooBar'
    console.log('Convert a string to camelCase: '+ camelCaseString);
    let capitalizeString = capitalize('FRED');
    // => 'Fred'
    console.log('Convert the first character of a string to uppercase and the other characters to lowercase.' + capitalizeString);
```
For details about how to use more APIs, see **ArrayTest.ets**, **FunctionTest.ets**, **NumberTest.ets**, **CollectionTest.ets**, **DateTest.ets**, **LangTest.ets**, **MathTest.ets**, **ObjectTest.ets**, **StringTest.ets**, and **UtilTest.ets**.

## Available APIs
The table below describes the common modules.

| Module    | Description                                                   |
| ---------- | ------------------------------------------------------- |
| array      | Extended APIs related to arrays, such as truncation, comparison, and combination.          |
| collection | Extended APIs related to collections, such as filtering, searching, and sorting.          |
| math       | Extended APIs related to mathematical operations, such as rounding, summing, and comparison.|
| string     | Extended APIs related to strings, such as replacement, truncation, and case conversion.    |
| util       | Common utils, for example, converting names to camel case and generating unique IDs.           |

For details about how to use more modules, see the [Official Document](https://lodash.com/docs/4.17.15).
## Constraints

This project has been verified in the following version:

- DevEco Studio: 4.1 Canary (4.1.3.317)

- OpenHarmony SDK: API 11 (4.1.0.36)

## How to Contribute

If you find any problem when using lodash, submit an [issue](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/issues) or a [PR](https://gitee.com/openharmony-tpc/openharmony_tpc_samples/pulls).

## License

This project is licensed under [MIT License](https://github.com/lodash/lodash/blob/master/LICENSE).
