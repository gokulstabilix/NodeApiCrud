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

// @desc    Get all tasks
// @route   GET /api/tasks
exports.getTasks = async (req, res) => {
  try {
    // .find() is a Mongoose method that gets everything in the collection
    const tasks = await Task.find();

    res.status(200).json({
      status: 'success',
      results: tasks.length,
      data: tasks
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: error.message
    });
  }
};

// @desc    Get a single task by ID
// @route   GET /api/tasks/:id
exports.getTaskById = async (req, res) => {
  try {
    // req.params.id captures the ID from the URL
    const task = await Task.findById(req.params.id);

    // If no task is found, return 404
    if (!task) {
      return res.status(404).json({ status: 'fail', message: 'Task not found' });
    }

    res.status(200).json({
      status: 'success',
      data: task
    });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: 'Invalid ID format' });
  }
};

// @desc    Update a task
// @route   PATCH /api/tasks/:id
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the modified document rather than the original
      runValidators: true // Ensure the update follows our Schema rules
    });

    if (!task) {
      return res.status(404).json({ status: 'fail', message: 'No task found with that ID' });
    }

    res.status(200).json({
      status: 'success',
      data: task
    });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ status: 'fail', message: 'No task found with that ID' });
    }

    // 204 means "Success, but there is no content to send back"
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};