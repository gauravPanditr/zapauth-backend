import express from "express";
import { connectMongo } from "./db/mongo";
import { CONFIG } from "./config";
import dotenv from "dotenv";
import adminRoutes from "./routes/admin.routes";
const app = express();


async function startServer() {
  await connectMongo(CONFIG.mongoUri);
dotenv.config();
app.use(express.json());
app.use("/api/admin",adminRoutes);


  app.listen(CONFIG.port, () => {
    console.log(`Server running at http://localhost:${CONFIG.port}`);
  });
}

startServer();
