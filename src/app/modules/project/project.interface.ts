import { InferSchemaType, Model } from 'mongoose';
import { projectSchema } from './project.model';

export type IProject = InferSchemaType<typeof projectSchema>;

export type ProjectModel = Model<IProject, Record<string, unknown>>;
