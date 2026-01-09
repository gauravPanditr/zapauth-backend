// src/prisma/configDb.ts
import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../generated/prisma/client';


const connectionString = process.env.DATABASE_URL!;
if (!connectionString) {
  throw new Error("DATABASE_URL not defined in .env");
}


const adapter = new PrismaPg({ connectionString });

// Initialize Prisma Client with the adapter
const prisma = new PrismaClient({ adapter });

export { prisma };
