"use client";

import React from "react";
import useProfileModal from "@/hooks/useProfileModal";
import useNotificationsModal from "@/hooks/useNotificationsModal";

interface Props {
  children: React.ReactNode;
}

const Container = ({ children }: Props) => {
  const profileModal = useProfileModal();

  const notificationsModal = useNotificationsModal();

  const closeAllModals = () => {
    profileModal.isOpen && profileModal.onClose();

    notificationsModal.isOpen && notificationsModal.onClose();
  };

  return <div onClick={closeAllModals}>{children}</div>;
};

export default Container;
