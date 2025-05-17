import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3000;
import connectDB from './config/db';
import dotenv from 'dotenv';

dotenv.config();



connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
});