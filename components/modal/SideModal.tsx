"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CurrentUser } from "@/types";
import Sidebar from "../sidebar/Sidebar";
import IconButton from "../header/IconButton";
import useSideModal from "@/hooks/useSideModal";
import { RxHamburgerMenu } from "react-icons/rx";

interface Props {
  currentUser: CurrentUser | null;
}

const SideModal = ({ currentUser }: Props) => {
  const sideModal = useSideModal();

  const [showModal, setShowModal] = useState(sideModal.isOpen);

  useEffect(() => {
    setShowModal(sideModal.isOpen);
  }, [sideModal.isOpen]);

  const onCloseHandler = () => {
    setShowModal(false);

    setTimeout(() => {
      sideModal.onClose();
    }, 300);
  };

  if (!sideModal.isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 w-screen h-screen bg-black/70 overflow-hidden"
        onClick={onCloseHandler}
      />

      <div
        className={`fixed top-0 z-50 h-screen w-[250px] bg-[#0f0f0f] overflow-y-auto ${
          showModal ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex items-center gap-0.5 px-5 pt-2">
          <IconButton Icon={RxHamburgerMenu} onClick={onCloseHandler} />

          <div className="relative w-[70px] h-[70px] overflow-hidden">
            <Image
              className="object-cover"
              src="/assets/logo.png"
              fill
              alt=""
            />
          </div>
        </div>

        <Sidebar currentUser={currentUser} />
      </div>
    </>
  );
};

export default SideModal;
