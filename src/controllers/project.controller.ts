import { Response } from 'express';
import { createProjectService } from '../services/project.service';
import { AuthRequest } from '../types';

//POST
export const createProject = async (req: AuthRequest, res: Response) => {
  try {
    const { name, description } = req.body;

    const userId = req.user?.id;

    //no user validation
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    const project = await createProjectService(name, description, userId);

    return res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
