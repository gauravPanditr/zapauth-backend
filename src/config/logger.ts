import winston from "winston";


let MongoDBTransport: any = null;

try {
  MongoDBTransport = require("winston-mongodb").MongoDB;
} catch (err) {
  console.log("Mongo transport not available");
}

const transports: any[] = [
  new winston.transports.Console(),
];

const uri = process.env.MONGODB_URL;

if (uri && uri.startsWith("mongodb") && MongoDBTransport) {
  transports.push(
    new MongoDBTransport({
      db: uri,
      collection: "security_logs",
      tryReconnect: true,
    })
  );
} else {
  console.log("Mongo logging disabled  URI missing or invalid");
}

export const logger = winston.createLogger({
  level: "info",

  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),

  transports,
});
