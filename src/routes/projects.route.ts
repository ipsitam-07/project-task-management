import { Router } from 'express';
import { createProject, getProjects } from '../controllers/project.controller';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.use(authMiddleware);

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Project created successfully
 *       401:
 *         description: Unauthorized
 */

//POST /projects
router.post('/', createProject);

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Get all projects of logged in user
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *       401:
 *         description: Unauthorized
 */


//GET /projects
router.get('/', getProjects);

export default router;
