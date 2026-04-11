import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import mongoose from "mongoose"; 

const connectionString = process.env.DATABASE_URL!;
if (!connectionString) {
  throw new Error("DATABASE_URL not defined in .env");
}


const adapter = new PrismaPg({ connectionString });


const prisma = new PrismaClient({ adapter });

export { prisma };
export const connectMongoDB = async (): Promise<void> => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("✅ MongoDB connected (security logs)");
    });
    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB error:", err);
    });
    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ MongoDB disconnected");
    });

    await mongoose.connect(process.env.MONGODB_URL!, {
      dbName: "zapauth_logs",
    });
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  }
};
