// server.js

// set up ========================
var express = require('express');
var app = express();                               // create our app w/ express
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var fs = require('fs');

// configuration =================
app.use(express.static(__dirname + '/app'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({ 'extended': 'true' }));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

var initialData = JSON.parse(fs.readFileSync('./static/initial.json').toString());
var accountData = JSON.parse(fs.readFileSync('./static/debitAccountList.json').toString());
var mainData = JSON.parse(fs.readFileSync('./static/main1.json').toString());

var cors = require('cors');
app.use(cors());

app.get('/api/getInitialData', function (req, res) {
	console.log(req.body);
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
	res.json(initialData);
});

app.get('/api/getAccountsData', function (req, res) {
	console.log(req.body);
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
	res.json(accountData);
});

app.get('/api/getMainData', function (req, res) {
	console.log(req.body);
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
	res.json(mainData);
});


// listen (start app with node server.js) ======================================
var port = (process.env.PORT || 9090);
app.listen(port, function () {
	console.log('Example app listening on port' + port + '!')
});