import { Response } from 'express';
import { AuthRequest } from '../types';
import { createTaskService } from '../services/task.service';

//POST /projects/:projectId/tasks
export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const projectId = req.params.projectId;
    const { title, description } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    if (!projectId || typeof projectId !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Invalid project id',
      });
    }

    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Task title is required',
      });
    }

    const task = await createTaskService(projectId, userId, { title, description });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Task created successfully!',
      data: task,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create task',
    });
  }
};
