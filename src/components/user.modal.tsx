import ReactDom from "react-dom";
import React, { FC } from "react";

type IUserModal = {
  openUserModal: boolean;
  setOpenUserModal: (open: boolean) => void;
  children: React.ReactNode;
};

const UserModal: FC<IUserModal> = ({
  openUserModal,
  setOpenUserModal,
  children,
}) => {
  if (!openUserModal) return null;
  return ReactDom.createPortal(
    <>
      <div
        className="fixed inset-0 bg-[rgba(0,0,0,.5)] z-[1000]"
        onClick={() => setOpenUserModal(false)}
      ></div>
      <div className="max-w-lg w-full rounded-md fixed top-[5%] xl:top-[10%] left-1/2 -translate-x-1/2 bg-white z-[1001] p-6">
        {children}
      </div>
    </>,
    document.getElementById("user-modal") as HTMLElement
  );
};

export default UserModal;
