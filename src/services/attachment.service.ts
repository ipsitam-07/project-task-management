import { AppError } from '../utils/error';
import { Task } from '../models/task.model';
import { Project } from '../models/project.model';
import { Attachment } from '../models/attachment.model';
import fs from 'fs';

export const uploadTaskAttachmentsService = async (
  taskId: string,
  userId: string,
  files: Express.Multer.File[],
) => {
  if (!taskId) {
    return null;
  }

  const task = await Task.findOne({ _id: taskId });
  if (!task) {
    throw new AppError('Task not found', 404);
  }

  const project = await Project.findOne({
    _id: task.project,
    owner: userId,
  });

  if (!project) return null;

  const attachments = [];

  for (const file of files) {
    const attachment = await Attachment.create({
      task: taskId,
      filename: file.filename,
      originalName: file.originalname,
      mimeType: file.mimetype,
      fileSize: file.size,
      path: file.path,
      status: 'UPLOADED',
    });

    attachments.push(attachment);
  }

  return attachments;
};

//Get list of task attachments
export const getAttachmentService = async (userId: string, taskId: string) => {
  if (!taskId) {
    throw new AppError('Invalid task id', 400);
  }

  const task = await Task.findById(taskId);
  if (!task) {
    throw new AppError('Task not found', 404);
  }
  const project = await Project.findOne({
    _id: task.project,
    owner: userId,
  });

  if (!project) {
    return null;
  }

  const attachments = await Attachment.find({
    task: taskId,
  });

  return attachments;
};

//Download attachment
export const downloadAttachmentService = async (userId: string, attachmentId: string) => {
  if (!attachmentId || typeof attachmentId !== 'string') {
    throw new AppError('Invalid attachment id', 400);
  }

  const attachment = await Attachment.findById(attachmentId);

  if (!attachment) {
    throw new AppError('Attachment not found', 404);
  }

  const task = await Task.findById(attachment.task);
  if (!task) return null;

  const project = await Project.findOne({
    _id: task.project,
    owner: userId,
  });

  if (!project) {
    throw new AppError('Forbidden', 403);
  }

  if (!fs.existsSync(attachment.path)) {
    throw new AppError('File not found on disk', 404);
  }

  return attachment;
};
