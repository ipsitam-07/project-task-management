import { Worker } from 'worker_threads';
import path from 'path';

export const runAttachmentWorker = (attachmentId: string) => {
  const worker = new Worker(path.resolve(__dirname, '../workers/attachment.worker.js'));

  worker.postMessage(attachmentId);

  worker.on('message', () => {
    worker.terminate();
  });

  worker.on('error', (err) => {
    console.error('Worker failed:', err);
  });
};
