// req validation
import { z } from 'zod';

const addProjectZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Project name is required.' }),
    description: z.string({
      required_error: 'Project description is required.',
    }),
    stack: z.array(z.string({ required_error: 'Project stack is required.' })),
  }),
});

const updateProjectZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    stack: z.array(z.string()).optional(),
  }),
});

export const ProjectValidation = {
  addProjectZodSchema,
  updateProjectZodSchema,
};
