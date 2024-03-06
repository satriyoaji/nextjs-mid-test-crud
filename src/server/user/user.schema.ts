import { z } from "zod";

export const createUserSchema = z.object({
  email: z.string({
    required_error: "Email is required",
  })
    .min(5, { message: "This field has to be filled min 5 chars." })
    .email("This is not a valid email."),
  name: z.string({
    required_error: "Name is required",
  })
    .min(5, { message: "This field has to be filled min 5 chars." }),
  address: z.string().optional(),
});

export const userParams = z.object({
  userId: z.number(),
});

export const updateUserSchema = z.object({
  userParams,
  body: z
    .object({
      email: z.string(),
      name: z.string(),
      address: z.string().optional(),
    })
    .partial(),
});

export const filterQueryUser = z.object({
  limit: z.number().default(1),
  page: z.number().default(10),
});

export type ParamsInput = z.TypeOf<typeof userParams>;
export type FilterQueryInput = z.TypeOf<typeof filterQueryUser>;
export type CreateUserInput = z.TypeOf<typeof createUserSchema>;
export type UpdateUserInput = z.TypeOf<typeof updateUserSchema>;
