import { Prisma, PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import {
  CreateUserInput,
  FilterQueryInput,
  ParamsInput,
  UpdateUserInput,
} from "./user.schema";

const prisma = new PrismaClient();

export const createUserController = async ({
  input,
}: {
  input: CreateUserInput;
}) => {
  try {
    const user = await prisma.user.create({
      data: {
        email: input.email,
        name: input.name,
        address: input.address,
      },
    });

    return {
      status: "success",
      data: {
        user,
      },
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User with that email already exists",
        });
      }
    }
    throw error;
  }
};

export const updateUserController = async ({
  paramsInput,
  input,
}: {
  paramsInput: ParamsInput;
  input: UpdateUserInput["body"];
}) => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: paramsInput.userId },
      data: input,
    });

    return {
      status: "success",
      user: updatedUser,
    };
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

export const findUserController = async ({
  paramsInput,
}: {
  paramsInput: ParamsInput;
}) => {
  try {
    const user = await prisma.user.findFirst({
      where: { id: paramsInput.userId },
    });

    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User with that ID not found",
      });
    }

    return {
      status: "success",
      user,
    };
  } catch (error) {
    throw error;
  }
};

export const findAllUsersController = async ({
  filterQuery,
}: {
  filterQuery: FilterQueryInput;
}) => {
  try {
    const page = filterQuery.page || 1;
    const limit = filterQuery.limit || 10;
    const skip = (page - 1) * limit;

    const users = await prisma.user.findMany({ skip, take: limit });

    return {
      status: "success",
      results: users.length,
      users,
    };
  } catch (error) {
    throw error;
  }
};

export const deleteUserController = async ({
  paramsInput,
}: {
  paramsInput: ParamsInput;
}) => {
  try {
    await prisma.user.delete({ where: { id: paramsInput.userId } });

    return {
      status: "success",
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User with that ID not found",
        });
      }
    }
    throw error;
  }
};
