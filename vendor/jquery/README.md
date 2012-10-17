[jQuery](http://jquery.com/) - New Wave JavaScript
==================================================

Contribution Guides
--------------------------------------

In the spirit of open source software development, jQuery always encourages community code contribution. To help you get started and before you jump into writing code, be sure to read these important contribution guidelines thoroughly:

1. [Getting Involved](http://docs.jquery.com/Getting_Involved)
2. [Core Style Guide](http://docs.jquery.com/JQuery_Core_Style_Guidelines)
3. [Tips For Bug Patching](http://docs.jquery.com/Tips_for_jQuery_Bug_Patching)


What you need to build your own jQuery
--------------------------------------

In order to build jQuery, you need to have GNU make 3.8 or later, Node.js/npm latest, and git 1.7 or later.
(Earlier versions might work OK, but are not tested.)

Windows users have two options:

1. Install [msysgit](https://code.google.com/p/msysgit/) (Full installer for official Git),
   [GNU make for Windows](http://gnuwin32.sourceforge.net/packages/make.htm), and a
   [binary version of Node.js](http://node-js.prcn.co.cc/). Make sure all three packages are installed to the same
   location (by default, this is C:\Program Files\Git).
2. Install [Cygwin](http://cygwin.com/) (make sure you install the git, make, and which packages), then either follow
   the [Node.js build instructions](https://github.com/ry/node/wiki/Building-node.js-on-Cygwin-%28Windows%29) or install
   the [binary version of Node.js](http://node-js.prcn.co.cc/).

Mac OS users should install Xcode (comes on your Mac OS install DVD, or downloadable from
[Apple's Xcode site](http://developer.apple.com/technologies/xcode.html)) and
[Homebrew](http://mxcl.github.com/homebrew/). Once Homebrew is installed, run `brew install git` to install git,
and `brew install node` to install Node.js.

Linux/BSD users should use their appropriate package managers to install make, git, and node, or build from source
if you swing that way. Easy-peasy.


How to build your own jQuery
----------------------------

First, clone a copy of the main jQuery git repo by running:

```bash
git clone git://github.com/jquery/jquery.git
```

Enter the directory and install the Node dependencies:

```bash
cd jquery && npm install
```


Make sure you have `grunt` installed by testing:

```bash
grunt -version
```



Then, to get a complete, minified (w/ Uglify.js), linted (w/ JSHint) version of jQuery, type the following:

```bash
grunt
```


The built version of jQuery will be put in the `dist/` subdirectory.


### Modules (new in 1.8)

Starting in jQuery 1.8, special builds can now be created that optionally exclude or include any of the following modules:

- ajax
- css
- dimensions
- effects
- offset


Before creating a custom build for use in production, be sure to check out the latest stable version:

```bash
git pull; git checkout $(git describe --abbrev=0 --tags)
```

Then, make sure all Node dependencies are installed and all Git submodules are checked out:

```bash
npm install && grunt
```

To create a custom build, use the following special `grunt` commands:

Exclude **ajax**:

```bash
grunt custom:-ajax
```

Exclude **css**:

```bash
grunt custom:-css
```

Exclude **deprecated**:

```bash
grunt custom:-deprecated
```

Exclude **dimensions**:

```bash
grunt custom:-dimensions
```

Exclude **effects**:

```bash
grunt custom:-effects
```

Exclude **offset**:

```bash
grunt custom:-offset
```

Exclude **all** optional modules:

```bash
grunt custom:-ajax,-css,-deprecated,-dimensions,-effects,-offset
```


Note: dependencies will be handled internally, by the build process.


Running the Unit Tests
--------------------------------------


Start grunt to auto-build jQuery as you work:

```bash
cd jquery && grunt watch
```


Run the unit tests with a local server that supports PHP. No database is required. Pre-configured php local servers are available for Windows and Mac. Here are some options:

- Windows: [WAMP download](http://www.wampserver.com/en/)
- Mac: [MAMP download](http://www.mamp.info/en/index.html)
- Linux: [Setting up LAMP](https://www.linux.com/learn/tutorials/288158-easy-lamp-server-installation)
- [Mongoose (most platforms)](http://code.google.com/p/mongoose/)




Building to a different directory
---------------------------------

If you want to build jQuery to a directory that is different from the default location:

```bash
grunt && grunt dist:/path/to/special/location/
```
With this example, the output files would be:

```bash
/path/to/special/location/jquery.js
/path/to/special/location/jquery.min.js
```

If you want to add a permanent copy destination, create a file in `dist/` called ".destination.json". Inside the file, paste and customize the following:

```json

{
  "/Absolute/path/to/other/destination": true
}
```


Additionally, both methods can be combined.



Updating Submodules
-------------------

Update the submodules to what is probably the latest upstream code.

```bash
grunt update_submodules
```

Note: This task will also be run any time the default `grunt` command is used.



Git for dummies
---------------

As the source code is handled by the version control system Git, it's useful to know some features used.

### Submodules ###

The repository uses submodules, which normally are handled directly by the Makefile, but sometimes you want to
be able to work with them manually.

Following are the steps to manually get the submodules:

```bash
git clone https://github.com/jquery/jquery.git
cd jquery
git submodule init
git submodule update
```

Or:

```bash
git clone https://github.com/jquery/jquery.git
cd jquery
git submodule update --init
```

Or:

```bash
git clone --recursive https://github.com/jquery/jquery.git
cd jquery
```

If you want to work inside a submodule, it is possible, but first you need to checkout a branch:

```bash
cd src/sizzle
git checkout master
```

After you've committed your changes to the submodule, you'll update the jquery project to point to the new commit,
but remember to push the submodule changes before pushing the new jquery commit:

```bash
cd src/sizzle
git push origin master
cd ..
git add src/sizzle
git commit
```


### cleaning ###

If you want to purge your working directory back to the status of upstream, following commands can be used (remember everything you've worked on is gone after these):

```bash
git reset --hard upstream/master
git clean -fdx
```

### rebasing ###

For feature/topic branches, you should always used the `--rebase` flag to `git pull`, or if you are usually handling many temporary "to be in a github pull request" branches, run following to automate this:

```bash
git config branch.autosetuprebase local
```
(see `man git-config` for more information)

### handling merge conflicts ###

If you're getting merge conflicts when merging, instead of editing the conflicted files manually, you can use the feature
`git mergetool`. Even though the default tool `xxdiff` looks awful/old, it's rather useful.

Following are some commands that can be used there:

* `Ctrl + Alt + M` - automerge as much as possible
* `b` - jump to next merge conflict
* `s` - change the order of the conflicted lines
* `u` - undo an merge
* `left mouse button` - mark a block to be the winner
* `middle mouse button` - mark a line to be the winner
* `Ctrl + S` - save
* `Ctrl + Q` - quit

[QUnit](http://docs.jquery.com/QUnit) Reference
-----------------

### Test methods ###

```js
expect( numAssertions );
stop();
start();
```


note: QUnit's eventual addition of an argument to stop/start is ignored in this test suite so that start and stop can be passed as callbacks without worrying about their parameters

### Test assertions ###


```js
ok( value, [message] );
equal( actual, expected, [message] );
notEqual( actual, expected, [message] );
deepEqual( actual, expected, [message] );
notDeepEqual( actual, expected, [message] );
strictEqual( actual, expected, [message] );
notStrictEqual( actual, expected, [message] );
raises( block, [expected], [message] );
```


Test Suite Convenience Methods Reference (See [test/data/testinit.js](https://github.com/jquery/jquery/blob/master/test/data/testinit.js))
------------------------------

### Returns an array of elements with the given IDs ###

```js
q( ... );
```

Example:

```js
q("main", "foo", "bar");

=> [ div#main, span#foo, input#bar ]
```

### Asserts that a selection matches the given IDs ###

```js
t( testName, selector, [ "array", "of", "ids" ] );
```

Example:

```js
t("Check for something", "//[a]", ["foo", "baar"]);
```



### Fires a native DOM event without going through jQuery ###

```js
fireNative( node, eventType )
```

Example:

```js
fireNative( jQuery("#elem")[0], "click" );
```

### Add random number to url to stop caching ###

```js
url( "some/url.php" );
```

Example:

```js
url("data/test.html");

=> "data/test.html?10538358428943"


url("data/test.php?foo=bar");

=> "data/test.php?foo=bar&10538358345554"
```


### Load tests in an iframe ###

Loads a given page constructing a url with fileName: `"./data/" + fileName + ".html"`
and fires the given callback on jQuery ready (using the jQuery loading from that page)
and passes the iFrame's jQuery to the callback.

```js
testIframe( fileName, testName, callback );
```

Callback arguments:

```js
callback( jQueryFromIFrame, iFrameWindow, iFrameDocument );
```

### Load tests in an iframe (window.iframeCallback) ###

Loads a given page constructing a url with fileName: `"./data/" + fileName + ".html"`
The given callback is fired when window.iframeCallback is called by the page
The arguments passed to the callback are the same as the
arguments passed to window.iframeCallback, whatever that may be

```js
testIframeWithCallback( testName, fileName, callback );
```

Questions?
----------

If you have any questions, please feel free to ask on the
[Developing jQuery Core forum](http://forum.jquery.com/developing-jquery-core) or in #jquery on irc.freenode.net.
