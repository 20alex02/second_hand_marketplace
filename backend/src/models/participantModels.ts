import { z } from 'zod';

const getAllSchema = z.object({
  advertisementId: z.string().uuid(),
});

const createSchema = z
  .object({
    advertisementId: z.string().uuid(),
    userId: z.string().uuid().optional(),
    phoneNumber: z
      .string()
      .regex(/^(\+420\s)?[0-9]{3}\s?[0-9]{3}\s?[0-9]{3}$/)
      .optional(),
    email: z.string().email().optional(),
  })
  .refine(
    (schema) => schema.email !== undefined || schema.phoneNumber !== undefined,
    {
      message: 'phoneNumber or email has to be defines',
    }
  );

export default {
  getAllSchema,
  createSchema,
};
