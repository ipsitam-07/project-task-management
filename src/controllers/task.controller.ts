import { Response } from 'express';
import { IAuthRequest } from '../types';
import {
  createTaskService,
  getAllTasksbyProjectService,
  getTaskbyIdService,
  updateStatusbyTaskIdService,
  deleteTaskbyIDService,
} from '../services/task.service';
import { AppError } from '../utils/error';

//POST /projects/:projectId/tasks
export const createTask = async (req: IAuthRequest, res: Response) => {
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

//GET /projects/:projectId/tasks
export const getTasksbyProject = async (req: IAuthRequest, res: Response) => {
  const userId = req.user?.id;
  const projectId = req.params.projectId;

  if (!userId) {
    throw new AppError('Unauthorized', 401);
  }

  if (!projectId || typeof projectId !== 'string') {
    throw new AppError('Invalid project id', 400);
  }

  const tasks = await getAllTasksbyProjectService(projectId, userId);

  if (!tasks) {
    throw new AppError('Project not found', 404);
  }

  res.status(200).json({
    success: true,
    data: tasks,
  });
};

//GET /tasks/:id
export const getTaskById = async (req: IAuthRequest, res: Response) => {
  const userId = req.user?.id;
  const taskId = req.params.id;

  if (!userId) {
    throw new AppError('Unauthorized', 401);
  }

  if (!taskId || typeof taskId !== 'string') {
    throw new AppError('Invalid task id', 400);
  }

  const task = await getTaskbyIdService(taskId, userId);

  if (!task) {
    throw new AppError('Task not found', 404);
  }

  res.status(200).json({
    success: true,
    data: task,
  });
};

//PATCH /tasks/:id/status
export const updateTaskStatus = async (req: IAuthRequest, res: Response) => {
  const userId = req.user?.id;
  const taskId = req.params.id;
  const status = req.body.status;

  if (!userId) {
    throw new AppError('Unauthorized', 401);
  }

  if (!taskId || typeof taskId !== 'string') {
    throw new AppError('Invalid task id', 400);
  }

  if (!status) {
    throw new AppError('Status is required', 400);
  }

  const updatedTask = await updateStatusbyTaskIdService(taskId, userId, status);

  if (!updatedTask) {
    throw new AppError('Task not found', 404);
  }

  res.status(200).json({
    success: true,
    data: updatedTask,
  });
};

//DELETE /tasks/:id

export const deleteTask = async (req: IAuthRequest, res: Response) => {
  const userId = req.user?.id;
  const taskId = req.params.id;

  if (!userId) {
    throw new AppError('Unauthorized', 401);
  }

  if (!taskId || typeof taskId !== 'string') {
    throw new AppError('Invalid task id', 400);
  }

  const deletedTask = await deleteTaskbyIDService(taskId, userId);

  if (!deletedTask) {
    throw new AppError('Task not found', 404);
  }

  res.status(200).json({
    success: true,
    message: 'Task deleted successfully',
  });
};
