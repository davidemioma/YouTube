"use client";

import React from "react";
import useInfoModal from "@/hooks/useInfoModal";
import WatchLater from "@/components/modal/WatchLater";

interface Props {
  onClick: () => void;
  disabled?: boolean;
  label: string;
}

const InfoModal = ({ onClick, disabled, label }: Props) => {
  const infoModal = useInfoModal();

  const onClickHandler = () => {
    onClick();

    infoModal.onClose();
  };

  if (!infoModal.isOpen) return null;

  return (
    <WatchLater onClick={onClickHandler} disabled={disabled} label={label} />
  );
};

export default InfoModal;
