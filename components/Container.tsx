"use client";

import React from "react";
import useProfileModal from "@/hooks/useProfileModal";

interface Props {
  children: React.ReactNode;
}

const Container = ({ children }: Props) => {
  const profileModal = useProfileModal();

  const closeModal = () => {
    profileModal.isOpen && profileModal.onClose();
  };

  return <div onClick={closeModal}>{children}</div>;
};

export default Container;
