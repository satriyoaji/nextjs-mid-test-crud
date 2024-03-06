import { FC, useState } from "react";
import { format, parseISO } from "date-fns";
import { twMerge } from "tailwind-merge";
import UserModal from "../user.modal";
import UpdateUser from "./update.user";
import { toast } from "react-toastify";
import { IUser } from "~/type";
import { trpc } from "~/utils/trpc";
import { useQueryClient } from "@tanstack/react-query";

type UserItemProps = {
  user: IUser;
};

const UserItem: FC<UserItemProps> = ({ user }) => {
  const [openSettings, setOpenSettings] = useState(false);
  const [openUserModal, setOpenUserModal] = useState(false);

  const queryClient = useQueryClient();
  const { mutate: deleteUser } = trpc.deleteUser.useMutation({
    onSuccess() {
      queryClient.invalidateQueries([["getUsers"], { limit: 10, page: 1 }]);
      setOpenUserModal(false);
      toast("User deleted successfully", {
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

  const onDeleteHandler = (userId: number) => {
    if (window.confirm("Are you sure")) {
      deleteUser({ userId: userId });
    }
  };
  return (
    <>
      <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-md flex flex-col justify-between">
        <div className="details">
          <h3 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">
            {user.name.length > 20
              ? user.name.substring(0, 20) + "..."
              : user.name}
          </h3>
          <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-500">
            {user.email.length > 20
              ? user.email.substring(0, 20) + "..."
              : user.email}
          </h5>
          <p className="my-4 font-normal text-ct-dark-200">
            {user.address && user.address.length > 210
              ? user.address.substring(0, 210) + "..."
              : user.address}
          </p>
        </div>
        <div className="relative border-t border-slate-300 flex justify-between items-center">
          <div
            onClick={() => setOpenSettings(!openSettings)}
            className="text-ct-dark-100 text-lg cursor-pointer"
          >
            <i className="bx bx-dots-horizontal-rounded"></i>
          </div>
          <div
            id="settings-dropdown"
            className={twMerge(
              `absolute right-0 bottom-3 z-10 w-28 text-base list-none bg-white rounded divide-y divide-gray-100 shadow`,
              `${openSettings ? "block" : "hidden"}`
            )}
          >
            <ul className="py-1" aria-labelledby="dropdownButton">
              <li
                onClick={() => {
                  setOpenSettings(false);
                  setOpenUserModal(true);
                }}
                className="py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                <i className="bx bx-pencil"></i> Edit
              </li>
              <li
                onClick={() => {
                  setOpenSettings(false);
                  onDeleteHandler(user.id);
                }}
                className="py-2 px-4 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
              >
                <i className="bx bx-trash"></i> Delete
              </li>
            </ul>
          </div>
        </div>
      </div>
      <UserModal
        openUserModal={openUserModal}
        setOpenUserModal={setOpenUserModal}
      >
        <UpdateUser user={user} setOpenUserModal={setOpenUserModal} />
      </UserModal>
    </>
  );
};

export default UserItem;
