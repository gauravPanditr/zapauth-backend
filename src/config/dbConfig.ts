import "dotenv/config";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient(); // reads DATABASE_URL automatically

export { prisma };
