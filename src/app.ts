import express, { Express, Response } from 'express';
import cookieParser from 'cookie-parser';
import serverless from "serverless-http";
import apiRouter from './routes';
import cors from "cors";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: true }));

app.use('/api', apiRouter);

app.get("/ping", (_req, res: Response) => {
  res.status(200).json({ msg: "ok with changes" });
});

export const handler = serverless(app);
export default app;