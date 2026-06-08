const express = require("express")
const router = express.Router()
const db = require('../database');
const todoController = require('../controllers/todo.controller');
const authController = require('../controllers/auth.controller');

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;