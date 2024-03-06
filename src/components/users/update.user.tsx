import React, { FC, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "../LoadingButton";
import { toast } from "react-toastify";
import { trpc } from "../../utils/trpc";
import { IUser } from "../../type";
import { useQueryClient } from "@tanstack/react-query";

type IUpdateUserProps = {
  user: IUser;
  setOpenUserModal: (open: boolean) => void;
};

const updateUserSchema = object({
  email: string().min(5, "Email is required"),
  name: string().min(5, "Name is required"),
  address: string().optional(),
});

type UpdateUserInput = TypeOf<typeof updateUserSchema>;

const UpdateUser: FC<IUpdateUserProps> = ({ user, setOpenUserModal }) => {
  const queryClient = useQueryClient();
  const { isLoading, mutate: updateUser } = trpc.updateUser.useMutation({
    onSuccess() {
      queryClient.invalidateQueries([["getUsers"], { limit: 10, page: 1 }]);
      setOpenUserModal(false);
      toast("User updated successfully", {
        type: "success",
        position: "top-right",
      });
    },
    onError(error) {
      setOpenUserModal(false);
      toast(error.message, {
        type: "error",
        position: "top-right",
      });
    },
  });
  const methods = useForm<UpdateUserInput>({
    resolver: zodResolver(updateUserSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (user) {
      methods.reset({
        name: user.name,
        email: user.email,
        address: user.address ? user.address : "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmitHandler: SubmitHandler<UpdateUserInput> = async (data) => {
    console.log("body: ", data)
    updateUser({ userParams: { userId: user.id }, body: data });
  };
  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl text-ct-dark-600 font-semibold">Update User</h2>
        <div
          onClick={() => setOpenUserModal(false)}
          className="text-2xl text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5 ml-auto inline-flex items-center cursor-pointer"
        >
          <i className="bx bx-x"></i>
        </div>
      </div>{" "}
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
          <label className="block text-gray-700 text-lg mb-2" htmlFor="name">
            Name
          </label>
          <input
            className={twMerge(
              `appearance-none border border-gray-400 rounded w-full py-3 px-3 text-gray-700 mb-2  leading-tight focus:outline-none`,
              `${errors["name"] && "border-red-500"}`
            )}
            {...methods.register("name")}
          />
          <p
            className={twMerge(
              `text-red-500 text-xs italic mb-2 invisible`,
              `${errors["name"] && "visible"}`
            )}
          >
            {errors["name"]?.message as string}
          </p>
        </div>
        <div className="mb-2">
          <label className="block text-gray-700 text-lg mb-2" htmlFor="address">
            Address
          </label>
          <textarea
            className={twMerge(
              `appearance-none border border-gray-400 rounded w-full py-3 px-3 text-gray-700 mb-2 leading-tight focus:outline-none`,
              `${errors.address && "border-red-500"}`
            )}
            rows={6}
            {...register("address")}
          />
          <p
            className={twMerge(
              `text-red-500 text-xs italic mb-2`,
              `${errors.address ? "visible" : "invisible"}`
            )}
          >
            {errors.address && errors.address.message}
          </p>
        </div>

        <LoadingButton loading={isLoading}>Update User</LoadingButton>
      </form>
    </section>
  );
};

export default UpdateUser;
