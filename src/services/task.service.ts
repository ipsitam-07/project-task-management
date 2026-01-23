import { Task } from '../models/task.model';
import { Project } from '../models/project.model';
import { TASK_STATUS_FLOW } from '../utils/task-status';
import { AppError } from '../utils/error';
import type { TaskStatus } from '../types/tasks';

//Create task under a project of a logged in user
export const createTaskService = async (
  projectID: string,
  userID: string,
  data: {
    title: string;
    description?: string;
  },
) => {
  const project = await Project.findOne({
    _id: projectID,
    owner: userID,
  });

  if (!project) {
    return null;
  }

  const task = await Task.create({
    title: data.title,
    description: data.description || '',
    project: projectID,
  });

  return task;
};

//Get all tasks of the project of a logged in user
export const getAllTasksbyProjectService = async (projectId: string, userId: string) => {
  const project = await Project.findOne({
    _id: projectId,
    owner: userId,
  });

  if (!project) {
    return null;
  }

  const tasks = await Task.find({
    project: projectId,
  });

  return tasks;
};

//get tasks by an id
export const getTaskbyIdService = async (taskId: string, userId: string) => {
  const task = await Task.findById(taskId);
  if (!task) {
    return null;
  }

  const project = await Project.findOne({
    _id: task.project,
    owner: userId,
  });

  if (!project) {
    return null;
  }

  return task;
};

//Update task status by taskId
export const updateStatusbyTaskIdService = async (
  taskId: string,
  userId: string,
  updatedStatus: TaskStatus,
) => {
  const task = await Task.findById(taskId);

  if (!task) return null;

  const project = await Project.findOne({ _id: task.project, owner: userId });

  if (!project) return null;

  const currentStatus = task.status as TaskStatus;
  const updateStatusFlow = TASK_STATUS_FLOW[currentStatus];

  if (!currentStatus) {
    throw new AppError('Invalid current task status', 400);
  }
  if (!updateStatusFlow.includes(updatedStatus)) {
    throw new AppError('Inavlid status transistion', 400);
  }

  task.status = updatedStatus;
  await task.save();

  return task;
};

//Delete a task
export const deleteTaskbyIDService = async (taskId: string, userId: string) => {
  const task = await Task.findById(taskId);
  if (!task) return null;
  const project = await Project.findOne({
    _id: task.project,
    owner: userId,
  });

  if (!project) return null;
  await Task.findByIdAndDelete(taskId);
  return true;
};
