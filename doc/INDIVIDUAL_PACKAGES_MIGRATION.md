# Migrating from Individual Lodash Method Packages

This guide helps you migrate from individual lodash method packages to the main `lodash` package or native JavaScript alternatives.

## Why Migrate?

**9 individual lodash method packages contain unfixed security vulnerabilities** affecting approximately **4.8 million weekly downloads combined**. The main `lodash` package (v4.17.21+) contains fixes for all these vulnerabilities.

## Affected Packages

### ReDoS Vulnerability (CVE-2020-28500)

| Package | Last Version | Weekly Downloads | Main Package Fix |
|---------|-------------|------------------|------------------|
| `lodash.trim` | 4.5.1 | ~60K | v4.17.21 |
| `lodash.trimend` | 4.5.1 | ~50K | v4.17.21 |

**Impact:** CPU exhaustion via crafted input with excessive whitespace patterns.

### Command Injection (CVE-2021-23337) - CVSS 7.2 HIGH

| Package | Last Version | Weekly Downloads | Main Package Fix |
|---------|-------------|------------------|------------------|
| `lodash.template` | 4.5.0 | ~2.4M | v4.17.21 |

**Impact:** Arbitrary code execution when untrusted input is passed to template options.

### Prototype Pollution (CVE-2020-8203) - CVSS 7.4 HIGH

| Package | Last Version | Weekly Downloads | Main Package Fix |
|---------|-------------|------------------|------------------|
| `lodash.set` | 4.3.2 | ~1.2M | v4.17.19 |
| `lodash.setwith` | 4.3.2 | ~11K | v4.17.19 |
| `lodash.update` | 4.10.2 | ~2K | v4.17.19 |
| `lodash.updatewith` | 4.10.2 | ~20 | v4.17.19 |
| `lodash.pick` | 4.4.0 | ~1.1M | v4.17.19 |

**Impact:** Attackers can modify Object prototype, affecting all objects in the application.

## Migration Options

### Option 1: Use the Main Lodash Package (Recommended)

Replace individual package imports with imports from the main `lodash` package:

```javascript
// Before (VULNERABLE)
const trim = require('lodash.trim');
const template = require('lodash.template');
const set = require('lodash.set');

// After (FIXED) - Named import
const { trim, template, set } = require('lodash');

// After (FIXED) - Direct method import (tree-shakeable)
const trim = require('lodash/trim');
const template = require('lodash/template');
const set = require('lodash/set');
```

For ES modules:

```javascript
// Before (VULNERABLE)
import trim from 'lodash.trim';
import template from 'lodash.template';
import set from 'lodash.set';

// After (FIXED) - Using lodash-es for better tree-shaking
import { trim, template, set } from 'lodash-es';

// After (FIXED) - Direct import
import trim from 'lodash-es/trim';
import template from 'lodash-es/template';
import set from 'lodash-es/set';
```

### Option 2: Use Native JavaScript Methods

For some methods, native JavaScript provides equivalent functionality:

#### String Methods (trim, trimEnd)

```javascript
// Before (lodash.trim) - VULNERABLE
const trim = require('lodash.trim');
const result = trim('  hello  ');

// After (native) - SAFE
const result = '  hello  '.trim();
const resultEnd = '  hello  '.trimEnd();
```

**Note:** Lodash's `trim` supports custom character sets. If you need this, use the main package:

```javascript
// Lodash - trim specific characters
_.trim('-_-abc-_-', '_-');  // => 'abc'
```

#### Object Methods (set, pick)

```javascript
// Before (lodash.set) - VULNERABLE
const set = require('lodash.set');
set(object, 'a.b.c', value);

// After (native) - For simple cases
object.a = { b: { c: value } };

// Or use main lodash for complex paths
const { set } = require('lodash');
set(object, 'a.b.c', value);
```

```javascript
// Before (lodash.pick) - VULNERABLE
const pick = require('lodash.pick');
const result = pick(object, ['a', 'b']);

// After (native) - Using destructuring
const { a, b } = object;
const result = { a, b };

// Or use main lodash
const { pick } = require('lodash');
const result = pick(object, ['a', 'b']);
```

### Option 3: Bundle Size Optimization

If you're concerned about bundle size (the main reason for using individual packages), consider these alternatives:

1. **lodash-es with tree-shaking**: Modern bundlers can tree-shake `lodash-es`:

   ```javascript
   import { trim, set, template } from 'lodash-es';
   // Only the used functions are included in your bundle
   ```

2. **babel-plugin-lodash**: Automatically transforms lodash imports:

   ```javascript
   // This:
   import { trim } from 'lodash';
   
   // Becomes:
   import trim from 'lodash/trim';
   ```

3. **lodash-webpack-plugin**: Further reduces bundle size by removing unused features.

## Quick Migration Commands

Remove all vulnerable packages and add the main lodash package:

```bash
# Remove all vulnerable individual packages
npm uninstall lodash.trim lodash.trimend lodash.template \
  lodash.set lodash.setwith lodash.update lodash.updatewith lodash.pick

# Add main lodash package (if not already present)
npm install lodash@^4.17.21
```

## Finding Affected Dependencies

Check if your project or dependencies use vulnerable individual packages:

```bash
# Check for all affected packages
npm ls lodash.trim lodash.trimend lodash.template \
  lodash.set lodash.setwith lodash.update lodash.updatewith lodash.pick
```

If dependencies use these packages, consider:
- Opening issues on those projects requesting migration
- Using npm overrides (npm 8.3+) with the [lodash-modularized](https://github.com/xsfj/lodash-modularized) community project:

```json
{
  "overrides": {
    "lodash.set": "npm:@lodash-modularized/set@^1.0.0",
    "lodash.template": "npm:@lodash-modularized/template@^1.0.0",
    "lodash.trim": "npm:@lodash-modularized/trim@^1.0.0"
  }
}
```

**Note:** The `@lodash-modularized` packages re-export from the main `lodash` package, preserving the same API while applying security fixes. See the [full overrides list](https://github.com/xsfj/lodash-modularized#usage) for all packages.

## Security References

### CVE-2020-28500 (ReDoS)
- [NVD Entry](https://nvd.nist.gov/vuln/detail/CVE-2020-28500)
- [GitHub Advisory GHSA-29mw-wpgm-hmr9](https://github.com/advisories/GHSA-29mw-wpgm-hmr9)
- Fixed in main lodash v4.17.21

### CVE-2021-23337 (Command Injection)
- [NVD Entry](https://nvd.nist.gov/vuln/detail/CVE-2021-23337)
- [GitHub Advisory GHSA-35jh-r3h4-6jhm](https://github.com/advisories/GHSA-35jh-r3h4-6jhm)
- Fixed in main lodash v4.17.21
- CVSS 3.1: 7.2 (HIGH)

### CVE-2020-8203 (Prototype Pollution)
- [NVD Entry](https://nvd.nist.gov/vuln/detail/CVE-2020-8203)
- [GitHub Advisory GHSA-p6mc-m468-83gw](https://github.com/advisories/GHSA-p6mc-m468-83gw)
- [HackerOne Report](https://hackerone.com/reports/712065)
- Fixed in main lodash v4.17.19
- CVSS 3.1: 7.4 (HIGH)

## Additional Resources

- [Lodash Documentation](https://lodash.com/docs)
- [lodash-es on npm](https://www.npmjs.com/package/lodash-es)
- [babel-plugin-lodash](https://www.npmjs.com/package/babel-plugin-lodash)
- [lodash-webpack-plugin](https://www.npmjs.com/package/lodash-webpack-plugin)
- [Issue #6106 - Discussion on individual packages](https://github.com/lodash/lodash/issues/6106)
