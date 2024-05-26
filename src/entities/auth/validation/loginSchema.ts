import { z } from 'zod';

export const loginSchema = z.object({
  login: z.string().nonempty('Введите логин'),
  password: z.string().nonempty('Введите пароль'),
});
