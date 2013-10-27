var connect = require('connect');
var SauceTunnel = require('sauce-tunnel');
var request = require('request');

var port = 8081;
var username = process.env['SAUCE_USERNAME'];
var accessKey = process.env['SAUCE_ACCESS_KEY'];
var platforms = [
    ["Windows 7", "chrome", ""],
    ["Windows 7", "firefox", "24"],
    ["Windows 7", "internet explorer", "9"]
];

// Create a web server for the local dir
var server = connect.createServer(
    connect.static(__dirname)
).listen(port);

// Set up sauce connect so we can use this server from saucelabs
var tunnelTimeout = 10000;
var tunnel = new SauceTunnel(username, accessKey, null, true, tunnelTimeout);
console.log("Opening sauce connect tunnel...");
tunnel.start(function (success) {
    if (success) {
        console.log("Sauce connect tunnel opened");
        runTests();
    } else {
        console.error("Failed to open sauce connect tunnel")
        process.exit(2);
    }
});

function runTests() {
    var testDefinition = {
        platforms: platforms,
        url: "http://localhost:" + port + "/test/index.html",
        framework: "qunit"
    };

    console.log("Starting saucelabs tests: " + JSON.stringify(testDefinition));

    request.post(
        'https://saucelabs.com/rest/v1/' + username + '/js-tests',
        {
            auth: { user: username, pass: accessKey },
            json: testDefinition
        },
        function (error, response, body) {
            if (response.statusCode == 200) {
                var testIdentifier = body;
                waitForTestCompletion(testIdentifier);
            } else {
                console.error("Failed to submit test to SauceLabs, status " + response.statusCode + ", body:\n" + JSON.stringify(body));
                process.exit(3);
            }
        }
    );
}

function waitForTestCompletion(testIdentifier) {
    request.post(
        'https://saucelabs.com/rest/v1/' + username + '/js-tests/status',
        {
            auth: { user: username, pass: accessKey },
            json: testIdentifier
        },
        function (error, response, body) {
            if (response.statusCode == 200) {
                console.log(JSON.stringify(body));
                if (body["completed"] == true) {
                    handleTestResults(body["js tests"]);
                } else {
                    waitForTestCompletion(testIdentifier);
                }
            } else {
                console.error("Failed to check test status on SauceLabs, status " + response.statusCode + ", body:\n" + JSON.stringify(body));
                process.exit(4);
            }
        }
    );
}

function handleTestResults(results) {
    var allTestsSuccessful = results.reduce(function (passedSoFar, result) {
        return passedSoFar && !!result['passed']
    }, true);

    console.log(allTestsSuccessful ? "Test passed" : "Test failed");
    process.exit(allTestsSuccessful ? 0 : 1);
}