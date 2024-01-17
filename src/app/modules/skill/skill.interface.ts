import { InferSchemaType, Model } from 'mongoose';
import { skillSchema } from './skill.model';

export type ISkill = InferSchemaType<typeof skillSchema>;

export type SkillModel = Model<ISkill, Record<string, unknown>>;
