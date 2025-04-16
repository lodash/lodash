/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import _ = require("../index");
declare module "../index" {
    interface LoDashStatic {
        /*
         * Gets the number of milliseconds that have elapsed since the Unix epoch (1 January 1970 00:00:00 UTC).
         *
         * @return The number of milliseconds.
         */
        now(): number;
    }
    interface LoDashImplicitWrapper<TValue> {
        /**
         * @see _.now
         */
        now(): number;
    }
    interface LoDashExplicitWrapper<TValue> {
        /**
         * @see _.now
         */
        now(): PrimitiveChain<number>;
    }
}
