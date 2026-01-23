import { Router } from 'express';
import { createTask, getTasksbyProject } from '../controllers/task.controller';
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
 *         description: Internal server error
 */

//POST /projects/:projectId/tasks
router.post('/projects/:projectId/tasks', createTask);

/**
 * @swagger
 * /projects/{projectId}/tasks:
 *   get:
 *     summary: Get all tasks for a project
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *     responses:
 *       200:
 *         description: List of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   status:
 *                     type: string
 *                     enum: [OPEN, IN_PROGRESS, DONE]
 *                   project:
 *                     type: string
 *       400:
 *         description: Invalid project id
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Project not found
 */

//GET /projects/:projectId/tasks
router.get('/projects/:projectId/tasks', getTasksbyProject);

export default router;
