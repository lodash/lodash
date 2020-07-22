import assert from 'assert';
import duplicates from '../duplicates.js';

describe('duplicates', function() {

    it('should perform an unsorted duplicates', () => {
        let array = [2,1,4,2,4,5,2,1],

        actual = duplicates(array);

        assert.deepEqual(actual, [2, 1, 4])
    })


})