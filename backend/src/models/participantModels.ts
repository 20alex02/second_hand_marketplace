import { z } from 'zod';

const getAllSchema = z.object({
  advertisementId: z.string().uuid(),
});

export default {
  getAllSchema,
};
