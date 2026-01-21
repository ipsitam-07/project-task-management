import { Schema, model, Types } from 'mongoose';

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    owner: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Project = model('Project', projectSchema);
