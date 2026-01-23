import { Response } from 'express';
import {
  createProjectService,
  getProjectsService,
  getProjectsbyIDService,
  updateProjectsbyIdService,
} from '../services/project.service';
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

//GET
export const getProjects = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    //no user validation
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    const projects = await getProjectsService(userId);

    return res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch projects',
    });
  }
};

//GET Projects by ID
export const getProjectbyID = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const projectId = req.params.id;

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

    const project = await getProjectsbyIDService(projectId, userId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch project',
    });
  }
};

//UPDATE Projects by ID
export const updateProjectbyID = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const projectID = req.params.id;
    const { name, description } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    if (!projectID || typeof projectID !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Invalid project id',
      });
    }

    const updatedProject = await updateProjectsbyIdService(projectID, userId, {
      name,
      description,
    });

    if (!updatedProject) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: updatedProject,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update project',
    });
  }
};
