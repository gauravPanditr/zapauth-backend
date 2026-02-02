import winston from "winston";
import "winston-mongodb";

export const logger = winston.createLogger({
  level: "info",

  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),

  transports: [
    // Console me bhi dikhe
    new winston.transports.Console(),

    // MongoDB me store
    new winston.transports.MongoDB({
      db: process.env.MONGO_URL as string,
      collection: "security_logs",
      level: "info",
      tryReconnect: true,
      options: {
        useUnifiedTopology: true,
      },
    }),
  ],
});
