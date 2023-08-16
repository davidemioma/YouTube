"use client";

import React, { MouseEventHandler } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";

interface Props {
  disabled?: boolean;
  onClick: MouseEventHandler<any>;
  label: string;
}

const WatchLater = ({ disabled, onClick, label }: Props) => {
  return (
    <div className="absolute top-10 right-0 z-10 w-60 bg-[hsl(0,0%,18.82%)] shadow-md border border-[#010101] rounded-lg overflow-hidden">
      <button
        className="w-full flex items-center gap-4 py-2 px-4 hover:bg-[#717171] transition"
        onClick={onClick}
        disabled={disabled}
      >
        <AiOutlineClockCircle size={23} />

        <span className="text-sm font-semibold whitespace-nowrap">{label}</span>
      </button>
    </div>
  );
};

export default WatchLater;
