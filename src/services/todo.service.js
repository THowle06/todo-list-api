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

export async function updateTodoForUser(todoId, userId, { title, description }) {
    const existingTodo = await prisma.todo.findUnique({
        where: { id: todoId },
        select: {
            id: true,
            userId: true,
        },
    });

    if (!existingTodo) {
        return { status: "not_found" };
    }

    if (existingTodo.userId !== userId) {
        return { status: "forbidden" };
    }

    const updatedTodo = await prisma.todo.update({
        where: { id: todoId },
        data: {
            title,
            description,
        },
        select: {
            id: true,
            title: true,
            description: true,
        },
    });

    return { status: "ok", data: updatedTodo };
}

export async function deleteTodoForUser(todoId, userId) {
    const existingTodo = await prisma.todo.findUnique({
        where: { id: todoId },
        select: {
            userId: true,
        },
    });

    if (!existingTodo) {
        return { status: "not_found" };
    }

    if (existingTodo.userId !== userId) {
        return { status: "forbidden" };
    }

    await prisma.todo.delete({
        where: { id: todoId },
    });

    return { status: "ok" };
}