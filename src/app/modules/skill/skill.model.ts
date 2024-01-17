import { model, Schema } from 'mongoose';
import { ISkill, SkillModel } from './skill.interface';

export const skillSchema = new Schema(
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
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Skill = model<ISkill, SkillModel>('Skill', skillSchema);
