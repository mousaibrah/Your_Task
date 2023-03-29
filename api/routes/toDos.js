const express = require('express');
const todoRouter = express.Router()
const {getToDos,createTodo,deleteTodo,toggleComplete,} = require('../controllers/toDos')

todoRouter.get('/',getToDos)
todoRouter.post('/new',createTodo)
todoRouter.delete('/delete/:id',deleteTodo)
todoRouter.put('/complete/:id',toggleComplete)


module.exports = todoRouter