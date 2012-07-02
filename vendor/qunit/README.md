[QUnit](http://docs.jquery.com/QUnit) - A JavaScript Unit Testing framework.
================================

QUnit is a powerful, easy-to-use, JavaScript test suite. It's used by the jQuery
project to test its code and plugins but is capable of testing any generic
JavaScript code (and even capable of testing JavaScript code on the server-side).

QUnit is especially useful for regression testing: Whenever a bug is reported,
write a test that asserts the existence of that particular bug. Then fix it and
commit both. Every time you work on the code again, run the tests. If the bug
comes up again - a regression - you'll spot it immediately and know how to fix
it, because you know what code you just changed.

Having good unit test coverage makes safe refactoring easy and cheap. You can
run the tests after each small refactoring step and always know what change
broke something.

QUnit is similar to other unit testing frameworks like JUnit, but makes use of
the features JavaScript provides and helps with testing code in the browser, e.g.
with its stop/start facilities for testing asynchronous code.

If you are interested in helping developing QUnit, you are in the right place.
For related discussions, visit the
[QUnit and Testing forum](http://forum.jquery.com/qunit-and-testing).

Planning for a qunitjs.com site and other testing tools related work now happens
on the [jQuery Testing Team planning wiki](http://jquerytesting.pbworks.com/w/page/41556026/FrontPage).

Development
-----------

To submit patches, fork the repository, create a branch for the change. Then implement
the change, run `grunt` to lint and test it, then commit, push and create a pull request.

Include some background for the change in the commit message and `Fixes #nnn`, referring
to the issue number you're addressing.

To run `grunt`, you need `node` and `npm`, then `npm install grunt -g`.

Releases
--------

Install git-extras and run `git changelog` to update History.md.
Update qunit/qunit.js|css to the release version, commit and tag, update them
again to the next version, commit and push commits and tags.

Put the 'v' in front of the tag (unlike the 1.1.0 release). Clean up the changelog,
removing merge commits or whitespace cleanups.
