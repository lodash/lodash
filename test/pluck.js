const assert = require('assert');
const pluck = require('../pluck');

describe('pluck', () => {
  it('should return values of a given key', () => {
    const students = [
      { name: 'harshitha', age: 28 },
      { name: 'gayathri', age: 54 },
      { name: 'ananth', age: 58 }
    ];
    assert.deepEqual((pluck(students, 'name')), ['harshitha', 'gayathri', 'ananth']);
  });

  it('should return values if name exists', () => {
    const students = [
      { name: 'harshitha', age: 28 },
      { name: 'gayathri', age: 54 },
      { age: 58 }
    ];
    assert.deepEqual((pluck(students, 'name')), ['harshitha', 'gayathri']);
  });

  it('should return valid values if name is null', () => {
    const students = [
      { name: 'harshitha', age: 28 },
      { name: 'gayathri', age: 54 },
      { name: null, age: 58 }
    ];
    assert.deepEqual((pluck(students, 'name')), ['harshitha', 'gayathri']);
  });
});
