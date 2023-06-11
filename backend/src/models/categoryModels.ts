import { z } from 'zod';

const createSchema = z
  .object({
    name: z.string().min(3),
  })
  .and(z.object({ parentId: z.string().uuid() }).optional());

const getOneSchema = z.object({
  id: z.string().uuid(),
});

const updateSchema = z
  .object({
    id: z.string().uuid(),
  })
  .and(z.object({ name: z.string().min(3) }).optional())
  .and(z.object({ parentId: z.string().uuid() }).optional())
  .refine((data) => data.name !== undefined || data.parentId !== undefined, {
    message: "At least one of 'name' or 'parentId' must be present",
  });

const deleteSchema = z.object({
  id: z.string().uuid(),
});

const getAllSchema = z.object({
  pageNum: z.number().positive(),
  perPage: z.number().positive(),
});

export default {
  createSchema,
  getOneSchema,
  updateSchema,
  deleteSchema,
  getAllSchema,
};
