// set up
var express = require('express')
var app = express()
var mongoose = require('mongoose')
var morgan = require('morgan')  // log requests to the console (express4)
var bodyParser = require('body-parser') // pull information from HTML POST (express4)
var methodOverride = require('method-override') // simulate DELETE and PUT (express4)
var db = require('./config/db')
var port = process.env.PORT || 8080;
// config
// connect to mongodb
mongoose.connect(db.url)
// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'))
// log every request to the console
app.use(morgan('dev'))
// parse application
app.use(bodyParser.urlencoded({'extended':'true'}))
app.use(bodyParser.json())
app.use(bodyParser.json({type: 'application/vnd.api+json'}))
app.use(methodOverride())

// routes
require('./app/routes.js')(app);

// listen
app.listen(port)
console.log("App listening on port " + port + ". . .");
