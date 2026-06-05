import mongoose from 'mongoose';
import { z } from 'zod';

const objectId = z.string().refine((value) => mongoose.Types.ObjectId.isValid(value), {
  message: 'Invalid resource id.'
});

const taskBody = z.object({
  title: z.string().trim().min(2, 'Title must be at least 2 characters.').max(120),
  description: z.string().trim().max(1000).optional().default(''),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
  status: z.enum(['pending', 'completed']).optional().default('pending')
});

export const createTaskSchema = z.object({
  body: taskBody
});

export const updateTaskSchema = z.object({
  params: z.object({ id: objectId }),
  body: taskBody.partial().refine((value) => Object.keys(value).length > 0, {
    message: 'At least one task field must be provided.'
  })
});

export const updateStatusSchema = z.object({
  params: z.object({ id: objectId }),
  body: z.object({
    status: z.enum(['pending', 'completed'])
  })
});

export const taskIdSchema = z.object({
  params: z.object({ id: objectId })
});

export const getTasksSchema = z.object({
  query: z.object({
    search: z.string().trim().max(120).optional().default(''),
    status: z.enum(['all', 'pending', 'completed']).optional().default('all'),
    priority: z.enum(['all', 'low', 'medium', 'high']).optional().default('all'),
    sortBy: z.enum(['createdAt', 'updatedAt', 'title', 'priority', 'status']).optional().default('createdAt'),
    sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
    page: z.coerce.number().int().positive().optional().default(1),
    limit: z.coerce.number().int().positive().max(50).optional().default(9)
  })
});
