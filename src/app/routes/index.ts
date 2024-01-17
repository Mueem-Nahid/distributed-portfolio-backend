import express, { Router } from 'express';
import { SkillRoutes } from '../modules/skill/skill.route';
import { ProjectRoutes } from '../modules/project/project.route';

const router = express.Router();

// application routes
const moduleRoutes: { path: string; route: Router }[] = [
  {
    path: '/skills',
    route: SkillRoutes,
  },
  {
    path: '/projects',
    route: ProjectRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
