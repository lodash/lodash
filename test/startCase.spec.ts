import assert from 'node:assert';
import startCase from '../src/startCase';

describe('startCase', () => {
    it('should uppercase only the first character of each word', () => {
        assert.strictEqual(startCase('--foo-bar--'), 'Foo Bar');
        assert.strictEqual(startCase('fooBar'), 'Foo Bar');
        assert.strictEqual(startCase('__FOO_BAR__'), 'FOO BAR');
    });
});
