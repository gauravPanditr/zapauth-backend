import winston from "winston";
import "winston-mongodb";
import "dotenv/config";
export const logger = winston.createLogger({
  level: "info",

  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),

  transports: [
    new winston.transports.Console(),
    new winston.transports.MongoDB({
      db: process.env.MONGODB_URL!,
      collection: "security_logs",
      tryReconnect: true,
    }),
  ],
});
const testMongoConnection = async () => {
  try {
    const mongoose = require("mongoose");
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(" MongoDB (Winston logs) connected successfully");
    await mongoose.connection.close(); // just test, close connection
  } catch (err) {
    console.error(" MongoDB connection failed:", err);
  }
};

testMongoConnection();