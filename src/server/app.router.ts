import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import {
  createNoteController,
  deleteNoteController,
  findAllNotesController,
  findNoteController,
  updateNoteController,
} from "./note/note.controller";
import {
  createNoteSchema,
  filterQuery,
  params,
  updateNoteSchema,
} from "./note/note.schema";
import {
  createUserController,
  deleteUserController,
  findAllUsersController,
  findUserController,
  updateUserController,
} from "./user/user.controller";
import {
  createUserSchema,
  filterQueryUser,
  userParams,
  updateUserSchema,
} from "./user/user.schema";
import {loginAuthSchema} from "~/server/auth/auth.schema";
import {loginAuthController} from "~/server/auth/auth.controller";

const t = initTRPC.create({
  transformer: superjson,
});

export const appRouter = t.router({
  getHello: t.procedure.query((req) => {
    return { message: "Welcome to Full-Stack tRPC CRUD App with Next.js" };
  }),
  createNote: t.procedure
    .input(createNoteSchema)
    .mutation(({ input }) => createNoteController({ input })),
  updateNote: t.procedure
    .input(updateNoteSchema)
    .mutation(({ input }) =>
      updateNoteController({ paramsInput: input.params, input: input.body })
    ),
  deleteNote: t.procedure
    .input(params)
    .mutation(({ input }) => deleteNoteController({ paramsInput: input })),
  getNote: t.procedure
    .input(params)
    .query(({ input }) => findNoteController({ paramsInput: input })),
  getNotes: t.procedure
    .input(filterQuery)
    .query(({ input }) => findAllNotesController({ filterQuery: input })),

  createUser: t.procedure
    .input(createUserSchema)
    .mutation(({ input }) => createUserController({ input })),
  updateUser: t.procedure
    .input(updateUserSchema)
    .mutation(({ input }) =>
      updateUserController({ paramsInput: input.userParams, input: input.body })
    ),
  deleteUser: t.procedure
    .input(userParams)
    .mutation(({ input }) => deleteUserController({ paramsInput: input })),
  getUser: t.procedure
    .input(userParams)
    .query(({ input }) => findUserController({ paramsInput: input })),
  getUsers: t.procedure
    .input(filterQuery)
    .query(({ input }) => findAllUsersController({ filterQuery: input })),

  loginAuth: t.procedure
    .input(loginAuthSchema)
    .mutation(({ input }) => loginAuthController({ input })),
});

export type AppRouter = typeof appRouter;
