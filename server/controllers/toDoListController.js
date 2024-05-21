const { StatusCodes } = require('http-status-codes');
const ToDoList = require('../models/ToDoList');
const { BadRequestError, NotFoundError } = require('../errors/customErrors');
const User = require('../models/User');

const getAllTasks = async (req, res) => {
  const tasks = await ToDoList.find({}).populate('user');
  return res.status(StatusCodes.OK).json({ tasks });
};
const getAllUsers = async (req, res) => {
  const users = await User.find({});
  return res.status(StatusCodes.OK).json({ users });
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

  if (completed !== undefined) {
    task.completed = completed;
  }
  task.name = name;
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

const assignUser = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  const task = await ToDoList.findById(id);
  if (!task) throw new NotFoundError('Task not found');

  const user = await User.findById(userId);
  if (!user) throw new NotFoundError('User Id is not valid');

  task.user = user._id;
  await task.save();
  return res.status(StatusCodes.OK).json({ msg: 'User assigned successfully' });
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  assignUser,
  getAllUsers,
};
