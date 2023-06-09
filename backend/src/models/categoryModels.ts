import { z } from 'zod';

const createSchema = z
  .object({
    name: z.string().min(3),
  })
  .and(z.object({ parentId: z.string().uuid() }).optional());

const getOneSchema = z.object({
  id: z.string().uuid(),
});

export default {
  createSchema,
  getOneSchema,
};
