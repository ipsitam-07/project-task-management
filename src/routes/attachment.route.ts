import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import { upload } from '../middlewares/attachment.middleware';
import { uploadTaskAttachments, getTaskAttachments } from '../controllers/attachment.controller';

const router = Router();
router.use(authMiddleware);
/**
 * @swagger
 * /tasks/{taskId}/attachments:
 *   post:
 *     summary: Upload attachments to a task
 *     tags: [Attachments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Attachments uploaded
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task Not found
 *       500:
 *         description: Internal server error
 *
 */

router.post('/tasks/:taskId/attachments', upload.array('files'), uploadTaskAttachments);

/**
 * @swagger
 * /tasks/{taskId}/attachments:
 *   get:
 *     summary: Get all attachments for a task
 *     tags: [Attachments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of attachments
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */

//GET /tasks/:taskId/attachments
router.get('/tasks/:taskId/attachments', getTaskAttachments);

export default router;
