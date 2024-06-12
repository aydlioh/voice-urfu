import { z } from 'zod';

export const nameSchema = z
  .string()
  .nonempty('Введите логин')
  .min(5, 'Логин должен быть не менее 5 символов');

export const emailSchema = z
  .string()
  .nonempty('Введите E-mail')
  .email('Неверный формат электронной почты');

export const fullnameSchema = z
  .string()
  .nonempty('Введите ФИО')
  .refine(
    (value) =>
      value
        .split(' ')
        .filter(Boolean)
        .every((word) => /^[a-zA-Zа-яА-ЯёЁ\s]*$/.test(word)) &&
      value.split(' ').filter(Boolean).length === 3,
    'Неверный формат ФИО'
  );

export const passwordSchema = z
  .string()
  .min(5, 'Пароль должен быть не менее 5 символов')
  .refine((password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[@#$%^&*(),.?+:{}|<>]/.test(password);

    return hasLowerCase && hasUpperCase && hasNumber && hasSpecialChar;
  }, 'Пароль должен содержать минимум одну заглавную букву, одну цифру и один специальный символ (@#$%^&*(),.?+).');
