import { z } from 'zod';

const createSchema = z.object({
  name: z.string().min(3),
  parentId: z.string().uuid().optional(),
});

const getOneSchema = z.object({
  id: z.string().uuid(),
});

const updateSchema = z
  .object({
    id: z.string().uuid(),
    name: z.string().min(3).optional(),
    parentId: z.string().uuid().optional(),
  })
  .refine((data) => data.name !== undefined || data.parentId !== undefined, {
    message: "At least one of 'name' or 'parentId' must be present",
  });

export type updateschematype = z.infer<typeof updateSchema>;

const deleteSchema = z.object({
  id: z.string().uuid(),
});

export default {
  createSchema,
  getOneSchema,
  updateSchema,
  deleteSchema,
};
