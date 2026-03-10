# System Overview — Lodash v4.17.23

## What is it?
Lodash is a JavaScript utility library providing modular, performant helpers for
arrays, objects, strings, functions, and more. It is exported as a single UMD
module (`lodash.js`, ~17 k LOC) plus an auto-curried **FP build** under `fp/`.

## Repository layout

| Path | Purpose |
|------|---------|
| `lodash.js` | Main library source (UMD bundle) |
| `fp/` | Functional-programming wrappers & mapping |
| `lib/` | Build tooling — dist, docs, modules |
| `test/` | QUnit-based test suite + Playwright runner |
| `perf/` | Benchmark harness |
| `vendor/` | Vendored copies of Backbone, Underscore, etc. |
| `doc/` | Generated API documentation |

## Key characteristics
- **Language:** JavaScript (ES5 compatible, Node ≥ 4)
- **Module format:** UMD (works in browser `<script>`, CommonJS, AMD)
- **Test framework:** QUnit, run via `node test/test.js` and Playwright
- **Build system:** Custom Node scripts in `lib/`
- **No TypeScript, no bundler config** — the repo predates modern tooling
