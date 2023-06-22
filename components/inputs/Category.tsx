"use client";

import React from "react";
import { categories } from "@/util/helpers";

interface Props {
  value?: string;
  onChange: (value: string) => void;
}

const Category = ({ value, onChange }: Props) => {
  return (
    <div className="grid grid-cols-2 gap-1">
      {categories.map((category) => (
        <div
          key={category.label}
          className={`${
            value === category.value && "bg-gray-50 text-black border-0"
          } flex items-center gap-3 p-2 cursor-pointer border border-gray-50 rounded-xl hover:bg-gray-50 hover:text-black hover:border-0 transition`}
          onClick={() => onChange(category.value)}
        >
          <category.icon size={20} />

          <span className="text-sm font-semibold">{category.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Category;
