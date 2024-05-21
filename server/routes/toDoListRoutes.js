const express = require('express');
const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  assignUser,
} = require('../controllers/toDoListController');
const { authorizePermissions } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(getAllTasks).post(createTask);
router
  .route('/assign-user/:id')
  .patch(authorizePermissions('admin'), assignUser);
router.route('/:id').patch(updateTask).delete(deleteTask);

module.exports = router;
