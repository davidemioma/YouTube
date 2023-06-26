"use client";

import React from "react";
import Image from "next/image";

const Error = () => {
  return (
    <div className="flex items-center justify-center w-full h-full overflow-hidden">
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="relative w-40 h-40 overflow-hidden">
          <Image
            className="object-cover"
            src="/assets/empty-videos.png"
            fill
            alt=""
          />
        </div>

        <span className="text-lg font-semibold">Something went wrong!</span>
      </div>
    </div>
  );
};

export default Error;
