import { xid, z } from "zod";

export const createTodoSchema = z.object({
    title: z.string().trim().min(1, "Title is required"),
    description: z.string().trim().optional(),
});

export const todoIdSchema = z.object({
    id: z.coerce.number().int().positive("Todo id must be a positive integer"),
});

export const updateTodoSchema = z.object({
    title: z.string().trim().min(1, "Title is required"),
    description: z.string().trim().optional(),
});