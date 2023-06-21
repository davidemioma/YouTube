"use client";

import React from "react";
import Avatar from "../Avatar";

const SubItem = () => {
  return (
    <div
      className={`flex items-center gap-4 p-2.5 rounded-lg cursor-pointer hover:bg-[hsl(0,0%,18.82%)] transition`}
    >
      <Avatar small />

      <span className="text-sm">LOL Network</span>
    </div>
  );
};

export default SubItem;
