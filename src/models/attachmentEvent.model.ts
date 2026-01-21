import { Schema, model, Types } from 'mongoose';

const attachmentEventSchema = new Schema(
  {
    attachment: {
      type: Types.ObjectId,
      ref: 'Attachment',
      required: true,
    },

    eventType: {
      type: String,
      required: true,
    },

    message: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const AttachmentEvent = model('AttachmentEvent', attachmentEventSchema);
