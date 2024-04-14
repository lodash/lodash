import lodashStable from 'lodash';
import { _, stubFalse, stubTrue, empties } from './utils';
import conformsTo from '../src/conformsTo';

describe('conforms methods', () => {
    lodashStable.each(['conforms', 'conformsTo'], (methodName) => {
        const isConforms = methodName === 'conforms';

        function conforms(source) {
            return isConforms
                ? _.conforms(source)
                : function (object) {
                      return conformsTo(object, source);
                  };
        }

        it(`\`_.${methodName}\` should check if \`object\` conforms to \`source\``, () => {
            const objects = [
                { a: 1, b: 8 },
                { a: 2, b: 4 },
                { a: 3, b: 16 },
            ];

            let par = conforms({
                b: function (value) {
                    return value > 4;
                },
            });

            let actual = lodashStable.filter(objects, par);
            expect(actual).toEqual([objects[0], objects[2]]);

            par = conforms({
                b: function (value) {
                    return value > 8;
                },
                a: function (value) {
                    return value > 1;
                },
            });

            actual = lodashStable.filter(objects, par);
            expect(actual).toEqual([objects[2]]);
        });

        it(`\`_.${methodName}\` should not match by inherited \`source\` properties`, () => {
            function Foo() {
                this.a = function (value) {
                    return value > 1;
                };
            }
            Foo.prototype.b = function (value) {
                return value > 8;
            };

            const objects = [
                { a: 1, b: 8 },
                { a: 2, b: 4 },
                { a: 3, b: 16 },
            ];

            const par = conforms(new Foo());
            const actual = lodashStable.filter(objects, par);

            expect(actual).toEqual([objects[1], objects[2]]);
        });

        it(`\`_.${methodName}\` should not invoke \`source\` predicates for missing \`object\` properties`, () => {
            let count = 0;

            const par = conforms({
                a: function () {
                    count++;
                    return true;
                },
            });

            expect(par({})).toBe(false);
            expect(count).toBe(0);
        });

        it(`\`_.${methodName}\` should work with a function for \`object\``, () => {
            function Foo() {}
            Foo.a = 1;

            function Bar() {}
            Bar.a = 2;

            const par = conforms({
                a: function (value) {
                    return value > 1;
                },
            });

            expect(par(Foo)).toBe(false);
            expect(par(Bar)).toBe(true);
        });

        it(`\`_.${methodName}\` should work with a function for \`source\``, () => {
            function Foo() {}
            Foo.a = function (value) {
                return value > 1;
            };

            const objects = [{ a: 1 }, { a: 2 }];
            const actual = lodashStable.filter(objects, conforms(Foo));

            expect(actual).toEqual([objects[1]]);
        });

        it(`\`_.${methodName}\` should work with a non-plain \`object\``, () => {
            function Foo() {
                this.a = 1;
            }
            Foo.prototype.b = 2;

            const par = conforms({
                b: function (value) {
                    return value > 1;
                },
            });

            expect(par(new Foo())).toBe(true);
        });

        it(`\`_.${methodName}\` should return \`false\` when \`object\` is nullish`, () => {
            const values = [, null, undefined];
            const expected = lodashStable.map(values, stubFalse);

            const par = conforms({
                a: function (value) {
                    return value > 1;
                },
            });

            const actual = lodashStable.map(values, (value, index) => {
                try {
                    return index ? par(value) : par();
                } catch (e) {}
            });

            expect(actual).toEqual(expected);
        });

        it(`\`_.${methodName}\` should return \`true\` when comparing an empty \`source\` to a nullish \`object\``, () => {
            const values = [, null, undefined];
            const expected = lodashStable.map(values, stubTrue);
            const par = conforms({});

            const actual = lodashStable.map(values, (value, index) => {
                try {
                    return index ? par(value) : par();
                } catch (e) {}
            });

            expect(actual).toEqual(expected);
        });

        it(`\`_.${methodName}\` should return \`true\` when comparing an empty \`source\``, () => {
            const object = { a: 1 };
            const expected = lodashStable.map(empties, stubTrue);

            const actual = lodashStable.map(empties, (value) => {
                const par = conforms(value);
                return par(object);
            });

            expect(actual).toEqual(expected);
        });
    });
});
