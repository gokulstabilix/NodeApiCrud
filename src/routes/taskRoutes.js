const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// This maps to POST http://localhost:3000/api/tasks/
router.post('/', taskController.createTask);

module.exports = router;