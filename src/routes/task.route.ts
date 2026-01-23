import { Router } from 'express';
import { createTask } from '../controllers/task.controller';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

//Auth middleware for protected route
router.use(authMiddleware);

/**
 * @swagger
 * /projects/{projectId}/tasks:
 *   post:
 *     summary: Create a task under a project
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Task created successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad input
 *       404:
 *         description: Project not found
 *       500:
 *         description: Failed to create task
 */

//POST /projects/:projectId/tasks
router.post('/projects/:projectId/tasks', createTask);

export default router;
