import { z } from 'zod';

const createSchema = z.object({
  email: z.string().email().nonempty(),
  phoneNumber: z.string().regex(/^(\+420\s)?[0-9]{3}\s?[0-9]{3}\s?[0-9]{3}$/),
  password: z
    .string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)+[A-Za-z\d@$!%*?&]{6,}$/),
});

const updateSchema = z
  .object({
    id: z.string().uuid(),
  })
  .and(
    z
      .object({
        phoneNumber: z
          .string()
          .regex(/^(\+420\s)?[0-9]{3}\s?[0-9]{3}\s?[0-9]{3}$/),
      })
      .optional()
  )
  .and(
    z
      .object({
        password: z
          .string()
          .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)+[A-Za-z\d@$!%*?&]{6,}$/),
      })
      .optional()
  )
  .and(z.object({ email: z.string().uuid() }).optional());

const getOneSchema = z.object({ id: z.string().uuid() });

const getAllSchema = z.object({
  pageNum: z.number().positive(),
  perPage: z.number().positive(),
});

export default {
  createSchema,
  updateSchema,
  getOneSchema,
  getAllSchema,
};
