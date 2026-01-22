import { Router } from 'express';
import { createProject } from '../controllers/project.controller';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.post('/', createProject);

export default router;
