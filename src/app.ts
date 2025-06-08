import express from "express";
import cookieParser from "cookie-parser";
import { adminRouter } from "./routes/admin.routes";

const app = express();

app.use(express.json());
app.use(cookieParser());


app.use("/api", adminRouter);



export default app;
