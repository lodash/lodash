var connect = require('connect'),
    path = require('path'),
    request = require('request'),
    SauceTunnel = require('sauce-tunnel');

var port = 8081,
    username = process.env.SAUCE_USERNAME,
    accessKey = process.env.SAUCE_ACCESS_KEY;

var platforms = [
  ['Windows 7', 'chrome', ''],
  ['Windows 7', 'firefox', '24'],
  ['Windows 7', 'firefox', '20'],
  ['Windows 7', 'firefox', '10'],
  ['Windows 7', 'firefox', '6'],
  ['Windows 7', 'firefox', '4'],
  ['Windows 7', 'firefox', '3'],
  ['Windows 7', 'internet explorer', '10'],
  ['Windows 7', 'internet explorer', '9'],
  ['Windows 7', 'internet explorer', '8'],
  ['Windows XP', 'internet explorer', '7'],
  ['Windows XP', 'internet explorer', '6'],
  ['Windows XP', 'opera', '12'],
  ['Windows XP', 'opera', '11'],
  ['OS X 10.8', 'safari', '6'],
  ['Windows 7', 'safari', '5']
];

// create a web server for the local dir
var server = connect.createServer(
  connect.static(path.resolve(__dirname, '..'))
).listen(port);

// set up sauce connect so we can use this server from saucelabs
var tunnelTimeout = 10000,
    tunnel = new SauceTunnel(username, accessKey, null, true, tunnelTimeout);

console.log('Opening sauce connect tunnel...');

tunnel.start(function(success) {
  if (success) {
    console.log('Sauce connect tunnel opened');
    runTests();
  } else {
    console.error('Failed to open sauce connect tunnel')
    process.exit(2);
  }
});

function runTests() {
  var testDefinition = {
    'framework': 'qunit',
    'platforms': platforms,
    'url': 'http://localhost:' + port + '/test/index.html'
  };

  console.log('Starting saucelabs tests: ' + JSON.stringify(testDefinition));

  request.post('https://saucelabs.com/rest/v1/' + username + '/js-tests', {
    'auth': { 'user': username, 'pass': accessKey },
    'json': testDefinition
  }, function(error, response, body) {
    if (response.statusCode == 200) {
      var testIdentifier = body;
      waitForTestCompletion(testIdentifier);
    } else {
      console.error('Failed to submit test to SauceLabs, status ' + response.statusCode + ', body:\n' + JSON.stringify(body));
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
          handleTestResults(body['js tests']);
        } else {
          waitForTestCompletion(testIdentifier);
        }
      } else {
        console.error('Failed to check test status on SauceLabs, status ' + response.statusCode + ', body:\n' + JSON.stringify(body));
        process.exit(4);
      }
  });
}

function handleTestResults(results) {
  var allTestsSuccessful = results.reduce(function(passedSoFar, test) {
    return passedSoFar && test.result.failed === 0;
  }, true);

  if (allTestsSuccessful) {
    console.log('Tests passed');
  }
  else {
    var failingTests = results.filter(function(test) {
      return test.result.failed !== 0;
    });

    var failingPlatforms = failingTests.map(function(test) {
      return test.platform;
    });

    console.error('Tests failed on platforms: ' + JSON.stringify(failingPlatforms));

    failingTests.forEach(function(test) {
      var platform = JSON.stringify(test.platform);

      if (test.result.failed) {
        console.error(test.result.failed + ' failures on ' + platform + '. See ' + test.url + ' for details.');
      } else {
        console.error('Testing on ' + platform + ' failed; no results available. See ' + test.url + ' for details.');
      }
    });
  }

  console.log('Shutting down sauce connect tunnel...');

  tunnel.stop(function() {
    process.exit(allTestsSuccessful ? 0 : 1);
  })
}
