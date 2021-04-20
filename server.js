const express = require('express')
const app = express()
const port = process.env.PORT || 8080
let todos = {}
let todosNum = 0
const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.get('/', function (request, response) {
  response.json({
    welcome: 'welcome to my API!'
  })
})

app.get('/todos', function (request, response) {
  response.json(todos)
})

app.get('/todos/:id', function (request, response) {
  response.json(todos[request.params.id])
})

app.post('/todos', function (request, response) {
  todos[todosNum] = {
    text: request.body.text.trim(),
    completed: request.body.completed.trim()
  }
  response.redirect('/todos/' + toString(todosNum))
  todosNum = todosNum + 1
})

app.delete('/todos/:id', function (request, response) {
  if (todosNum > 1) {
    delete todos[request.params.id]
    todosNum = todosNum - 1
  } else {
    todos = {}
    todosNum = 0
  }
  response.redirect('/todos')
})

app.put('/todos/:id', function (request, response) {
  const todo = todos[request.params.id]
  if (request.body.text !== undefined) {
    todo.text = request.body.text.trim()
  }
  if (request.body.completed !== undefined) {
    todo.completed = request.body.completed.trim()
  }
  response.redirect('/todos/' + request.params.id)
})

app.use(function (request, response, next) {
  response.status(404).json({
    message: request.url + ' not found'
  })
})

app.get('/todos/:id', function (request, response) {
  if (!todos[request.params.id]) {
    response.status(404).json({
      message: 'sorry, no such ToDo: ' + request.params.id
    })
    return
  }
  console.log(todos[request.params.id])
  response.json(todos[request.params.id])
})

app.listen(port)
