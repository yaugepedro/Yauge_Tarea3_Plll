const express = require('express');
const router = express.Router();

const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

const {
  validateCreateTask,
  validateUpdateTask,
  validateIdParam,
} = require('../middleware/validateTask');

router.get('/', getAllTasks);
router.get('/:id', validateIdParam, getTaskById);
router.post('/', validateCreateTask, createTask);
router.put('/:id', validateIdParam, validateUpdateTask, updateTask);
router.delete('/:id', validateIdParam, deleteTask);

module.exports = router;