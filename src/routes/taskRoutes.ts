import express from 'express';
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/taskController';
import { authenticate } from '../middlewares/authMIddleware';


const router = express.Router();

router.post('/', authenticate, createTask);
router.get('/:workflowId', authenticate, getTasks);
router.put('/:taskId', authenticate, updateTask);
router.delete('/:taskId', authenticate, deleteTask);

export default router;
