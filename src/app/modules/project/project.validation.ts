// req validation
import { z } from 'zod';

const updateProjectZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    stack: z.array(z.string()).optional(),
  }),
});

export const ProjectValidation = {
  updateProjectZodSchema,
};
