import { Response } from 'express';
import {
  createProjectService,
  getProjectsService,
  getProjectsbyIDService,
  updateProjectsbyIdService,
  deleteProjectsByidService,
} from '../services/project.service';
import { AuthRequest } from '../types';
import { AppError } from '../utils/error';

//POST
export const createProject = async (req: AuthRequest, res: Response) => {
  const { name, description } = req.body;

  const userId = req.user?.id;

  //no user validation
  if (!userId) {
    throw new AppError('Unauthorized', 404);
  }

  // Validate fields
  if (!name || typeof name !== 'string') {
    throw new AppError('Project name is require', 400);
  }

  const project = await createProjectService(name, description, userId);

  return res.status(201).json({
    success: true,
    message: 'Project created successfully',
    data: project,
  });
};

//GET
export const getProjects = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;

  //no user validation
  if (!userId) {
    throw new AppError('Unauthorized', 401);
  }

  const projects = await getProjectsService(userId);

  return res.status(200).json({
    success: true,
    data: projects,
  });
};

//GET Projects by ID
export const getProjectbyID = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  const projectId = req.params.id;

  if (!userId) {
    throw new AppError('Unauthorized', 401);
  }

  if (!projectId || typeof projectId !== 'string') {
    throw new AppError('Invalid project Id', 400);
  }

  const project = await getProjectsbyIDService(projectId, userId);

  if (!project) {
    throw new AppError('Project Not found', 404);
  }

  return res.status(200).json({
    success: true,
    data: project,
  });
};

//UPDATE Projects by ID
export const updateProjectbyID = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  const projectID = req.params.id;
  const { name, description } = req.body;

  if (!userId) {
    throw new AppError('Unauthorized', 401);
  }

  if (!projectID || typeof projectID !== 'string') {
    throw new AppError('Invalid project ID', 400);
  }

  const updatedProject = await updateProjectsbyIdService(projectID, userId, {
    name,
    description,
  });

  if (!updatedProject) {
    throw new AppError('Project not found', 404);
  }

  return res.status(200).json({
    success: true,
    message: 'Project updated successfully',
    data: updatedProject,
  });
};

//DELETE Project by ID
export const deleteProjectbyID = async (req: AuthRequest, res: Response) => {
  const userID = req.user?.id;
  const projectID = req.params.id;

  if (!userID) {
    throw new AppError('Unauthorized', 401);
  }

  if (!projectID || typeof projectID !== 'string') {
    throw new AppError('Invalid project id', 400);
  }

  const deletedProject = await deleteProjectsByidService(projectID, userID);

  if (!deletedProject) {
    throw new AppError('Project not found', 404);
  }

  return res.status(200).json({
    success: true,
    message: 'Project has been deleted successfully!',
  });
};
