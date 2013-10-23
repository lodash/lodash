var port = 8081;

// Create a web server for the local dir
var connect = require('connect');
var server = connect.createServer(
    connect.static(__dirname)
).listen(port);

// Tell saucelabs to run some tests
var username = process.env['SAUCE_USERNAME'];
var accessKey = process.env['SAUCE_ACCESS_KEY'];

var request = require('request');

request.post(
    'https://saucelabs.com/rest/v1/' + username + '/js-tests',
    {
        auth: { user: username, pass: accessKey },
        json: {
            platforms: [[ "Windows 7", "chrome", "27" ]],
            url: "http://localhost:" + port + "/test/index.html",
            framework: "qunit"
        }
    },
    function (error, response, body) {
        console.log(response.statusCode);
        console.log(body);
    }
);