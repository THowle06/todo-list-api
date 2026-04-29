import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import { databaseUrl } from "../config/config.js";

const { Pool } = pg;

const pool = new Pool({
    connectionString: databaseUrl,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export default prisma;