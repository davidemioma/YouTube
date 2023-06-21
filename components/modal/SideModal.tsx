"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import { FaYoutube } from "react-icons/fa";
import IconButton from "../header/IconButton";
import useSideModal from "@/hooks/useSideModal";
import { RxHamburgerMenu } from "react-icons/rx";

const SideModal = () => {
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
        <div className="flex items-center gap-3 px-5 pt-4">
          <IconButton Icon={RxHamburgerMenu} onClick={onCloseHandler} />

          <FaYoutube size={30} color="red" />
        </div>

        <Sidebar />
      </div>
    </>
  );
};

export default SideModal;
