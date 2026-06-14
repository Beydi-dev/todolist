const express = require("express")
const router = express.Router()
const db = require('../database');
const todoController = require('../controllers/todo.controller');
const verifyToken = require('../middlewares/auth.middleware');

// Créer un todo
router.post('/', verifyToken, todoController.addTodo);

// tous les todos
router.get('/', verifyToken, todoController.getAllTodos);
// un todo
router.get('/todo', verifyToken, todoController.getTodo);
// modifier un todo
router.patch('/:id', verifyToken, todoController.editTodo);
// supprimer un todo
router.delete('/:id', verifyToken, todoController.deleteTodo);


module.exports = router;