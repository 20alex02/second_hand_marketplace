import { z } from 'zod';

export const userCreateSchema = z.object({
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
