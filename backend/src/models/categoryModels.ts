import { z } from 'zod';

export const categoryCreateSchema = z
  .object({
    name: z.string().min(3),
  })
  .or(
    z.object({
      name: z.string().min(3),
      parentId: z.string().uuid(),
    })
  );
