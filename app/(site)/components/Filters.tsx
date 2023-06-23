"use client";

import React, { Dispatch, SetStateAction } from "react";
import { categories } from "@/util/helpers";

interface Props {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const Filters = ({ value, setValue }: Props) => {
  return (
    <div className="fixed bg-black top-14 z-20 w-full flex items-center gap-4 p-5 overflow-x-auto scrollbar-hide">
      {[
        {
          value: "all",
          label: "All",
        },
        ...categories,
      ].map((category) => (
        <div
          key={category.value}
          className={`${
            value === category.value
              ? "bg-gray-50 text-black"
              : "bg-[hsl(0,0%,18.82%)]"
          } p-2 text-sm font-semibold rounded-lg cursor-pointer whitespace-nowrap opacity-75 hover:opacity-100 transition`}
          onClick={() => setValue(category.value)}
        >
          {category.label}
        </div>
      ))}
    </div>
  );
};

export default Filters;
