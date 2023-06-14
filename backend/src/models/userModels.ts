import { z } from 'zod';
import { Role } from '@prisma/client';

const createSchema = z.object({
  email: z.string().email().nonempty(),
  phoneNumber: z.string().regex(/^(\+420\s)?[0-9]{3}\s?[0-9]{3}\s?[0-9]{3}$/),
  password: z
    .string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)+[A-Za-z\d@$!%*?&]{6,}$/),
});

const updateSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email().optional(),
  role: z.nativeEnum(Role).optional(),
  phoneNumber: z
    .string()
    .regex(/^(\+420\s)?[0-9]{3}\s?[0-9]{3}\s?[0-9]{3}$/)
    .optional(),
  password: z
    .string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)+[A-Za-z\d@$!%*?&]{6,}$/)
    .optional(),
});

const getOneSchema = z.object({ id: z.string().uuid() });

const adminUpdateSchema = z.object({ id: z.string().uuid() });

export default {
  createSchema,
  updateSchema,
  getOneSchema,
  adminUpdateSchema,
};
