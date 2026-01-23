import { Task } from '../models/task.model';
import { Project } from '../models/project.model';

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
