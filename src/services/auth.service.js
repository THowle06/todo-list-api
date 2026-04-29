import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../db/prisma.js";
import { jwtSecret } from "../config/config.js";
import { StatusCodes } from "http-status-codes";

export async function registerUser({ name, email, password }) {
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        const error = new Error("Email already exists");
        error.status = StatusCodes.CONFLICT;
        throw error;
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            passwordHash,
        },
    });

    const token = jwt.sign(
        { userId: user.id, email: user.email },
        jwtSecret,
        { expiresIn: "7d" }
    );

    return { token };
}