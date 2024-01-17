// req validation
import { z } from 'zod';

const addSkillZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Skill name required.' }),
    description: z.string({ required_error: 'Skill description is required.' }),
  }),
});

const updateSkillZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const SkillValidation = {
  addSkillZodSchema,
  updateSkillZodSchema,
};
