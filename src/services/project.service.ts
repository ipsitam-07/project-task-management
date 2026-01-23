import { Project } from '../models/project.model';

//Create project
export const createProjectService = async (name: string, description: string, ownerId: string) => {
  if (!name) {
    throw new Error('Project Name is required!');
  }

  const project = await Project.create({
    name,
    description,
    owner: ownerId,
  });

  return project;
};

//Get all projects
export const getProjectsService = async (userId: string) => {
  const projects = await Project.find({ owner: userId });
  return projects;
};

//Get projects by Id
export const getProjectsbyIDService = async (projectId: string, userID: string) => {
  const project = await Project.findById({
    _id: projectId,
    owner: userID,
  });

  return project;
};
