import { Task } from '../models/task.model';
import { Project } from '../models/project.model';
import { AuthRequest } from '../types';

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
  const task = await Task.findById({
    taskId,
  });
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
