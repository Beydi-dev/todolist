const express = require("express")
const router = express.Router()
const db = require('../database');
const todoController = require('../controllers/todo.controller');

// Creer un todo
router.post('/', todoController.todo);


module.exports = router;