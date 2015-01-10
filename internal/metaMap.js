import isNative from '../lang/isNative';
import root from './root';

/** Native method references. */
var WeakMap = isNative(WeakMap = root.WeakMap) && WeakMap;

/** Used to store function metadata. */
var metaMap = WeakMap && new WeakMap;

export default metaMap;
