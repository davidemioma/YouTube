"use client";

import React from "react";

const loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-full overflow-hidden">
      <div className="w-20 h-20 rounded-full border-l border-t border-blue-500 animate-spin" />
    </div>
  );
};

export default loading;
