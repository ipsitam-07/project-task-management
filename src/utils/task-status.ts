import { TaskStatus } from '../types/tasks';

export const TASK_STATUS_FLOW: Record<TaskStatus, TaskStatus[]> = {
  OPEN: ['IN_PROGRESS'],
  IN_PROGRESS: ['DONE'],
  DONE: [],
};
