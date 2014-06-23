# Contributing to Lo-Dash

If you’d like to contribute a feature or bug fix, you can [fork](https://help.github.com/articles/fork-a-repo) Lo-Dash, commit your changes, and [send a pull request](https://help.github.com/articles/using-pull-requests).
Please make sure to [search the issue tracker](https://github.com/lodash/lodash/issues) first; your issue may have already been discussed or fixed in `master`.

## Tests

Include updated unit tests in the `test` directory as part of your pull request.
Don’t worry about regenerating the documentation or distribution files.

You can run the tests from the command line via `node test/test`, or open `test/index.html` in a web browser.
The `test/run-test.sh` script attempts to run the tests in [Rhino](https://developer.mozilla.org/en-US/docs/Rhino), [RingoJS](http://ringojs.org/), [PhantomJS](http://phantomjs.org/), and [Node](http://nodejs.org/), before running them in your default browser.
The [Backbone](http://backbonejs.org/) and [Underscore](http://http://underscorejs.org/) test suites are included as well.

## Contributor License Agreement

Lo-Dash is a member of the [Dojo Foundation](http://dojofoundation.org/).
As such, we request that all contributors sign the Dojo Foundation [contributor license agreement](http://dojofoundation.org/about/claForm).

For more information about CLAs, please check out Alex Russell’s excellent post, [“Why Do I Need to Sign This?”](http://infrequently.org/2008/06/why-do-i-need-to-sign-this/).

## Coding Guidelines

In addition to the following guidelines, please follow the conventions already established in the code.

- **Spacing**:<br>
  Use two spaces for indentation. No tabs.

- **Naming**:<br>
  Keep variable and method names concise and descriptive.<br>
  Variable names `index`, `collection`, and `callback` are preferable to `i`, `arr`, and `fn`.

- **Quotes**:<br>
  Single-quoted strings are preferred to double-quoted strings; however, please use a double-quoted string if the value contains a single-quote character to avoid unnecessary escaping.

- **Comments**:<br>
  Please use single-line comments to annotate significant additions, and [JSDoc-style](http://www.2ality.com/2011/08/jsdoc-intro.html) comments for new methods.
