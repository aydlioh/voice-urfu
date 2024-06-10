import { z } from 'zod';
import { emailSchema, fullnameSchema, nameSchema, passwordSchema } from './schemas';

export const registerSchema = z.object({
  userName: nameSchema,
  password: passwordSchema,
  fullname: fullnameSchema,
  email: emailSchema,
});
