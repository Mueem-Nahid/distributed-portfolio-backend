import express, { Router } from 'express';
import { ProjectController } from './project.controller';
import validateRequest from '../../middlewares/validateRequest';
import { ProjectValidation } from './project.validation';

const router: Router = express.Router();

router.post(
  '/',
  validateRequest(ProjectValidation.addProjectZodSchema),
  ProjectController.createProject
);

router.get('/:id', ProjectController.getSingleProject);

router.patch(
  '/:id',
  validateRequest(ProjectValidation.updateProjectZodSchema),
  ProjectController.updateProject
);

router.delete('/:id', ProjectController.deleteProject);

router.get('/', ProjectController.getAllProject);

export const ProjectRoutes = router;
