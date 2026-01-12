import express from 'express';
import adminrouter from './admin.routes';
import projectRouter from './project.routes';


const v1Router = express.Router();

v1Router.use('/admin', adminrouter);
v1Router.use('/project',projectRouter);

export default v1Router;