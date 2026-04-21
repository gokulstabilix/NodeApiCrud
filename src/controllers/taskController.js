const Task = require('../models/Task');

// @desc    Create a new task
// @route   POST /api/tasks
exports.createTask = async (req, res) => {
  try {
    // 1. Take data from the request body (sent by the user)
    // 2. Use our Mongoose Model to save it to MongoDB
    const newTask = await Task.create(req.body);

    // 3. Send back the newly created task as JSON
    res.status(201).json({
      status: 'success',
      data: newTask
    });
  } catch (error) {
    // If something goes wrong (e.g., missing title), catch the error
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};