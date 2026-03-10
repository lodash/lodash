# Build & Test Quick Reference

## Prerequisites
- Node.js ≥ 4 (modern LTS recommended)
- npm

## Install dependencies
```bash
npm install
```

## Build
```bash
npm run build          # builds main + FP dist
npm run build:main     # main dist only
npm run build:fp       # FP dist only
```

## Test
```bash
npm test               # runs main + FP test suites
npm run test:main      # node test/test.js
npm run test:fp        # node test/test-fp.js
```

## Lint / Style
```bash
npm run style          # JSCS across all source
```

## Docs
```bash
npm run doc            # generate GitHub-flavoured docs
npm run doc:fp         # FP docs
```

## Playwright (browser tests)
```bash
npx playwright test    # uses playwright.config.js
```
