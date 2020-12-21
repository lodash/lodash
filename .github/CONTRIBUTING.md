# :construction: Notice :construction:

Pardon the mess. The `master` branch is in flux while we work on Lodash v5. This
means things like npm scripts, which we encourage using for contributions, may
not be working. Thank you for your patience.

# Contributing to Lodash

Contributions are always welcome. Before contributing please read the
[code of conduct](https://code-of-conduct.openjsf.org) &
[search the issue tracker](https://github.com/lodash/lodash/issues); your issue
may have already been discussed or fixed in `master`. To contribute,
[fork](https://help.github.com/articles/fork-a-repo/) Lodash, commit your changes,
& [send a pull request](https://help.github.com/articles/using-pull-requests/).

## Feature Requests

Feature requests should be submitted in the
[issue tracker](https://github.com/lodash/lodash/issues), with a description of
the expected behavior & use case, where they’ll remain closed until sufficient interest,
[e.g. :+1: reactions](https://help.github.com/articles/about-discussions-in-issues-and-pull-requests/),
has been [shown by the community](https://github.com/lodash/lodash/issues?q=label%3A%22votes+needed%22+sort%3Areactions-%2B1-desc).
Before submitting a request, please search for similar ones in the
[closed issues](https://github.com/lodash/lodash/issues?q=is%3Aissue+is%3Aclosed+label%3Aenhancement).

## Pull Requests

For additions or bug fixes, please modify the relevant files. Include
updated unit tests in the `test` directory as part of your pull request.
Unit test files should be named `[filename].test.js`.

Before running the unit tests you’ll need to install, `npm i`,
[development dependencies](https://docs.npmjs.com/files/package.json#devdependencies).
Run unit tests from the command-line via `npm test`.

## Contributor License Agreement

Lodash is a member of the [JS Foundation](https://openjsf.org/).
As such, we request that all contributors sign the JS Foundation
[contributor license agreement (CLA)](https://cla.js.foundation/lodash/lodash).

For more information about CLAs, please check out Alex Russell’s excellent post,
[“Why Do I Need to Sign This?”](https://infrequently.org/2008/06/why-do-i-need-to-sign-this/).

## Coding Guidelines

In addition to the following guidelines, please follow the conventions already
established in the code.

- **Spacing**:<br>
  Use two spaces for indentation. No tabs.

- **Naming**:<br>
  Keep variable & method names concise & descriptive.<br>
  Variable names `index`, `array`, & `iteratee` are preferable to
  `i`, `arr`, & `fn`.

- **Quotes**:<br>
  Single-quoted strings are preferred to double-quoted strings; however,
  please use a double-quoted string if the value contains a single-quote
  character to avoid unnecessary escaping.

- **Comments**:<br>
  Please use single-line comments to annotate significant additions, &
  [JSDoc-style](http://www.2ality.com/2011/08/jsdoc-intro.html) comments for
  functions.

Guidelines are enforced using [ESLint](https://www.npmjs.com/package/eslint):
```bash
$ npm run style
```
