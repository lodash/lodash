import getNative from './_getNative.js';

var defineProperty = ((() => {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
})());

export default defineProperty;
