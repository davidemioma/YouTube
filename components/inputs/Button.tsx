"use client";

import React from "react";

interface Props {
  type?: "submit" | "button" | "reset";
  label: string;
  disabled?: boolean;
  onClick?: () => void;
}

const Button = ({ type, label, disabled, onClick }: Props) => {
  const onClickHandler = () => {
    if (onClick) return onClick();
  };

  return (
    <button
      type={type}
      className="bg-gray-50 text-black font-semibold py-2 rounded-lg opacity-70 disabled:opacity-70 hover:opacity-100 disabled:cursor-not-allowed transition"
      disabled={disabled}
      onClick={onClickHandler}
    >
      {label}
    </button>
  );
};

export default Button;
