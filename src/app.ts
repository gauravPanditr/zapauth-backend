import express , { Express, Response } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import serverless  from "serverless-http"
import apiRouter from './routes';
const app : Express = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.json());

app.use('/api', apiRouter);
app.get("/ping", ( res: Response) => {
  res.status(200).json({ msg: "ok with changes" });
});
export const handler = serverless(app);
export default app;