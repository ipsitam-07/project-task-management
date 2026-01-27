import attachmentEventEmitter from './attachments.events';
import { runAttachmentWorker } from '../workers/worker.runner';
attachmentEventEmitter.on('ATTACHMENT_UPLOADED', async (attachmentId: string) => {
  runAttachmentWorker(attachmentId);
});
