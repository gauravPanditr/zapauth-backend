import express from 'express';
import adminrouter from './admin.routes';
import projectRouter from './project.routes';
import userRouter from './auth.routes'

const v1Router = express.Router();

v1Router.use('/admin', adminrouter);
v1Router.use('/project',projectRouter);
v1Router.use('/auth',userRouter);

export default v1Router;