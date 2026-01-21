import { Schema, model, Types } from 'mongoose';

const attachmentSchema = new Schema(
  {
    filename: {
      type: String,
      required: true,
    },

    filePath: {
      type: String,
      required: true,
    },

    fileSize: {
      type: Number,
      required: true,
    },

    fileType: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ['UPLOADED', 'VERIFIED'],
      default: 'UPLOADED',
    },

    task: {
      type: Types.ObjectId,
      ref: 'Task',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Attachment = model('Attachment', attachmentSchema);
