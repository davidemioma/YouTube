"use client";

import React, { useEffect, useState } from "react";
import Register from "@/components/modal/Register";
import Login from "@/components/modal/Login";
import AddPost from "@/components/modal/AddPost";
import { CurrentUser } from "@/types";
import Profile from "@/components/modal/Profile";

interface Props {
  currentUser: CurrentUser | null;
}

const ModalProvider = ({ currentUser }: Props) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <Register />

      <Login />

      <AddPost />

      <Profile currentUser={currentUser} />
    </>
  );
};

export default ModalProvider;
