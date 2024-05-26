import flattenObject from '../src/flattenObject';

describe('flattenObject', () => {
    it('should flatten a simple nested object', () => {
        const input = {
            a: 1,
            b: {
                c: 2,
                d: {
                    e: 3,
                },
            },
            f: 4,
        };
        const expectedOutput = {
            a: 1,
            'b.c': 2,
            'b.d.e': 3,
            f: 4,
        };
        expect(flattenObject(input)).toEqual(expectedOutput);
    });

    it('should handle an empty object', () => {
        const input = {};
        const expectedOutput = {};
        expect(flattenObject(input)).toEqual(expectedOutput);
    });

    it('should handle a non-nested object', () => {
        const input = {
            a: 1,
            b: 2,
            c: 3,
        };
        const expectedOutput = {
            a: 1,
            b: 2,
            c: 3,
        };
        expect(flattenObject(input)).toEqual(expectedOutput);
    });

    it('should handle null values correctly', () => {
        const input = {
            a: null,
            b: {
                c: null,
                d: 4,
            },
        };
        const expectedOutput = {
            a: null,
            'b.c': null,
            'b.d': 4,
        };
        expect(flattenObject(input)).toEqual(expectedOutput);
    });

    it('should handle arrays as values', () => {
        const input = {
            a: [1, 2, 3],
            b: {
                c: [4, 5],
                d: {
                    e: [6],
                },
            },
        };
        const expectedOutput = {
            a: [1, 2, 3],
            'b.c': [4, 5],
            'b.d.e': [6],
        };
        expect(flattenObject(input)).toEqual(expectedOutput);
    });

    it('should handle complex nested structures', () => {
        const input = {
            a: {
                b: {
                    c: {
                        d: 1,
                        e: {
                            f: 2,
                            g: 3,
                        },
                    },
                },
            },
        };
        const expectedOutput = {
            'a.b.c.d': 1,
            'a.b.c.e.f': 2,
            'a.b.c.e.g': 3,
        };
        expect(flattenObject(input)).toEqual(expectedOutput);
    });
});
