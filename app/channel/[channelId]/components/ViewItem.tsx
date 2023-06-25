"use client";

import React from "react";

interface Props {
  label: string;
  active: boolean;
  onClick: () => void;
}

const ViewItem = ({ label, active, onClick }: Props) => {
  return (
    <div
      className={`${
        active
          ? "bg-[#717171]/30 text-white border-b-2 border-gray-100"
          : "text-[#717171]"
      } py-3 px-6 text-sm font-semibold cursor-pointer hover:text-white transition`}
      onClick={onClick}
    >
      {label}
    </div>
  );
};

export default ViewItem;
