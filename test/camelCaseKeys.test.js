import assert from 'assert';
import camelCaseKeys from '../camelCaseKeys';

describe('camelCaseKeys', function(){
    it('should convert keys of an object to camel case', () => {
        const input = {
            first_name: 'John',
            last_name: 'Doe',
            address: {
               street_name: '123 Main St',
               city_name: 'Example City'
            }
        };

        const expectedOutput = {
            firstName: 'John',
            lastName: 'Doe',
            address: {
              streetName: '123 Main St',
              cityName: 'Example City'
            }
        };

        const result = camelCaseKeys(input);
        assert.deepStrictEqual(result, expectedOutput);
    });

    it('should handle arrays correctly', () => {
        const input = [
            {
              first_name: 'John',
              last_name: 'Doe'
            },
            {
              first_name: 'Jane',
              last_name: 'Smith'
            }
        ];
      
        const expectedOutput = [
            {
              firstName: 'John',
              lastName: 'Doe'
            },
            {
              firstName: 'Jane',
              lastName: 'Smith'
            }
        ];

        const result = camelCaseKeys(input);
        assert.deepStrictEqual(result, expectedOutput);
    });

    it('should return the input if it is not an object', () => {
        const input = 'not an object';
    
        const result = camelCaseKeys(input);
    
        assert.strictEqual(result, input);
    });

    it('should return null if the input is null', () => {
        const input = null;
    
        const result = camelCaseKeys(input);
    
        assert.strictEqual(result, null);
    });
})

