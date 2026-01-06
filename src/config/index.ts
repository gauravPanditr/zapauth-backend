import dotenv from "dotenv";

dotenv.config();

export const CONFIG = {
  mongoUri: process.env.MONGO_URI!,
  port: process.env.PORT || 3000
};
