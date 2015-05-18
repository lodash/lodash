import getNative from './getNative';
import root from './root';

/** Native method references. */
var WeakMap = getNative(root, 'WeakMap');

/** Used to store function metadata. */
var metaMap = WeakMap && new WeakMap;

export default metaMap;
