import express from 'express';
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
  updateTaskStatus
} from '../controllers/taskController.js';
import { protect } from '../middleware/authMiddleware.js';
import validateRequest from '../middleware/validateRequest.js';
import {
  createTaskSchema,
  getTasksSchema,
  taskIdSchema,
  updateStatusSchema,
  updateTaskSchema
} from '../validators/taskValidators.js';

const router = express.Router();

router.use(protect);

router.route('/').get(validateRequest(getTasksSchema), getTasks).post(validateRequest(createTaskSchema), createTask);
router
  .route('/:id')
  .put(validateRequest(updateTaskSchema), updateTask)
  .delete(validateRequest(taskIdSchema), deleteTask);
router.patch('/:id/status', validateRequest(updateStatusSchema), updateTaskStatus);

export default router;
