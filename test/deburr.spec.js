import lodashStable from 'lodash';
import { burredLetters, deburredLetters, comboMarks } from './utils';
import deburr from '../src/deburr';

describe('deburr', () => {
    it('should convert Latin Unicode letters to basic Latin', () => {
        const actual = lodashStable.map(burredLetters, deburr);
        expect(actual).toEqual(deburredLetters);
    });

    it('should not deburr Latin mathematical operators', () => {
        const operators = ['\xd7', '\xf7'];
        const actual = lodashStable.map(operators, deburr);

        expect(actual).toEqual(operators);
    });

    it('should deburr combining diacritical marks', () => {
        const expected = lodashStable.map(comboMarks, lodashStable.constant('ei'));

        const actual = lodashStable.map(comboMarks, (chr) => deburr(`e${chr}i`));

        expect(actual).toEqual(expected);
    });
});
