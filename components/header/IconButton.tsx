"use client";

import React from "react";
import { IconType } from "react-icons";

interface Props {
  Icon: IconType;
  onClick?: () => void;
}

const IconButton = ({ Icon, onClick }: Props) => {
  const onClickHandler = () => {
    if (onClick) return onClick();
  };

  return (
    <button
      className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#717171]/40 transition"
      onClick={onClickHandler}
    >
      <Icon size={23} />
    </button>
  );
};

export default IconButton;
