"use client";

import React, { useEffect, useState } from "react";
import Register from "@/components/modal/Register";
import Login from "@/components/modal/Login";
import Profile from "@/components/modal/Profile";
import AddPost from "@/components/modal/AddPost";
import { CurrentUser, NotificationProps } from "@/types";
import Notifications from "@/components/modal/Notifications";

interface Props {
  currentUser: CurrentUser | null;
  notifications: NotificationProps[];
}

const ModalProvider = ({ currentUser, notifications }: Props) => {
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

      <Notifications notifications={notifications} />
    </>
  );
};

export default ModalProvider;
