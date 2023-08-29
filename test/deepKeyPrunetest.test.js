/* eslint-disable no-undef */
import assert from 'assert'
import deepKeyPrune from '../deepKeyPrune.js'


describe('deepKeyPrune', () => {
  it('should filter properties based on provided predicates', () => {
    const data = {
      name: 'John',
      age: 30,
      address: {
        city: 'New York',
        country: 'USA'
      },
      hobbies: ['reading', 'swimming']
    }

    const filters = {
      name: (value) => value !== 'John',
      city: (value) => value !== 'New York',
      country: (value) => value !== 'USA'
    }

    const filteredData = deepKeyPrune(data, filters)

    assert.deepStrictEqual(filteredData, {
      age: 30,
      address: {},
      hobbies: ['reading', 'swimming']
    })
  })

  it('should handle filtering in nested arrays', () => {
    const data = {
      items: [
        { name: 'item1', active: true },
        { name: 'item2', active: false }
      ]
    }

    const filters = {
      active: (value) => value === true
    }

    const filteredData = deepKeyPrune(data, filters)

    assert.deepStrictEqual(filteredData, {
      items: [{ name: 'item1', active: true }, { name: 'item2' }]
    })
  })

  it('should handle filtering of deeply nested objects', () => {
    const data = {
      level1: {
        level2: {
          level3: {
            value1: 'keep',
            value2: 'remove'
          }
        }
      }
    }

    const filters = {
      value2: (value) => value !== 'remove'
    }

    const filteredData = deepKeyPrune(data, filters)

    assert.deepStrictEqual(filteredData, {
      level1: {
        level2: {
          level3: {
            value1: 'keep'
          }
        }
      }
    })
  })

  it('should not modify the original object', () => {
    const data = {
      name: 'John',
      age: 30
    }

    const filters = {
      age: (value) => value > 25
    }

    deepKeyPrune(data, filters)

    assert.deepStrictEqual(data, {
      name: 'John',
      age: 30
    })
  })

  it('should handle deep filtering with nested objects', () => {
    const data = {
      person: {
        name: 'Alice',
        age: 25,
        address: {
          street: '456 Elm St',
          city: 'Townsville'
        }
      }
    }

    const predicates = {
      person: (value) => typeof value === 'object',
      age: (value) => value <= 18,
      street: (value) => typeof value === 'string'
    }

    const expectedFilteredData = {
      person: {
        name: 'Alice',
        address: {
          street: '456 Elm St',
          city: 'Townsville'
        }
      }
    }

    const filteredData = deepKeyPrune(data, predicates)
    assert.deepEqual(filteredData, expectedFilteredData)
  })

  it('should handle empty object and array filtering', () => {
    const data = {
      prop1: {},
      prop2: [],
      prop3: {
        nested: {},
        nestedArray: []
      }
    }

    const predicates = {
      prop1: (value) => typeof value === 'object',
      prop2: (value) => Array.isArray(value),
      nested: (value) => typeof value === 'object',
      nestedArray: (value) => Array.isArray(value)
    }

    const expectedFilteredData = {
      prop1: {},
      prop2: [],
      prop3: {
        nested: {},
        nestedArray: []
      }
    }

    const filteredData = deepKeyPrune(data, predicates)
    assert.deepEqual(filteredData, expectedFilteredData)
  })

  it('should filter based on both local and global predicates', () => {
    const originalObject = { a: 1, b: 2, c: { d: 3, e: 4 } }

    const predicates = {
      a: (v) => v > 2
    }

    const globalPredicate = (k, v) => v !== 4

    assert.deepStrictEqual(deepKeyPrune(originalObject, predicates, globalPredicate), {
      b: 2,
      c: {
        d: 3
      }
    })
  })

  it('should filter based on both local and global predicates', () => {
    const originalObject = { a: 1, b: 2, c: { d: 3, e: 4 } }

    const predicates = {
      a: (v) => v > 2
    }

    const globalPredicate = (k, v) => v !== 4

    assert.deepStrictEqual(deepKeyPrune(originalObject, predicates, globalPredicate), {
      b: 2,
      c: {
        d: 3
      }
    })
  })

  it('should filter based on both local and global predicates key', () => {
    const originalObject = { a: 1, b: 2, c: { d: 3, e: 4 } }

    const predicates = {
      a: (v) => v > 2
    }

    const globalPredicate = (k, v) => k !== 'e'

    assert.deepStrictEqual(deepKeyPrune(originalObject, predicates, globalPredicate), {
      b: 2,
      c: {
        d: 3
      }
    })
  })


})


describe('deepKeyPrune Function Tests', () => {

  it('should filter out employees based on a global predicate that checks age', () => {
    const employees = [
      { name: 'Alice', age: 30, role: 'developer' },
      { name: 'Bob', age: 25, role: 'designer' },
      { name: 'Charlie', age: 35, role: 'manager' }
    ]
    const globalPredicate = (key, value) => !(key === 'age' && value < 30)
    assert.deepStrictEqual(deepKeyPrune(employees, {}, globalPredicate), [
      { name: 'Alice', age: 30, role: 'developer' },
      { name: 'Bob', role: 'designer' },
      { name: 'Charlie',age: 35, role: 'manager' }
    ])
  })

})

