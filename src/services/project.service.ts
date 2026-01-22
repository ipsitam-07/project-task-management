import { Project } from '../models/project.model';

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

export const getProjectsService = async (userId: string) => {
  const projects = await Project.find({ owner: userId });
  return projects;
};
