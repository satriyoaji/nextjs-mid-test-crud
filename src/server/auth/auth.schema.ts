import { z } from "zod";

export const registerAuthSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    email: z.string({
      required_error: 'Email address is required',
    }).email('Invalid email address'),
    password: z.string({
      required_error: 'Password is required',
    })
      .min(8, 'Password must be more than 8 characters')
      .max(32, 'Password must be less than 32 characters'),
    password_confirm: z.string({
      required_error: 'Please confirm your password',
    }),
    // role: z.optional(z.nativeEnum(RoleEnumType)),
  }).refine((data) => data.password === data.password_confirm, {
    path: ['password_confirm'],
    message: 'Passwords do not match',
  }),
});

export const loginAuthSchema = z.object({
  email: z.string({
    required_error: 'Email address is required',
  }).min(5, { message: "This field has to be filled min 5 chars." })
    .email('Invalid email address'),
  password: z.string({
    required_error: 'Password is required',
  }).min(5, 'Invalid email or password'),
});

export type LoginAuthInput = z.TypeOf<typeof loginAuthSchema>;
export type RegisterAuthInput = z.TypeOf<typeof registerAuthSchema>;
