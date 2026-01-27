import { parentPort } from 'worker_threads';
import config from '../config/app.config';
import mongoose from 'mongoose';
import { Attachment } from '../models/attachment.model';
import fs from 'fs';
import crypto from 'crypto';
import 'ts-node';
import { AttachmentEvent } from '../models/attachment-event.model';
mongoose.connect(config.mongoURI);

parentPort?.on('message', async (attachmentId: string) => {
  try {
    const attachment = await Attachment.findById(attachmentId);

    if (!attachment) return null;

    if (!fs.existsSync(attachment.path)) return;

    if (attachment.fileSize > 5 * 1024 * 1024) return;
    const buffer = fs.readFileSync(attachment.path);
    const checksum = crypto.createHash('sha256').update(buffer).digest('hex');

    attachment.status = 'VERIFIED';

    attachment.checksum = checksum;

    await attachment.save();

    await AttachmentEvent.create({
      attachment: attachment._id,
      eventType: 'ATTACHMENT_VERIFIED',
      message: 'File validated and checksum generated',
    });

    parentPort?.postMessage('done');
  } catch (err) {
    console.error('Worker error:', err);
  }
});
