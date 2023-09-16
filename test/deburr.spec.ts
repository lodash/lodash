import assert from 'node:assert';
import lodashStable from 'lodash';
import { burredLetters, deburredLetters, comboMarks } from './utils';
import deburr from '../src/deburr';

describe('deburr', () => {
    it('should convert Latin Unicode letters to basic Latin', () => {
        const actual = lodashStable.map(burredLetters, deburr);
        assert.deepStrictEqual(actual, deburredLetters);
    });

    it('should not deburr Latin mathematical operators', () => {
        const operators = ['\xd7', '\xf7'],
            actual = lodashStable.map(operators, deburr);

        assert.deepStrictEqual(actual, operators);
    });

    it('should deburr combining diacritical marks', () => {
        const expected = lodashStable.map(comboMarks, lodashStable.constant('ei'));

        const actual = lodashStable.map(comboMarks, (chr) => deburr(`e${chr}i`));

        assert.deepStrictEqual(actual, expected);
    });
});
