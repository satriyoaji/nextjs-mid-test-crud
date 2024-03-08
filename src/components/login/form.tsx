import type { NextPage } from "next";
import { useState } from "react";
import { toast } from "react-toastify";
import { trpc } from "~/utils/trpc";
import {twMerge} from "tailwind-merge";
import {object, string, TypeOf} from "zod";
import {LoadingButton} from "~/components/LoadingButton";
import {SubmitHandler, useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {useQueryClient} from "@tanstack/react-query";
import {useRouter} from "next/router";

const loginSchema = object({
  email: string().min(5, "Email is required"),
  password: string().min(3, "Password is required")
});

type LoginInput = TypeOf<typeof loginSchema>;

const LoginForm: NextPage = () => {
  // const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter()
  const { isLoading, mutate: loginUser } = trpc.loginAuth.useMutation({
    onSuccess() {
      toast("logged in successfully", {
        type: "success",
        position: "top-right",
      });
      // redirect to "/"
      router.push("/user")
    },
    onError(error) {
      toast(error.message, {
        type: "error",
        position: "top-right",
      });
      // redirect to "/"
    },
  });

  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmitHandler: SubmitHandler<LoginInput> = async (data) => {
    loginUser(data);
  };

  return (
    <section className={"bg-white py-2 px-4 rounded-lg border border-gray-200 shadow-md flex flex-col items-center justify-center"}>
      <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-200">
        <h2 className="text-2xl text-ct-dark-600 font-semibold">Login</h2>
      </div>
      <form className="w-full" onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="mb-2">
          <label className="block text-gray-700 text-lg mb-2" htmlFor="email">
            Email
          </label>
          <input
            className={twMerge(
              `appearance-none border border-gray-400 rounded w-full py-3 px-3 text-gray-700 mb-2  leading-tight focus:outline-none`,
              `${errors["email"] && "border-red-500"}`
            )}
            {...methods.register("email")}
          />
          <p
            className={twMerge(
              `text-red-500 text-xs italic mb-2 invisible`,
              `${errors["email"] && "visible"}`
            )}
          >
            {errors["email"]?.message as string}
          </p>
        </div>
        <div className="mb-2">
          <label className="block text-gray-700 text-lg mb-2" htmlFor="password">
            Password
          </label>
          <input
            type={'password'}
            className={twMerge(
              `appearance-none border border-gray-400 rounded w-full py-3 px-3 text-gray-700 mb-2  leading-tight focus:outline-none`,
              `${errors["password"] && "border-red-500"}`
            )}
            {...methods.register("password")}
          />
          <p
            className={twMerge(
              `text-red-500 text-xs italic mb-2 invisible`,
              `${errors["password"] && "visible"}`
            )}
          >
            {errors["password"]?.message as string}
          </p>
        </div>
        <LoadingButton loading={isLoading}>Submit</LoadingButton>
      </form>
    </section>
  );
};

export default LoginForm;
