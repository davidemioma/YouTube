"use client";

import React from "react";
import Link from "next/link";
import Avatar from "../Avatar";
import { CurrentUser } from "@/types";
import { signOut } from "next-auth/react";
import { RiAccountBoxLine } from "react-icons/ri";
import { MdOutlineLogout } from "react-icons/md";
import useProfileModal from "@/hooks/useProfileModal";

interface Props {
  currentUser: CurrentUser | null;
}

const Profile = ({ currentUser }: Props) => {
  const profileModal = useProfileModal();

  const logoutHandeler = () => {
    signOut();

    profileModal.onClose();
  };

  if (!profileModal.isOpen) return null;

  return (
    <div className="fixed top-14 right-5 z-30 bg-[hsl(0,0%,18.82%)] w-[280px] rounded-lg shadow-md">
      <div className="flex items-start gap-3 p-4 border-b border-gray-50/50">
        <Avatar imgSrc={currentUser?.image!} />

        <div className="flex flex-col">
          <span>{currentUser?.name}</span>

          <span className="lowercase">@{currentUser?.name}</span>
        </div>
      </div>

      <div className="flex flex-col gap-1 py-2">
        <Link href={`/channel/${currentUser?.id}`}>
          <div
            className="flex items-center gap-4 py-2 px-4 cursor-pointer hover:bg-[#717171]"
            onClick={() => profileModal.onClose()}
          >
            <RiAccountBoxLine size={25} />

            <span className="text-sm">Your Channel</span>
          </div>
        </Link>

        <button
          className="flex items-center gap-4 py-2 px-4 cursor-pointer hover:bg-[#717171]"
          onClick={logoutHandeler}
        >
          <MdOutlineLogout size={25} />

          <span className="text-sm">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Profile;
