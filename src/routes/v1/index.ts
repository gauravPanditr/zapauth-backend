import express from 'express';
import adminrouter from './admin.routes';
import projectRouter from './project.routes';
import userRouter from './user.routes'

import { authenticateAdmin } from '../../middleware/admin.auth';
import { validateProject } from '../../middleware/validate-project';
const v1Router = express.Router();

v1Router.use('/admin', adminrouter);
v1Router.use('/project',authenticateAdmin,projectRouter);
v1Router.use('/auth',validateProject,userRouter);

export default v1Router;