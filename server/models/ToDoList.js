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
});

module.exports = mongoose.model('ToDoList', ToDoListSchema);
