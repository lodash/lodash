import assert from 'node:assert';
import upperCase from '../src/upperCase';

describe('upperCase', () => {
    it('should uppercase as space-separated words', () => {
        assert.strictEqual(upperCase('--foo-bar--'), 'FOO BAR');
        assert.strictEqual(upperCase('fooBar'), 'FOO BAR');
        assert.strictEqual(upperCase('__foo_bar__'), 'FOO BAR');
    });
});
