import express from 'express';
import adminrouter from './admin.routes';
import projectRouter from './project.routes';
import userRouter from './user.routes'
import authRouter from './auth.routes'
import { authenticateAdmin } from '../../middleware/admin.auth';
const v1Router = express.Router();

v1Router.use('/admin', adminrouter);
v1Router.use('/project',authenticateAdmin,projectRouter);
v1Router.use('/user',userRouter);
v1Router.use('/user',authRouter)
export default v1Router;