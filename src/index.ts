import express from "express";
import { connectMongo } from "./db/mongo";
import { CONFIG } from "./config";

const app = express();
app.use(express.json());

async function startServer() {
  await connectMongo(CONFIG.mongoUri);

  app.listen(CONFIG.port, () => {
    console.log(`Server running at http://localhost:${CONFIG.port}`);
  });
}

startServer();
