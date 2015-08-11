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

// define model
var Todo = mongoose.model('Todo', {
  text: String
})

//routes - api
// get all todos
app.get('/api/todos', function(req, res) {
  Todo.find(function(err, todos){
    if (err) res.send(err)
    //return all todos in JSON
    res.json(todos)
  })
})
// create todo and send back all todos after creation
app.post('/api/todos', function(req, res) {
  Todo.create({
    text: req.body.text,
    done: false
  }, function(err, todo) {
    if (err) res.send(err)
    // get and return all the todos after creating
    Todo.find(function(err, todos){
      if (err) res.send(err)
      res.json(todos)
    })
  })
})
// delete a todo
app.delete('/api/todos/:todo_id', function(req, res){
  Todo.remove({
    _id: req.params.todo_id
  }, function(err, todo) {
    if (err) return res.send(err)
    // get and return all the todos after deleting
    Todo.find(function(err, todos) {
      if (err) return res.send(err)
      res.json(todo);
    })
  })
})

// application
app.get('*', function(req, res) {
  // load the single view file
  res.sendfile('./public/index.html')
})

// listen
app.listen(8080)
console.log("App listening on port 8080. . .");
