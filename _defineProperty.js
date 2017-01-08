import getNative from './_getNative.js';

const defineProperty = ((() => {
  try {
    const func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
})());

export default defineProperty;
