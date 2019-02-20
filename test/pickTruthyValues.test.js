import assert from 'assert';
import pickTruthyValues from '../pickTruthyValues';

describe('pickTruthyValues', function() {
  it('should return empty object with 1 level falsy values', function() {
    var objectToTest = {
      name: null,
      phone: '',
      email: undefined,
      address: {},
      codes: [],
    }

    var actual = pickTruthyValues(objectToTest);

    assert.deepStrictEqual(actual, {});
  });

  it('should return empty object with deep nested falsy values', () => {
    var objectToTest = {
      name: null,
      phone: '',
      email: undefined,
      codes: [
        {
          item: null,
          numbers: [
            {
              item: null,
              numbers: [
                {
                  item: null,
                  numbers: [],
                },
              ],
            },
          ],
        },
      ],
      address: {
        lineOne: null,
        lineTwo: undefined,
        postcode: '',
      },
      object: {
        object: {
          object: {
            object: {
              name: '',
              code: null,
            },
          },
        },
      },
    }

    var actual = pickTruthyValues(objectToTest);

    assert.deepStrictEqual(actual, {});
  })

  it('should return correct truthy values from nested object', () => {
    var objectToTest = {
      name: null,
      phone: '',
      email: undefined,
      codes: [
        {
          item: null,
          numbers: [
            {
              item: null,
              numbers: [
                {
                  item: null,
                  numbers: [1, 2, 3],
                },
              ],
            },
          ],
        },
      ],
      address: {
        lineOne: null,
        lineTwo: undefined,
        postcode: 'SW1',
      },
      object: {
        object: {
          name: 'Test',
          code: null,
        },
      },
    }

    var expected = {
      codes: [
        {
          numbers: [
            {
              numbers: [
                {
                  numbers: [1, 2, 3],
                },
              ],
            },
          ],
        },
      ],
      address: {
        postcode: 'SW1',
      },
      object: {
        object: {
          name: 'Test',
        },
      },
    }

    var actual = pickTruthyValues(objectToTest);

    assert.deepStrictEqual(actual, expected);
  })

  it('should return correct object when has boolean values', () => {
    var objectToTest = {
      test: {
        apple: true,
        orange: false,
      },
      test2: {
        apple: null,
        orange: undefined,
      },
    }

    var expected = {
      test: {
        apple: true,
        orange: false,
      },
    }
    
    var actual = pickTruthyValues(objectToTest);

    assert.deepStrictEqual(actual, expected);
  })
});
