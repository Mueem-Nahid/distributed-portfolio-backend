// req validation
import { z } from 'zod';

const updateSkillZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const SkillValidation = {
  updateSkillZodSchema,
};
