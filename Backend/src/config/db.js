import pkg from '@prisma/client';
const { PrismaClient } = pkg; // ✅ works in ESM

const prisma = new PrismaClient()

 export default prisma