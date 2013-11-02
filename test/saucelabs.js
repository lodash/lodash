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
      tunnelId = 'lodash' + process.env.TRAVIS_JOB_NUMBER.replace(/\./g, '');

  var runnerPathname = (function() {
    var args = process.argv;
    return args.length > 2
      ? '/' + args[args.length - 1].replace(/^\W+/, '')
      : '/test/index.html';
  }());

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

  if (url.parse(runnerPathname, true).query.compat) {
    platforms = [
      ['WIN8.1', 'internet explorer', '11'],
      ['Windows 7', 'internet explorer', '10'],
      ['Windows 7', 'internet explorer', '9'],
      ['Windows 7', 'internet explorer', '8']
    ];
  }

  // create a web server for the local dir
  var mount = ecstatic({
    root: path.resolve(__dirname, '..'),
    cache: false
  });

  http.createServer(function(req, res) {
    var parsedUrl = url.parse(req.url, true);
    var compat = parsedUrl.query.compat;
    if (compat) {
      // see http://msdn.microsoft.com/en-us/library/ff955275(v=vs.85).aspx
      res.setHeader('X-UA-Compatible', 'IE=' + compat);
    }
    mount(req, res);
  }).listen(port);

  // set up sauce connect so we can use this server from saucelabs
  var tunnelTimeout = 10000,
      tunnel = new SauceTunnel(username, accessKey, tunnelId, true, tunnelTimeout);

  console.log('Opening sauce connect tunnel...');

  tunnel.start(function(success) {
    if (success) {
      console.log('Sauce connect tunnel opened');
      runTests();
    } else {
      // fail without an exit code for pull requests
      console.error('Failed to open sauce connect tunnel');
      process.exit(0);
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

    console.log('Shutting down sauce connect tunnel...');

    tunnel.stop(function() {
      process.exit(failingTests.length ? 1 : 0);
    });
  }
}());
