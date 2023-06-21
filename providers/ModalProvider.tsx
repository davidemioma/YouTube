"use client";

import React, { useEffect, useState } from "react";
import Register from "@/components/modal/Register";
import Login from "@/components/modal/Login";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <Register />

      <Login />
    </>
  );
};

export default ModalProvider;
