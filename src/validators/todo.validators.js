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

export const paginationSchema = z.object({
    page: z.coerce.number().int().min(1, "Page must be at least 1").default(1),
    limit: z.coerce.number().int().min(1).max(100, "Limit cannot exceed 100").default(10),
});