const { StatusCodes } = require('http-status-codes');
const ToDoList = require('../models/ToDoList');
const { BadRequestError, NotFoundError } = require('../errors/customErrors');

const getAllTasks = async (req, res) => {
  const tasks = await ToDoList.find();
  return res.status(StatusCodes.OK).json({ tasks });
};

const createTask = async (req, res) => {
  const { name, completed } = req.body;
  if (!name) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: 'Please provide name' });
  }
  const task = await ToDoList.create({ name, completed });

  return res.status(StatusCodes.OK).json({ task });
};

const updateTask = async (req, res) => {
  const { name, completed } = req.body;
  const { id } = req.params;
  if (!name) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: 'Please provide name' });
  }
  const task = await ToDoList.findById(id);
  if (!task) throw new NotFoundError('Task not found');

  task.name = name;
  task.completed = completed;
  await task.save();
  return res.status(StatusCodes.OK).json({ task });
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  const task = await ToDoList.findById(id);
  if (!task) throw new NotFoundError('Task not found');
  await task.deleteOne();
  return res.status(StatusCodes.OK).json({ msg: 'task deleted' });
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};
