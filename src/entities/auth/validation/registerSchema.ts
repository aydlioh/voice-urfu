import { z } from 'zod';

export const registerSchema = z.object({
  login: z.string().nonempty('Введите логин'),
  password: z.string().nonempty('Введите пароль'),
  fullname: z.string().nonempty('Введите ФИО'),
  email: z.string().nonempty('Введите E-mail'),
});
