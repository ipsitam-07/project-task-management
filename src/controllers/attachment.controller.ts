import { AppError } from '../utils/error';
import { AuthRequest } from '../types';
import { Response } from 'express';
import { Task } from '../models/task.model';
import { uploadTaskAttachmentsService } from '../services/attachment.service';

export const uploadTaskAttachments = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  const taskId = req.params.taskId;

  if (!userId) {
    throw new AppError('Unauthorized', 401);
  }

  if (!taskId || typeof taskId !== 'string') {
    throw new AppError('Invalid task id', 400);
  }

  const files = req.files as Express.Multer.File[];
  if (!files || files.length === 0) {
    throw new AppError('No files uploaded', 400);
  }

  const task = await Task.findById(taskId);

  if (!task) throw new AppError('Task not found', 404);
  const attachments = await uploadTaskAttachmentsService(taskId, userId, files);

  res.status(201).json({
    success: true,
    data: attachments,
  });
};
