// set up
var express = require('express')
var app = express()
var mongoose = require('mongoose')
var morgan = require('morgan')
var bodyParser = require('body-parser')
var methodOverride = require('method-override')

// config
mongoose.connect('mongodb://localhost/CheckList')
// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'))
// log every request to the console
app.use(morgan('dev'))
// parse application
app.use(bodyParser.urlencoded({'extended':'true'}))
app.use(bodyParser.json())
app.use(bodyParser.json({type: 'application/vnd.api+json'}))
app.use(methodOverride())

// listen
app.listen(8080)
console.log("App listening on port 8080. . .");
