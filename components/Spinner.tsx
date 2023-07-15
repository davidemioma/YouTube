"use client";

import React from "react";

const Spinner = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-t border-l border-blue-500 animate-spin" />
    </div>
  );
};

export default Spinner;
