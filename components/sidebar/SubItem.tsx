"use client";

import React from "react";
import Avatar from "../Avatar";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import useSideModal from "@/hooks/useSideModal";

interface Props {
  channel: User;
}

const SubItem = ({ channel }: Props) => {
  const router = useRouter();

  const sideModal = useSideModal();

  const onClickHandler = () => {
    router.push(`/channel/${channel.id}`);

    sideModal.onClose();
  };

  return (
    <div
      className={`flex items-center gap-4 p-2.5 rounded-lg cursor-pointer hover:bg-[hsl(0,0%,18.82%)] transition`}
      onClick={onClickHandler}
    >
      <Avatar imgSrc={channel.image!} small />

      <span className="text-sm">{channel.name}</span>
    </div>
  );
};

export default SubItem;
