import express, { Router } from 'express';
import { SkillController } from './skill.controller';
import validateRequest from '../../middlewares/validateRequest';
import { SkillValidation } from './skill.validation';

const router: Router = express.Router();

router.post(
  '/',
  validateRequest(SkillValidation.addSkillZodSchema),
  SkillController.createSkill
);

router.get('/:id', SkillController.getSingleSkill);

router.patch(
  '/:id',
  validateRequest(SkillValidation.updateSkillZodSchema),
  SkillController.updateSkill
);

router.delete('/:id', SkillController.deleteSkill);

router.get('/', SkillController.getAllSkill);

export const SkillRoutes = router;
