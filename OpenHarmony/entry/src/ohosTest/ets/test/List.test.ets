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

import abilityTest from './Ability.test'
import arrayTest from './Array.test'
import collectionTest from './Collection.test'
import functionTest from './Function.test';
import InterfaceTime_Array from './InterfaceTime_Array.test';
import InterfaceTime_Collection from './InterfaceTime_Collection.test';
import InterfaceTime_Function from './InterfaceTime_Function.test';
import InterfaceTime_Lang from './InterfaceTime_Lang.test';
import InterfaceTime_Math from './InterfaceTime_Math.test';
import InterfaceTime_Number from './InterfaceTime_Number.test';
import InterfaceTime_Object from './InterfaceTime_Object.test';
import InterfaceTime_String from './InterfaceTime_String.test';
import InterfaceTime_Util from './InterfaceTime_Util.test';
import langTest from './Lang.test';
import mathTest from './Math.test';
import numberTest from './Number.test';
import objectTest from './Object.test';
import stringTest from './String.test';
import utilTest from './Util.test';

export default function testsuite() {
  abilityTest();
  arrayTest();
  collectionTest();
  functionTest();
  langTest();
  mathTest();
  numberTest();
  objectTest();
  stringTest();
  utilTest();
  InterfaceTime_Collection();
  InterfaceTime_Array();
  InterfaceTime_Function();
  InterfaceTime_Lang();
  InterfaceTime_Math();
  InterfaceTime_Number();
  InterfaceTime_Object();
  InterfaceTime_String();
  InterfaceTime_Util();
}