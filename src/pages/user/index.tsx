'use client'
import Link from 'next/link';
import {useState} from "react";
import {trpc} from "~/utils/trpc";
import {toast} from "react-toastify";
import UserItem from "~/components/users/user.component";
import UserModal from "~/components/user.modal";
import CreateUser from "~/components/users/create.user";
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const UserPage = () => {
  const [openUserModal, setOpenUserModal] = useState(false);
  const { data: users } = trpc.getUsers.useQuery(
    { limit: 10, page: 1 },
    {
      staleTime: 5 * 1000,
      select: (data) => data.users,
      onError(err) {
        toast(err.message, {
          type: "error",
          position: "top-right",
        });
      },
    }
  );

  return (
    <div className="2xl:max-w-[90rem] max-w-[68rem] mx-auto">
      <div className="m-8 grid grid-cols-[repeat(auto-fill,_320px)] gap-7">
        <div className="p-4 h-72 bg-white rounded-lg border border-gray-200 shadow-md flex flex-col items-center justify-center">
          <div
            onClick={() => setOpenUserModal(true)}
            className="flex items-center justify-center h-20 w-20 border-2 border-dashed border-ct-blue-600 rounded-full text-ct-blue-600 text-5xl cursor-pointer"
          >
            <i className="bx bx-plus"></i>
          </div>
          <h4
            onClick={() => setOpenUserModal(true)}
            className="text-lg font-medium text-ct-blue-600 mt-5 cursor-pointer"
          >
            Add new user
          </h4>
        </div>

        {/* Create User Modal */}
        <UserModal
          openUserModal={openUserModal}
          setOpenUserModal={setOpenUserModal}
        >
          <CreateUser setOpenUserModal={setOpenUserModal} />
        </UserModal>
      </div>

      <div className="m-8 grid grid-cols-[repeat(auto-fill,_320px)] gap-7">
      {/* User Items */}
      {users?.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
      </div>
    </div>
  );
};


export default UserPage;
