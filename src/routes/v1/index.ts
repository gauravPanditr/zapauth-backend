import express from 'express';
import adminrouter from './admin.routes';


const v1Router = express.Router();

v1Router.use('/admin', adminrouter);


export default v1Router;