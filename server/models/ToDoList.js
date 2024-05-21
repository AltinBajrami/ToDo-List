const mongoose = require('mongoose');

const ToDoListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please provide name'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: false,
  },
});

module.exports = mongoose.model('ToDoList', ToDoListSchema);
