import { model, Schema } from 'mongoose';
import { IProject, ProjectModel } from './project.interface';

export const projectSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    stack: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Project = model<IProject, ProjectModel>('Project', projectSchema);
