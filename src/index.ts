import express from "express";
import { connectMongo } from "./db/mongo";
import { CONFIG } from "./config";
import dotenv from "dotenv";
import adminRoutes from "./routes/admin.routes";
import projectRoutes from"./routes/project.routes"
import authRoutes from "./routes/auth.routes"
const app = express();
import cors from "cors"
app.use(cors());


async function startServer() {
  await connectMongo(CONFIG.mongoUri);
dotenv.config();
app.use(express.json());
app.use("/api/admin",adminRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/auth", authRoutes);
  app.listen(CONFIG.port, () => {
    console.log(`Server running at http://localhost:${CONFIG.port}`);
  });
}

startServer();
