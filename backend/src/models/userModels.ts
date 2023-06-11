import { z } from 'zod';

const createSchema = z.object({
  email: z.string().email().nonempty(),
  phoneNumber: z
    .string()
    .regex(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$/
    ),
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
          .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$/
          ),
      })
      .optional()
  )
  .and(
    z
      .object({
        password: z
          .string()
          .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$/
          ),
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
