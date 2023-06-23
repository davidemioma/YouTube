"use client";

import React from "react";
import Image from "next/image";

interface Props {
  label?: string;
}

const Empty = ({ label }: Props) => {
  return (
    <div className="w-full h-[70vh] flex flex-col items-center justify-center gap-2">
      <div className="relative w-40 h-40 overflow-hidden">
        <Image
          className="object-cover"
          src="/assets/empty-videos.png"
          fill
          alt=""
        />
      </div>

      <span className="text-lg font-semibold">
        {label || "Something went wrong!"}
      </span>
    </div>
  );
};

export default Empty;
