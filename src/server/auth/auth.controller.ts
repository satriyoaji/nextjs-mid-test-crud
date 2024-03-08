import { Prisma, PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import {
  RegisterAuthInput,
  LoginAuthInput,
} from "./auth.schema";
import {compare} from "bcryptjs";
import {sign} from "jsonwebtoken";

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
  paramsInput,
}: {
  paramsInput: LoginAuthInput;
}) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: paramsInput.email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        address: true,
      },
    });

    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User with that Email not found",
      });
    }

    if (user && (await compare(paramsInput.password, user.password!))) {
      // Authenticate user with jwt
      const jwtSecret = process.env.JWT_SECRET
      const token = sign(
        { id: user.id, email: user.email },
        jwtSecret ? jwtSecret : "secret_key",
        {
          expiresIn: process.env.JWT_REFRESH_EXPIRATION,
        }
      );
      return {
        status: "success",
        user: exclude(user, ["password"]),
        token: token
      };
    } else {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid credentials",
      });
    }

  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User with that email already exists",
        });
      }
    }
    throw error;
  }
};

function exclude(user: any, keys: Array<string>) {
  for (let key of keys) {
    delete user[key];
  }
  return user;
}


