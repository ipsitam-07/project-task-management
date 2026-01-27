import { Schema, model, Types } from 'mongoose';

const attachmentSchema = new Schema(
  {
    filename: {
      type: String,
      required: true,
    },

    originalName: {
      type: String,
      required: true,
    },

    fileSize: {
      type: Number,
      required: true,
    },

    mimeType: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ['UPLOADED', 'VERIFIED'],
      default: 'UPLOADED',
    },

    path: {
      type: String,
      required: true,
    },

    task: {
      type: Types.ObjectId,
      ref: 'Task',
      required: true,
    },
    checksum: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const Attachment = model('Attachment', attachmentSchema);
