"use client";

import React, { useCallback, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

interface Props {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const Modal = ({ title, isOpen, onClose, disabled, children }: Props) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const onCloseHandler = useCallback(() => {
    if (disabled) return;

    setShowModal(false);

    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 w-screen h-screen bg-black/70 overflow-hidden"
        onClick={onCloseHandler}
      />

      <div className="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg">
        <div
          className={`bg-[hsl(0,0%,18.82%)] w-full h-full sm:h-auto rounded-lg ${
            showModal
              ? "translate-y-0 opacity-100"
              : "translate-y-full opacity-0"
          } transition duration-300 ease-in-out`}
        >
          <div className="flex flex-col w-full h-full">
            <div className="relative flex items-center justify-center p-3 sm:p-5 border-b border-gray-50/50">
              <button
                className="absolute right-9 hover:opacity-70 transition"
                onClick={onCloseHandler}
              >
                <IoClose size={23} />
              </button>

              <h2 className="text-lg font-semibold">{title}</h2>
            </div>

            <div className="flex-auto p-3 sm:p-5">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
