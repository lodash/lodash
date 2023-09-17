import { falsey } from './utils';
import compact from '../src/compact';

describe('compact', () => {
    it('should filter falsey values', () => {
        const array = ['0', '1', '2'];
        expect(compact(falsey.concat(array))).toEqual(array);
    });
});
