import { Schema, model, Types } from 'mongoose';

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ['OPEN', 'IN_PROGRESS', 'DONE'],
      default: 'OPEN',
      required: true,
    },

    project: {
      type: Types.ObjectId,
      ref: 'Project',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Task = model('Task', taskSchema);
