import { AppError } from '../utils/error';
import { Task } from '../models/task.model';
import { Project } from '../models/project.model';
import { Attachment } from '../models/attachment.model';

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
