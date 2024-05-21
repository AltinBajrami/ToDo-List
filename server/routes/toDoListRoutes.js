const express = require('express');
const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  assignUser,
  getAllUsers,
  removeUser,
} = require('../controllers/toDoListController');
const { authorizePermissions } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(getAllTasks).post(createTask);
router.get('/users', authorizePermissions('admin'), getAllUsers);
router
  .route('/assign-user/:id')
  .patch(authorizePermissions('admin'), assignUser);
router.get('/remove-user/:id', authorizePermissions('admin'), removeUser);
router.route('/:id').patch(updateTask).delete(deleteTask);

module.exports = router;
