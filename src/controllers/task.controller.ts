import { Response } from 'express';
import { AuthRequest } from '../types';
import { createTaskService } from '../services/task.service';
import { AppError } from '../utils/error';

//POST /projects/:projectId/tasks
export const createTask = async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id;
    const projectId = req.params.projectId;
    const { title, description } = req.body;

    if (!userId) {
        throw new AppError('Unauthorized', 401);
    }

    if (!projectId || typeof projectId !== 'string') {
        throw new AppError('Inavlid project id', 400);
    }

    if (!title) {
        throw new AppError('Task title is required', 400);
    }

    const task = await createTaskService(projectId, userId, { title, description });

    if (!task) {
        throw new AppError('Project not found', 404);
    }

    return res.status(201).json({
      success: true,
      message: 'Task created successfully!',
      data: task,
    });
};
