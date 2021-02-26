import assert from 'assert'
import capitalizeWord from '../capitalizeWord'

describe('capitalizeWord', () => {
  it('at start', () => {
    assert.strictEqual(capitalizeWord('CAP lorem ipsum', 'cap'), 'Cap lorem ipsum');
    assert.strictEqual(capitalizeWord('cap lorem ipsum', 'cap'), 'Cap lorem ipsum');
    assert.strictEqual(capitalizeWord('Cap lorem ipsum', 'cap'), 'Cap lorem ipsum');
    assert.strictEqual(capitalizeWord('cAp lorem ipsum', 'cap'), 'Cap lorem ipsum');
    assert.strictEqual(capitalizeWord('caP lorem ipsum', 'cap'), 'Cap lorem ipsum');
  });
  it('at end', () => {
    assert.strictEqual(capitalizeWord('lorem ipsum cap', 'cap'), 'lorem ipsum Cap');
    assert.strictEqual(capitalizeWord('lorem ipsum Cap', 'cap'), 'lorem ipsum Cap');
    assert.strictEqual(capitalizeWord('lorem ipsum cAp', 'cap'), 'lorem ipsum Cap');
    assert.strictEqual(capitalizeWord('lorem ipsum caP', 'cap'), 'lorem ipsum Cap');
    assert.strictEqual(capitalizeWord('lorem ipsum CAP', 'cap'), 'lorem ipsum Cap');
  });
  describe('next to punc', () => {
    it('comma', () => {
      assert.strictEqual(capitalizeWord('lorem ipsum cap,', 'cap'), 
        'lorem ipsum Cap,'
      );
    });
    it('dot', () => {
      assert.strictEqual(capitalizeWord('lorem ipsum cap.', 'cap'), 
        'lorem ipsum Cap.'
      );
    });
    it('questionMark', () => {
      assert.strictEqual(capitalizeWord('lorem ipsum cap?', 'cap'), 
        'lorem ipsum Cap?'
      );
    });
    it('exclamationMark', () => {
      assert.strictEqual(capitalizeWord('lorem ipsum cap!', 'cap'), 
        'lorem ipsum Cap!'
      );
    });
    it('semicolon', () => {
      assert.strictEqual(capitalizeWord('lorem ipsum cap;', 'cap'), 
        'lorem ipsum Cap;'
      );
    });
    it('colon', () => {
      assert.strictEqual(capitalizeWord('lorem ipsum cap:', 'cap'), 
        'lorem ipsum Cap:'
      );
    });
    it('ellipsis', () => {
      assert.strictEqual(capitalizeWord('lorem ipsum cap...', 'cap'), 
        'lorem ipsum Cap...'
      );
    });
  });
  it('next to newline', () => {
    assert.strictEqual(
      capitalizeWord(
        `lorem ipsum cap
`,
        'cap'
      ),`lorem ipsum Cap
`);
  });
});
