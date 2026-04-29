import prisma from "../db/prisma.js";

export async function createTodo(userId, { title, description }) {
    const todo = await prisma.todo.create({
        data: {
            title,
            description,
            userId,
        },
        select: {
            id: true,
            title: true,
            description: true,
        },
    });

    return todo;
}