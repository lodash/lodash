const assert = require('assert');
const template = require('./secure-template');

describe('Secure Template', () => {
  it('should handle basic interpolation', () => {
    const compiled = template('hello <%= user %>');
    assert.strictEqual(compiled({ user: 'fred' }), 'hello fred');
  });

  it('should escape HTML by default', () => {
    const compiled = template('<%- value %>');
    const result = compiled({ value: '<script>alert("xss")</script>' });
    assert.strictEqual(result, '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');
  });

  it('should prevent access to dangerous globals', () => {
    const compiled = template('<%= process.env %>');
    assert.throws(() => compiled({}), /process is not defined/);
  });

  it('should allow safe evaluation', () => {
    const compiled = template('<% for (var i = 0; i < 3; i++) { %><%= i %>,<% } %>');
    assert.strictEqual(compiled({}), '0,1,2,');
  });

  it('should support sandbox environment', () => {
    const compiled = template('<%= calculate(value) %>', {
      sandbox: {
        calculate: x => x * 2
      }
    });
    assert.strictEqual(compiled({ value: 5 }), '10');
  });

  it('should prevent prototype pollution', () => {
    const compiled = template('<%= constructor.prototype %>');
    assert.throws(() => compiled({}), /constructor is not defined/);
  });
});
