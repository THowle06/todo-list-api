import prisma from "../db/prisma.js";

export async function checkDatabaseHealth() {
    await prisma.$queryRaw`SELECT 1`;
    return true;
}