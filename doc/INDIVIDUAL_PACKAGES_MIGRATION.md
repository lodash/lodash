# Migrating from Individual Lodash Method Packages

This guide helps you migrate from individual lodash method packages (e.g., `lodash.trim`, `lodash.trimend`) to the main `lodash` package or native JavaScript alternatives.

## Why Migrate?

Some individual lodash method packages contain **unfixed security vulnerabilities**:

| Package | Vulnerability | Status |
|---------|--------------|--------|
| `lodash.trim` | [CVE-2020-28500](https://nvd.nist.gov/vuln/detail/CVE-2020-28500) (ReDoS) | **Unfixed** |
| `lodash.trimend` | [CVE-2020-28500](https://nvd.nist.gov/vuln/detail/CVE-2020-28500) (ReDoS) | **Unfixed** |

The main `lodash` package (v4.17.21+) contains fixes for these vulnerabilities.

## Migration Options

### Option 1: Use the Main Lodash Package (Recommended)

Replace individual package imports with imports from the main `lodash` package:

```javascript
// Before (VULNERABLE)
const trim = require('lodash.trim');
const trimEnd = require('lodash.trimend');

// After (FIXED) - Named import
const { trim, trimEnd } = require('lodash');

// After (FIXED) - Direct method import (tree-shakeable)
const trim = require('lodash/trim');
const trimEnd = require('lodash/trimEnd');
```

For ES modules:

```javascript
// Before (VULNERABLE)
import trim from 'lodash.trim';
import trimEnd from 'lodash.trimend';

// After (FIXED) - Using lodash-es for better tree-shaking
import { trim, trimEnd } from 'lodash-es';

// After (FIXED) - Direct import
import trim from 'lodash-es/trim';
import trimEnd from 'lodash-es/trimEnd';
```

### Option 2: Use Native JavaScript Methods

For simple use cases, native JavaScript methods provide equivalent functionality:

```javascript
// Before (lodash.trim)
const trim = require('lodash.trim');
const result = trim('  hello  ');

// After (native)
const result = '  hello  '.trim();
```

```javascript
// Before (lodash.trimend)
const trimEnd = require('lodash.trimend');
const result = trimEnd('  hello  ');

// After (native)
const result = '  hello  '.trimEnd();
```

**Note:** Lodash's `trim` and `trimEnd` functions support custom character sets:

```javascript
// Lodash - trim specific characters
_.trim('-_-abc-_-', '_-');  // => 'abc'

// Native - only trims whitespace
'-_-abc-_-'.trim();  // => '-_-abc-_-'
```

If you need custom character trimming, use the main `lodash` package.

### Option 3: Bundle Size Optimization

If you're concerned about bundle size (the main reason for using individual packages), consider these alternatives:

1. **lodash-es with tree-shaking**: Modern bundlers (webpack, rollup, vite) can tree-shake `lodash-es`:

   ```javascript
   import { trim } from 'lodash-es';
   // Only the trim function is included in your bundle
   ```

2. **babel-plugin-lodash**: Automatically transforms lodash imports:

   ```javascript
   // This:
   import { trim } from 'lodash';
   
   // Becomes:
   import trim from 'lodash/trim';
   ```

3. **lodash-webpack-plugin**: Further reduces bundle size by removing unused features.

## Updating package.json

Remove individual packages and add the main lodash package:

```bash
# Remove vulnerable packages
npm uninstall lodash.trim lodash.trimend

# Add main lodash package (if not already present)
npm install lodash
```

## Finding Affected Dependencies

Check if your dependencies use vulnerable individual packages:

```bash
npm ls lodash.trim lodash.trimend
```

If dependencies use these packages, consider:
- Opening issues on those projects
- Using npm overrides (npm 8.3+) to force resolution to the main package

## Additional Resources

- [Lodash Documentation](https://lodash.com/docs)
- [lodash-es on npm](https://www.npmjs.com/package/lodash-es)
- [babel-plugin-lodash](https://www.npmjs.com/package/babel-plugin-lodash)
- [CVE-2020-28500 Details](https://nvd.nist.gov/vuln/detail/CVE-2020-28500)
- [GHSA-29mw-wpgm-hmr9](https://github.com/advisories/GHSA-29mw-wpgm-hmr9)
