# Contributing to lodash

If you’d like to contribute a feature or bug fix, you can [fork](https://help.github.com/articles/fork-a-repo/) lodash, commit your changes, & [send a pull request](https://help.github.com/articles/using-pull-requests/).
Please make sure to [search the issue tracker](https://github.com/lodash/lodash/issues) first; your issue may have already been discussed or fixed in `master`.

## Tests

Include updated unit tests in the `test` directory as part of your pull request.
Don’t worry about regenerating the documentation, lodash.js, or lodash.min.js.

You can run the tests from the command line via `node test/test`, or open `test/index.html` in a web browser.
The `test/run-test.sh` script attempts to run the tests in [Rhino](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/Rhino), [RingoJS](http://ringojs.org/), [PhantomJS](http://phantomjs.org/), & [Node](http://nodejs.org/), before running them in your default browser.
The [Backbone](http://backbonejs.org/) & [Underscore](http://underscorejs.org/) test suites are included as well.

## Contributor License Agreement

lodash is a member of the [Dojo Foundation](http://dojofoundation.org/).
As such, we request that all contributors sign the Dojo Foundation [contributor license agreement](http://dojofoundation.org/about/claForm).

For more information about CLAs, please check out Alex Russell’s excellent post, [“Why Do I Need to Sign This?”](http://infrequently.org/2008/06/why-do-i-need-to-sign-this/).

## Coding Guidelines

In addition to the following guidelines, please follow the conventions already established in the code.

- **Spacing**:<br>
  Use two spaces for indentation. No tabs.

- **Naming**:<br>
  Keep variable & method names concise & descriptive.<br>
  Variable names `index`, `collection`, & `callback` are preferable to `i`, `arr`, & `fn`.

- **Quotes**:<br>
  Single-quoted strings are preferred to double-quoted strings; however, please use a double-quoted string if the value contains a single-quote character to avoid unnecessary escaping.

- **Comments**:<br>
  Please use single-line comments to annotate significant additions, & [JSDoc-style](http://www.2ality.com/2011/08/jsdoc-intro.html) comments for new methods.
