;(function() {
  'use strict';

  var ecstatic = require('ecstatic'),
      http = require('http'),
      path = require('path'),
      request = require('request'),
      SauceTunnel = require('sauce-tunnel'),
      url = require('url');

  var attempts = -1,
      prevLine = '';

  var port = 8081,
      username = process.env.SAUCE_USERNAME,
      accessKey = process.env.SAUCE_ACCESS_KEY,
      tunnelId = 'lodash_' + process.env.TRAVIS_JOB_NUMBER;

  if (isFinite(process.env.TRAVIS_PULL_REQUEST)) {
    console.error('Testing skipped for pull requests');
    process.exit(0);
  }

  var runnerPathname = (function() {
    var args = process.argv;
    return args.length > 2
      ? '/' + args[args.length - 1].replace(/^\W+/, '')
      : '/test/index.html';
  }());

  var runnerQuery = url.parse(runnerPathname, true).query,
      isBackbone = /\bbackbone\b/i.test(runnerPathname),
      isMobile = /\bmobile\b/i.test(runnerQuery.build),
      isModern = /\bmodern\b/i.test(runnerQuery.build);

  var platforms = [
    ['Windows 7', 'chrome', ''],
    ['Windows 7', 'firefox', '25'],
    ['Windows 7', 'firefox', '20'],
    ['Windows 7', 'firefox', '10'],
    ['Windows 7', 'firefox', '6'],
    ['Windows 7', 'firefox', '4'],
    ['Windows 7', 'firefox', '3'],
    ['WIN8.1', 'internet explorer', '11'],
    ['Windows 7', 'internet explorer', '10'],
    ['Windows 7', 'internet explorer', '9'],
    ['Windows 7', 'internet explorer', '8'],
    ['Windows XP', 'internet explorer', '7'],
    ['Windows XP', 'internet explorer', '6'],
    ['OS X 10.8', 'safari', '6'],
    ['Windows 7', 'safari', '5']
  ];

  // platforms to test IE compat mode
  if (runnerQuery.compat) {
    platforms = [
      ['WIN8.1', 'internet explorer', '11'],
      ['Windows 7', 'internet explorer', '10'],
      ['Windows 7', 'internet explorer', '9'],
      ['Windows 7', 'internet explorer', '8']
    ];
  }
  // platforms for Backbone tests
  if (isBackbone) {
    platforms = platforms.filter(function(platform) {
      var browser = platform[1],
          version = +platform[2];

      return browser != 'firefox' || version >= 4;
    });
  }
  // platforms for mobile and modern builds
  if (isMobile || isModern) {
    platforms = platforms.filter(function(platform) {
      var browser = platform[1],
          version = +platform[2];

      switch (browser) {
        case 'firefox': return version >= 10;
        case 'internet explorer': return version >= 9;
        case 'safari': return version >= (isMobile ? 5 : 6);
      }
      return true;
    });
  }

  // create a web server for the local dir
  var mount = ecstatic({
    'root': process.cwd(),
    'cache': false
  });

  http.createServer(function(req, res) {
    var compat = url.parse(req.url, true).query.compat;
    if (compat) {
      // see http://msdn.microsoft.com/en-us/library/ff955275(v=vs.85).aspx
      res.setHeader('X-UA-Compatible', 'IE=' + compat);
    }
    mount(req, res);
  }).listen(port);

  // set up Sauce Connect so we can use this server from Sauce Labs
  var tunnelTimeout = 10000,
      tunnel = new SauceTunnel(username, accessKey, tunnelId, true, tunnelTimeout);

  console.log('Opening Sauce Connect tunnel...');

  tunnel.start(function(success) {
    if (success) {
      console.log('Sauce Connect tunnel opened');
      runTests();
    } else {
      console.error('Failed to open Sauce Connect tunnel');
      process.exit(2);
    }
  });

  /*--------------------------------------------------------------------------*/

  function logInline(text) {
    var blankLine = repeat(' ', prevLine.length);
    if (text.length > 40) {
      text = text.slice(0, 37) + '...';
    }
    prevLine = text;
    process.stdout.write(text + blankLine.slice(text.length) + '\r');
  }

  function repeat(text, times) {
    return Array(times + 1).join(text);
  }

  /*--------------------------------------------------------------------------*/

  function runTests() {
    var testDefinition = {
      'framework': 'qunit',
      'platforms': platforms,
      'tunnel': 'tunnel-identifier:' + tunnelId,
      'url': 'http://localhost:' + port + runnerPathname
    };

    console.log('Starting saucelabs tests: ' + JSON.stringify(testDefinition));

    request.post('https://saucelabs.com/rest/v1/' + username + '/js-tests', {
      'auth': { 'user': username, 'pass': accessKey },
      'json': testDefinition
    }, function(error, response, body) {
      if (response.statusCode == 200) {
        waitForTestCompletion(body);
      } else {
        console.error('Failed to submit test to Sauce Labs; status ' + response.statusCode + ', body:\n' + JSON.stringify(body));
        process.exit(3);
      }
    });
  }

  function waitForTestCompletion(testIdentifier) {
    request.post('https://saucelabs.com/rest/v1/' + username + '/js-tests/status', {
      'auth': { 'user': username, 'pass': accessKey },
      'json': testIdentifier
    }, function(error, response, body) {
        if (response.statusCode == 200) {
          if (body.completed) {
            logInline('');
            handleTestResults(body['js tests']);
          }
          else {
            logInline('Please wait' + repeat('.', (++attempts % 3) + 1));
            setTimeout(function() {
              waitForTestCompletion(testIdentifier);
            }, 5000);
          }
        } else {
          logInline('');
          console.error('Failed to check test status on Sauce Labs; status ' + response.statusCode + ', body:\n' + JSON.stringify(body));
          process.exit(4);
        }
    });
  }

  function handleTestResults(results) {
    var failingTests = results.filter(function(test) {
      var result = test.result;
      return !result || result.failed || /\berror\b/i.test(result.message);
    });

    var failingPlatforms = failingTests.map(function(test) {
      return test.platform;
    });

    if (!failingTests.length) {
      console.log('Tests passed');
    }
    else {
      console.error('Tests failed on platforms: ' + JSON.stringify(failingPlatforms));

      failingTests.forEach(function(test) {
        var details =  'See ' + test.url + ' for details.',
            platform = JSON.stringify(test.platform),
            result = test.result;

        if (result && result.failed) {
          console.error(result.failed + ' failures on ' + platform + '. ' + details);
        } else {
          console.error('Testing on ' + platform + ' failed; no results available. ' + details);
        }
      });
    }

    console.log('Shutting down Sauce Connect tunnel...');

    tunnel.stop(function() {
      process.exit(failingTests.length ? 1 : 0);
    });
  }
}());
