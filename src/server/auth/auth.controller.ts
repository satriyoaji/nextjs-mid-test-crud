import { Prisma, PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import {
  RegisterAuthInput,
  LoginAuthInput,
} from "./auth.schema";

const prisma = new PrismaClient();

export const registerAuthController = async ({
  input,
}: {
  input: RegisterAuthInput;
}) => {
  // try {
  //   const user = await prisma.user.create({
  //     data: {
  //       email: input.email,
  //       password: input.password,
  //     },
  //   });
  //
  //   return {
  //     status: "success",
  //     data: {
  //       user,
  //     },
  //   };
  // } catch (error) {
  //   if (error instanceof Prisma.PrismaClientKnownRequestError) {
  //     if (error.code === "P2002") {
  //       throw new TRPCError({
  //         code: "CONFLICT",
  //         message: "User with that email already exists",
  //       });
  //     }
  //   }
  //   throw error;
  // }
};

export const loginAuthController = async ({
  input,
}: {
  input: LoginAuthInput;
}) => {
  // try {
  //   const updatedUser = await prisma.user.update({
  //     where: { id: paramsInput.userId },
  //     data: input,
  //   });
  //
  //   return {
  //     status: "success",
  //     user: updatedUser,
  //   };
  // } catch (error) {
  //   if (error instanceof Prisma.PrismaClientKnownRequestError) {
  //     if (error.code === "P2025") {
  //       throw new TRPCError({
  //         code: "CONFLICT",
  //         message: "User with that email already exists",
  //       });
  //     }
  //   }
  //   throw error;
  // }
};

export const findUserController = async ({
  // paramsInput,
}: {
  // paramsInput: ParamsInput;
}) => {
  // try {
  //   const user = await prisma.user.findFirst({
  //     where: { id: paramsInput.userId },
  //   });
  //
  //   if (!user) {
  //     throw new TRPCError({
  //       code: "NOT_FOUND",
  //       message: "User with that ID not found",
  //     });
  //   }
  //
  //   return {
  //     status: "success",
  //     user,
  //   };
  // } catch (error) {
  //   throw error;
  // }
};

