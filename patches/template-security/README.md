# Template Security Patch

This patch addresses security vulnerabilities in the lodash template function by implementing additional safeguards and sanitization measures.

## Changes

1. Added code sanitization to prevent access to dangerous globals
2. Implemented secure execution context using isolated scopes
3. Enhanced error handling for both compilation and execution phases
4. Improved XSS prevention with better HTML escaping
5. Added TypeScript support

## Migration Guide

### Before

```javascript
const compiled = _.template('hello <%= user %>');
const result = compiled({ user: data });
```

### After

```javascript
const compiled = _.template('hello <%= user %>', {
  sandbox: {} // Optional sandbox for allowed globals
});
const result = compiled({ user: data });
```

## Security Improvements

- Removes access to potentially dangerous globals like `process`, `require`, etc.
- Creates isolated execution context
- Prevents prototype pollution
- Improves HTML escaping for XSS prevention
- Adds controlled sandbox environment

## Breaking Changes

None. This patch maintains backward compatibility while adding security improvements.
