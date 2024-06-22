import multiSort from '../src/multiSort.ts';

describe('multiSort', () => {
    it('should sort array of objects by multiple criteria', () => {
        const data = [
            { int: 10, str: 'b' },
            { int: 11, str: 'g' },
            { int: 2, str: 'a' },
            { int: 2, str: 'c' },
            { int: 3, str: 'a' },
            { int: 4, str: 'f' },
        ];

        const expected = [
            { int: 2, str: 'a' },
            { int: 2, str: 'c' },
            { int: 3, str: 'a' },
            { int: 4, str: 'f' },
            { int: 10, str: 'b' },
            { int: 11, str: 'g' },
        ];

        const sortedData = multiSort(data, [
            { key: 'int', order: 'asc' },
            { key: 'str', order: 'asc' },
        ]);

        expect(sortedData).toEqual(expected);
    });

    it('should sort array of objects by single criterion', () => {
        const data = [
            { int: 10, str: 'b' },
            { int: 11, str: 'g' },
            { int: 2, str: 'a' },
            { int: 3, str: 'a' },
            { int: 4, str: 'f' },
        ];

        const expected = [
            { int: 2, str: 'a' },
            { int: 3, str: 'a' },
            { int: 4, str: 'f' },
            { int: 10, str: 'b' },
            { int: 11, str: 'g' },
        ];

        const sortedData = multiSort(data, [{ key: 'int', order: 'asc' }]);
        expect(sortedData).toEqual(expected);
    });

    it('should sort array of objects by descending order', () => {
        const data = [
            { int: 10, str: 'b' },
            { int: 11, str: 'g' },
            { int: 2, str: 'a' },
            { int: 3, str: 'a' },
            { int: 4, str: 'f' },
        ];

        const expected = [
            { int: 11, str: 'g' },
            { int: 10, str: 'b' },
            { int: 4, str: 'f' },
            { int: 3, str: 'a' },
            { int: 2, str: 'a' },
        ];

        const sortedData = multiSort(data, [{ key: 'int', order: 'desc' }]);
        expect(sortedData).toEqual(expected);
    });

    it('should handle empty array', () => {
        const data = [];
        const sortedData = multiSort(data, [{ key: 'int', order: 'asc' }]);
        expect(sortedData).toEqual([]);
    });

    it('should handle single element array', () => {
        const data = [{ int: 1, str: 'a' }];
        const sortedData = multiSort(data, [{ key: 'int', order: 'asc' }]);
        expect(sortedData).toEqual([{ int: 1, str: 'a' }]);
    });
});
