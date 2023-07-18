"use client";

import React from "react";
import useProfileModal from "@/hooks/useProfileModal";
import useNotificationsModal from "@/hooks/useNotificationsModal";
import useInfoModal from "@/hooks/useInfoModal";

interface Props {
  children: React.ReactNode;
}

const Container = ({ children }: Props) => {
  const profileModal = useProfileModal();

  const notificationsModal = useNotificationsModal();

  const infoModal = useInfoModal();

  const closeAllModals = () => {
    profileModal.isOpen && profileModal.onClose();

    notificationsModal.isOpen && notificationsModal.onClose();

    infoModal.isOpen && infoModal.onClose();
  };

  return <div onClick={closeAllModals}>{children}</div>;
};

export default Container;
