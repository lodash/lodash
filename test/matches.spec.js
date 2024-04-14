import lodashStable from 'lodash';
import matches from '../src/matches';

describe('matches', () => {
    it('should not change behavior if `source` is modified', () => {
        const sources = [{ a: { b: 2, c: 3 } }, { a: 1, b: 2 }, { a: 1 }];

        lodashStable.each(sources, (source, index) => {
            const object = lodashStable.cloneDeep(source);
            const par = matches(source);

            expect(par(object)).toBe(true);

            if (index) {
                source.a = 2;
                source.b = 1;
                source.c = 3;
            } else {
                source.a.b = 1;
                source.a.c = 2;
                source.a.d = 3;
            }
            expect(par(object)).toBe(true);
            expect(par(source)).toBe(false);
        });
    });
});
