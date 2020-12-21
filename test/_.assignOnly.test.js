import assert from 'assert';
import newJoin from '../_.assignOnly.js';

describe('_.assignOnly', () => {
    function Foo() {
        this.a = 1;
        this.b = 1
     }
      
     function Bar() {
       this.a = 2;
       this.b = 2;
       this.c = 2;
     }
  it('', () => {
    assert.strictEqual(_.assignOnly(Foo, Bar, [a]),{ 'a': 2, 'b': 1 } );
  });
});