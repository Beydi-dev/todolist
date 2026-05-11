const express = require("express")
const router = express.Router()
const db = require('../database');
const todoController = require('../controllers/todo.controller');

// Créer un todo
router.post('/', todoController.addTodo);

// tous les todos
router.get('/', todoController.getAllTodos);
// un todo
router.get('/search', todoController.getTodo);
// modifier un todo
router.patch('/:id', todoController.editTodo);
// supprimer un todo
router.delete('/:id', todoController.deleteTodo);


module.exports = router;